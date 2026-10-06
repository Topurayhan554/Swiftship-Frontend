import { z } from "zod";

const NAME_MIN = 3;
const NAME_MAX = 100;
const PASSWORD_MIN = 8;
const PASSWORD_MAX = 64;

export const ROLES = ["CUSTOMER", "COURIER"] as const;
export type Role = (typeof ROLES)[number];

const BD_PHONE_REGEX = /^(?:\+?880|0)1[3-9]\d{8}$/;

const emailField = z
  .string()
  .trim()
  .min(1, { error: "Email address is required.", abort: true })
  .toLowerCase()
  .pipe(z.email("Please enter a valid email address."));

const passwordField = z
  .string()
  .min(1, { error: "Password is required.", abort: true })
  .min(PASSWORD_MIN, {
    error: `Password must be at least ${PASSWORD_MIN} characters long.`,
    abort: true,
  })
  .max(PASSWORD_MAX, {
    error: `Password must not exceed ${PASSWORD_MAX} characters.`,
    abort: true,
  })
  .regex(/[a-z]/, {
    error: "Password must contain at least one lowercase letter.",
    abort: true,
  })
  .regex(/[A-Z]/, {
    error: "Password must contain at least one uppercase letter.",
    abort: true,
  })
  .regex(/[0-9]/, {
    error: "Password must contain at least one number.",
    abort: true,
  })
  .regex(/[^A-Za-z0-9]/, {
    error: "Password must contain at least one special character.",
    abort: true,
  });

const phoneField = z
  .string()
  .trim()
  .min(1, { error: "Phone number is required.", abort: true })
  .transform((val) => val.replace(/[\s-]/g, ""))
  .pipe(
    z
      .string()
      .regex(BD_PHONE_REGEX, "Please enter a valid Bangladeshi phone number."),
  )
  .transform((val) => `+880${val.slice(-10)}`);

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Password is required."),
});

export const signupSchema = z
  .object({
    role: z.enum(ROLES, { error: "Please select a valid role." }),
    fullName: z
      .string()
      .trim()
      .min(1, { error: "Full name is required.", abort: true })
      .min(NAME_MIN, {
        error: `Full name must be at least ${NAME_MIN} characters long.`,
        abort: true,
      })
      .max(NAME_MAX, {
        error: `Full name must not exceed ${NAME_MAX} characters.`,
        abort: true,
      })
      .regex(/^[\p{L}][\p{L}\s.'-]*$/u, {
        error:
          "Full name can only contain letters, spaces, dots, hyphens and apostrophes.",
        abort: true,
      }),
    email: emailField,
    phoneNumber: phoneField,
    password: passwordField,
    confirmPassword: z
      .string()
      .min(1, { error: "Please confirm your password.", abort: true }),
  })
  .refine(
    // empty confirm already has its own message, so skip the mismatch error
    (data) =>
      data.confirmPassword === "" || data.password === data.confirmPassword,
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    },
  );

export type LoginFormValues = z.input<typeof loginSchema>;
export type LoginPayload = z.output<typeof loginSchema>;

export type SignupFormValues = z.input<typeof signupSchema>;
export type SignupPayload = z.output<typeof signupSchema>;
