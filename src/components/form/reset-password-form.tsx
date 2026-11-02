"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeClosed,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { useResetPassword } from "@/hooks";
import { resetPasswordSchema } from "@/validation";

const inputClass =
  "h-11 rounded-full border border-[#0f2a4a]/15 bg-white/70 pl-11 pr-4 text-[14px] text-[#0f2a4a] shadow-none transition-all placeholder:text-[#64748b] focus-visible:border-[#ff7a1a] focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-[#ff7a1a]/15";
const labelClass = "pl-1 text-[12.5px] font-semibold text-[#0f2a4a]";
const leftIconClass =
  "pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-[#64748b]";

export default function ResetPasswordForm({ email }: { email: string }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: reset, isPending } = useResetPassword();

  const form = useForm({
    defaultValues: { otp: "", newPassword: "" },
    validators: { onSubmit: resetPasswordSchema },
    onSubmit: ({ value }) => {
      reset(
        { email, otp: value.otp, newPassword: value.newPassword },
        {
          onSuccess: () => {
            toast.add({
              title: "Password Reset",
              description: "You can now sign in with your new password",
              type: "success",
            });
            router.push("/login");
          },
          onError: (err) => {
            toast.add({
              title: "Reset Failed",
              description:
                err.message || "Invalid or expired code, please try again",
              type: "error",
            });
          },
        },
      );
    },
  });

  if (!email) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-[13px] text-[#334155]">
          Email missing. Please request a reset code first.
        </p>
        <Link
          href="/forgot-password"
          className="font-semibold text-[#ff7a1a] hover:underline"
        >
          Go to forgot password
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-5"
    >
      <p className="text-center text-[12.5px] text-[#334155]">
        Code sent to <span className="font-semibold">{email}</span>
      </p>

      <FieldGroup className="gap-4">
        {/* OTP */}
        <form.Field name="otp">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} className={labelClass}>
                  6-digit code
                </FieldLabel>
                <div className="relative">
                  <ShieldCheck className={leftIconClass} />
                  <Input
                    id={field.name}
                    name={field.name}
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="123456"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value.replace(/\D/g, ""))
                    }
                    onBlur={field.handleBlur}
                    autoComplete="one-time-code"
                    aria-invalid={isInvalid}
                    className={`${inputClass} tracking-[0.3em]`}
                  />
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* New password */}
        <form.Field name="newPassword">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} className={labelClass}>
                  New password
                </FieldLabel>
                <div className="relative">
                  <Lock className={leftIconClass} />
                  <Input
                    id={field.name}
                    name={field.name}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="new-password"
                    aria-invalid={isInvalid}
                    className={`${inputClass} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748b] transition hover:text-[#0f2a4a]"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeClosed className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>

      <Button
        disabled={isPending}
        type="submit"
        className="group h-12 w-full rounded-full bg-gradient-to-r from-[#ff7a1a] to-[#ff9a4d] text-[15px] font-semibold text-white shadow-lg shadow-[#ff7a1a]/35 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#ff7a1a]/45 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <Spinner /> Resetting...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Reset password
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        )}
      </Button>

      <Link
        href="/forgot-password"
        className="flex items-center justify-center gap-1.5 text-[13px] font-semibold text-[#ff7a1a] hover:underline"
      >
        <ArrowLeft className="size-4" />
        Didn&apos;t get a code? Send again
      </Link>
    </form>
  );
}
