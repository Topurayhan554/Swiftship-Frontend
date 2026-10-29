import type { ParcelStatus, PaymentStatus } from "./parcel.types";

export type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type Paged<T> = { data: T[]; meta: Meta };

export const PARCEL_STATUSES = [
  "PENDING",
  "APPROVED",
  "ASSIGNED",
  "PICKED_UP",
  "IN_TRANSIT",
  "DELIVERED",
  "CANCELLED",
  "FAILED",
] as const;

export const ALLOWED_NEXT: Record<ParcelStatus, ParcelStatus[]> = {
  PENDING: ["APPROVED", "CANCELLED"],
  APPROVED: ["ASSIGNED", "CANCELLED"],
  ASSIGNED: ["PICKED_UP", "CANCELLED"],
  PICKED_UP: ["IN_TRANSIT", "FAILED"],
  IN_TRANSIT: ["DELIVERED", "FAILED"],
  DELIVERED: [],
  CANCELLED: [],
  FAILED: [],
};

export type Gateway = "BKASH" | "STRIPE";
export type Role = "CUSTOMER" | "COURIER" | "ADMIN" | "SUPER_ADMIN";

export interface AdminParcel {
  id: string;
  trackingId: string;
  parcelType: string;
  description: string | null;
  weightKg: number;
  fee: number;
  deliveryZone: "INSIDE_DHAKA" | "OUTSIDE_DHAKA";
  pickupAddress: string;
  pickupDivision: string;
  pickupDistrict: string;
  pickupUpazila: string;
  deliveryAddress: string;
  deliveryDivision: string;
  deliveryDistrict: string;
  deliveryUpazila: string;
  receiverName: string;
  receiverPhone: string;
  status: ParcelStatus;
  createdAt: string;
  sender: { id: string; name: string; email: string; phone: string | null };
  courier: {
    id: string;
    name: string;
    phone: string | null;
    vehicleType: string | null;
  } | null;
  payment: {
    id: string;
    status: PaymentStatus;
    gateway: Gateway;
    amount: number;
  } | null;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: Role;
  isAvailable?: boolean;
  vehicleType?: string | null;
  isBlocked?: boolean;
  createdAt: string;
}

export interface AdminPayment {
  id: string;
  amount: number;
  gateway: Gateway;
  status: PaymentStatus;
  transactionId: string | null;
  paidAt: string | null;
  createdAt: string;
  parcel?: { trackingId: string } | null;
  user?: { name: string; email: string } | null;
}

export interface AdminReview {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  parcel?: { trackingId: string } | null;
  user?: { name: string; email: string } | null;
}

export interface AuditLog {
  id: string;
  action: string;
  entity: string;
  entityId: string | null;
  actor?: { name: string; email: string; role: Role } | null;
  meta?: unknown;
  createdAt: string;
}

export interface AdminStats {
  totalParcels: number;
  totalCustomers: number;
  totalCouriers: number;
  availableCouriers: number;
  totalRevenue: number;
  parcelsByStatus: Partial<Record<ParcelStatus, number>>;
}
