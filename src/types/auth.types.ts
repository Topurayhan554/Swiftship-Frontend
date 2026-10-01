
export type UserRole = "ADMIN" | "USER" | "COURIER";

export interface LoginPayload {
  email: string;
  password: string;
}