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
  .min(1, "Email address is required.")
  .toLowerCase()
  .pipe(z.email("Please enter a valid email address."));

const passwordField = z
  .string()
  .min(1, "Password is required.")
  .min(
    PASSWORD_MIN,
    `Password must be at least ${PASSWORD_MIN} characters long.`,
  )
  .max(PASSWORD_MAX, `Password must not exceed ${PASSWORD_MAX} characters.`)
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[0-9]/, "Password must contain at least one number.")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character.",
  );

const phoneField = z
  .string()
  .trim()
  .min(1, "Phone number is required.")
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
      .min(1, "Full name is required.")
      .min(NAME_MIN, `Full name must be at least ${NAME_MIN} characters long.`)
      .max(NAME_MAX, `Full name must not exceed ${NAME_MAX} characters.`)
      .regex(
        /^[\p{L}][\p{L}\s.'-]*$/u,
        "Full name can only contain letters, spaces, dots, hyphens and apostrophes.",
      ),
    email: emailField,
    phoneNumber: phoneField,
    password: passwordField,
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.input<typeof loginSchema>;
export type LoginPayload = z.output<typeof loginSchema>;

export type SignupFormValues = z.input<typeof signupSchema>;
export type SignupPayload = z.output<typeof signupSchema>;
