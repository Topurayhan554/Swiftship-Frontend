//  Roles
export type UserRole = "ADMIN" | "USER" | "COURIER";

export interface LoginPayload {
  email: string;
  password: string;
}

export type RegistrationPayload = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "CUSTOMER" | "COURIER";
};

export interface VerifyAccountPayload {
  email: string;
  otp: string;
}

export interface ResendOtpPayload {
  email: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export interface GoogleOAuthPayload {
  idToken: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: unknown[];
}

export interface AuthResponseData {
  user: User;
  accessToken?: string;
}

export type LoginResponse = ApiResponse<AuthResponseData>;
export type RegistrationResponse = ApiResponse<{ user: User }>;
export type GetMeResponse = ApiResponse<User>;
