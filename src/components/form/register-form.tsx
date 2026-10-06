"use client";

import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { useState } from "react";
import { Bike, Eye, EyeClosed, Loader2, User } from "lucide-react";
import Link from "next/link";
import { signupSchema, type Role } from "@/validation";
// import GoogleLoginButton from "../modules/google-login/googleLoginButton";
import { useRegistration } from "@/hooks";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "../modules/google-login/googleLoginButton";

const ROLE_OPTIONS: { value: Role; label: string; icon: typeof User }[] = [
  { value: "CUSTOMER", label: "Customer", icon: User },
  { value: "COURIER", label: "Courier", icon: Bike },
];

const inputClass =
  "h-9 border-0 border-b border-[#e2e8f0] rounded-none px-0 shadow-none focus-visible:ring-0 focus-visible:border-[#ff7a1a] placeholder:text-[#94a3b8]";
const labelClass = "text-[13px] font-medium text-[#334155]";
const eyeBtnClass =
  "absolute right-0 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#64748b]";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const { mutate: registration, isPending } = useRegistration();

  const form = useForm({
    defaultValues: {
      role: "CUSTOMER" as Role,
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: signupSchema,
    },
    onSubmit: async ({ value }) => {
      const parsed = signupSchema.parse(value);

      const registrationData = {
        name: parsed.fullName,
        email: parsed.email,
        password: parsed.password,
        phone: parsed.phoneNumber,
        role: parsed.role,
      };

      registration(registrationData, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Server Failure",
              description: "Something went wrong. Please try again",
              type: "error",
            });
            return;
          }

          toast.add({
            title: "Registration Successful",
            description: "Please verify your email",
            type: "success",
          });

          const params = new URLSearchParams({ email: registrationData.email });
          router.push(`/register/verify-account?${params.toString()}`);
        },
        onError: (err) => {
          toast.add({
            title: "Authorization Failure",
            description: err.message || "",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <>
      {/* Tabs */}
      <div className="mb-6 flex items-center gap-6">
        <Link
          href="/register"
          className="relative pb-2 text-[15px] font-semibold text-[#0f2a4a]"
        >
          Sign Up
          <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#ff7a1a]" />
        </Link>
        <Link
          href="/login"
          className="pb-2 text-[15px] font-medium text-[#94a3b8] transition hover:text-[#64748b]"
        >
          Sign In
        </Link>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <FieldGroup className="gap-3">
          {/* Role */}
          <form.Field name="role">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel className={labelClass}>
                    I want to join as
                  </FieldLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {ROLE_OPTIONS.map(({ value, label, icon: RoleIcon }) => {
                      const active = field.state.value === value;
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => field.handleChange(value)}
                          aria-pressed={active}
                          className={`flex h-11 items-center justify-center gap-2 rounded-xl border text-[13px] font-medium transition-all ${
                            active
                              ? "border-[#ff7a1a] bg-[#ff7a1a]/10 text-[#0f2a4a] shadow-sm shadow-[#ff7a1a]/20"
                              : "border-[#e2e8f0] text-[#94a3b8] hover:border-[#cbd5e1] hover:text-[#64748b]"
                          }`}
                        >
                          <RoleIcon
                            className={`size-4 ${active ? "text-[#ff7a1a]" : ""}`}
                          />
                          {label}
                        </button>
                      );
                    })}
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Full Name */}
          <form.Field name="fullName">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name} className={labelClass}>
                    Full Name
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="Rahim Uddin"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    aria-invalid={isInvalid}
                    className={inputClass}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

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
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="you@example.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    aria-invalid={isInvalid}
                    className={inputClass}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Phone Number */}
          <form.Field name="phoneNumber">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name} className={labelClass}>
                    Phone Number
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="tel"
                    placeholder="+8801XXXXXXXXX"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    aria-invalid={isInvalid}
                    className={inputClass}
                  />
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
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      autoComplete="off"
                      aria-invalid={isInvalid}
                      className={`${inputClass} pr-8`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className={eyeBtnClass}
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

          {/* Confirm Password */}
          <form.Field name="confirmPassword">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name} className={labelClass}>
                    Confirm Password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      autoComplete="off"
                      aria-invalid={isInvalid}
                      className={`${inputClass} pr-8`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((p) => !p)}
                      className={eyeBtnClass}
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
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
        {/* Sign Up Button */}
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => {
            const loading = isSubmitting || isPending;
            return (
              <Button
                type="submit"
                disabled={loading}
                className="mt-2 h-11 w-full rounded-xl bg-gradient-to-r from-[#0f2a4a] to-[#143a63] text-[15px] font-medium text-white shadow-lg shadow-[#0f2a4a]/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#ff7a1a]/20 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </Button>
            );
          }}
        </form.Subscribe>
        <FieldSeparator className="mt-2">Or continue with</FieldSeparator>
        <div className="mt-4">
          <GoogleLoginButton
            successTitle="Signed Up Successfully"
            successDescription="Welcome to SwiftShip!"
            redirectTo="/"
          />
        </div>
        {/* Footer link */}
        <p className="mt-5 text-center text-[13px] text-[#64748b]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[#ff7a1a] hover:underline"
          >
            Sign In
          </Link>
        </p>
        <p className="text-center text-[11px] leading-relaxed text-[#94a3b8]">
          By creating an account you agree to our Terms & Privacy Policy.
        </p>
      </form>
    </>
  );
}
