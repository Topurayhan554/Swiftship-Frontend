import { AlertTriangle, XCircle, type LucideIcon } from "lucide-react";

export type ParcelStatus =
  | "PENDING"
  | "APPROVED"
  | "ASSIGNED"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "CANCELLED"
  | "FAILED";

export const STATUS_FLOW: { key: ParcelStatus; label: string; hint: string }[] =
  [
    { key: "PENDING", label: "Pending", hint: "Order placed" },
    { key: "APPROVED", label: "Approved", hint: "Booking confirmed" },
    { key: "ASSIGNED", label: "Assigned", hint: "Courier assigned" },
    { key: "PICKED_UP", label: "Picked up", hint: "Parcel collected" },
    { key: "IN_TRANSIT", label: "In transit", hint: "On the way" },
    { key: "DELIVERED", label: "Delivered", hint: "Handed to receiver" },
  ];

export const BRANCH_STATUS: Partial<
  Record<ParcelStatus, { label: string; hint: string; icon: LucideIcon }>
> = {
  CANCELLED: {
    label: "Cancelled",
    hint: "This booking was cancelled",
    icon: XCircle,
  },
  FAILED: {
    label: "Delivery failed",
    hint: "We couldn't deliver this parcel",
    icon: AlertTriangle,
  },
};

export const STATUS_LABEL: Record<ParcelStatus, string> = {
  PENDING: "Pending",
  APPROVED: "Approved",
  ASSIGNED: "Assigned",
  PICKED_UP: "Picked up",
  IN_TRANSIT: "In transit",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  FAILED: "Failed",
};

export const SAMPLE_IDS = ["SS-2041", "SS-1001", "SS-CANCEL"];
