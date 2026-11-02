"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { ArrowLeft, ArrowRight, MailCheck, Mail } from "lucide-react";
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
import { useForgotPassword } from "@/hooks";
import { forgotPasswordSchema } from "@/validation";

const inputClass =
  "h-11 rounded-full border border-[#0f2a4a]/15 bg-white/70 pl-11 pr-4 text-[14px] text-[#0f2a4a] shadow-none transition-all placeholder:text-[#64748b] focus-visible:border-[#ff7a1a] focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-[#ff7a1a]/15";
const labelClass = "pl-1 text-[12.5px] font-semibold text-[#0f2a4a]";
const leftIconClass =
  "pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-[#64748b]";

export default function ForgotPasswordForm() {
  const { mutate: sendReset, isPending } = useForgotPassword();
  const [sentTo, setSentTo] = useState<string | null>(null);

  const form = useForm({
    defaultValues: { email: "" },
    validators: { onSubmit: forgotPasswordSchema },
    onSubmit: ({ value }) => {
      sendReset(
        { email: value.email },
        {
          onSuccess: () => {
            setSentTo(value.email);
            toast.add({
              title: "Email Sent",
              description: "Check your inbox for the reset instructions",
              type: "success",
            });
          },
          onError: (err) => {
            toast.add({
              title: "Request Failed",
              description:
                err.message || "Something went wrong, please try again",
              type: "error",
            });
          },
        },
      );
    },
  });

  if (sentTo) {
    return (
      <div className="space-y-5 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#ff7a1a]/10">
          <MailCheck className="size-7 text-[#ff7a1a]" />
        </div>
        <div>
          <h2 className="text-[18px] font-semibold text-[#0f2a4a]">
            Check your email
          </h2>
          <p className="mt-1 text-[13px] text-[#334155]">
            If an account exists for{" "}
            <span className="font-semibold">{sentTo}</span>, we&apos;ve sent
            instructions to reset your password.
          </p>
        </div>
        <Link
          href={`/reset-password?email=${encodeURIComponent(sentTo)}`}
          className="group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff7a1a] to-[#ff9a4d] text-[15px] font-semibold text-white shadow-lg shadow-[#ff7a1a]/35 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#ff7a1a]/45 active:translate-y-0"
        >
          Enter reset code
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <button
          type="button"
          onClick={() => setSentTo(null)}
          className="text-[12.5px] font-semibold text-[#ff7a1a] hover:underline"
        >
          Use a different email
        </button>
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
      <FieldGroup className="gap-4">
        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} className={labelClass}>
                  Email
                </FieldLabel>
                <div className="relative">
                  <Mail className={leftIconClass} />
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="you@example.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="email"
                    aria-invalid={isInvalid}
                    className={inputClass}
                  />
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
            <Spinner /> Sending...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Send reset instructions
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        )}
      </Button>

      <Link
        href="/login"
        className="flex items-center justify-center gap-1.5 text-[13px] font-semibold text-[#ff7a1a] hover:underline"
      >
        <ArrowLeft className="size-4" />
        Back to sign in
      </Link>
    </form>
  );
}
