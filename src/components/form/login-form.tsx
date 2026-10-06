"use client";

import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useState } from "react";
import { ArrowRight, Eye, EyeClosed, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useLogin } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { loginSchema } from "@/validation";
// import GoogleLoginButton from "../modules/google-login/googleLoginButton";

const inputClass =
  "h-11 rounded-full border border-[#0f2a4a]/15 bg-white/70 pl-11 pr-4 text-[14px] text-[#0f2a4a] shadow-none transition-all placeholder:text-[#64748b] focus-visible:border-[#ff7a1a] focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-[#ff7a1a]/15";
const labelClass = "pl-1 text-[12.5px] font-semibold text-[#0f2a4a]";
const leftIconClass =
  "pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-[#64748b]";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending: loginPending } = useLogin();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };

      login(loginData, {
        onSuccess: () => {
          toast.add({
            title: "Login Successful",
            description: "Welcome back to SwiftShip",
            type: "success",
          });
          router.push("/");
        },
        onError: (err) => {
          toast.add({
            title: "Login Failed",
            description:
              err.message || "Something went wrong, please try again",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-5"
    >
      <FieldGroup className="gap-4">
        {/* Email */}
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

        {/* Password */}
        <form.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} className={labelClass}>
                  Password
                </FieldLabel>
                <div className="relative">
                  <Lock className={leftIconClass} />
                  <Input
                    id={field.name}
                    name={field.name}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="current-password"
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

      {/* Remember me + Forgot password */}
      <div className="flex items-center justify-between px-1 text-[12.5px]">
        <label className="flex cursor-pointer items-center gap-2 text-[#334155]">
          <input
            type="checkbox"
            className="size-3.5 rounded border-[#cbd5e1] accent-[#ff7a1a]"
          />
          Remember me
        </label>
        <Link
          href="/forgot-password"
          className="font-semibold text-[#ff7a1a] hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {/* Sign In Button */}
      <Button
        disabled={loginPending}
        type="submit"
        className="group h-12 w-full rounded-full bg-gradient-to-r from-[#ff7a1a] to-[#ff9a4d] text-[15px] font-semibold text-white shadow-lg shadow-[#ff7a1a]/35 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#ff7a1a]/45 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {loginPending ? (
          <span className="flex items-center justify-center gap-2">
            <Spinner /> Signing in...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Sign In
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        )}
      </Button>

      {/* Google login (enable later, then add a FieldSeparator above it)
      <GoogleLoginButton
        successTitle="Logged In Successfully"
        successDescription="Welcome back to SwiftShip!"
        redirectTo="/"
      /> */}

      <p className="text-center text-[13px] text-[#334155]">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-[#ff7a1a] hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}
