import type { ServiceKey } from "@/constants/pricing";

export type ParcelStatus =
  | "PENDING"
  | "APPROVED"
  | "ASSIGNED"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "CANCELLED"
  | "FAILED";

export type PaymentStatus = "UNPAID" | "PAID";

export type CreateParcelPayload = {
  service: ServiceKey;
  country?: string;
  weight: number;
  notes?: string;
  pickup: string;
  delivery: string;
  receiverName: string;
  receiverPhone: string;
  description: string;
};

export type Parcel = {
  id: string;
  trackingId: string;
  service: ServiceKey;
  status: ParcelStatus;
  paymentStatus: PaymentStatus;
  price: number;
  weight: number;
  from: string;
  to: string;
  receiverName: string;
  receiverPhone: string;
  createdAt: string;
};
