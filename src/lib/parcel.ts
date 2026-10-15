import { Boxes, FileText, Laptop, Package, Wine } from "lucide-react";
import type { Parcel, ParcelType, PaymentStatus } from "@/types";

export const MAX_WEIGHT_KG = 50;

export const PARCEL_TYPES: Record<
  ParcelType,
  { label: string; icon: typeof Package }
> = {
  DOCUMENT: { label: "Document", icon: FileText },
  PACKAGE: { label: "Package", icon: Package },
  FRAGILE: { label: "Fragile", icon: Wine },
  ELECTRONICS: { label: "Electronics", icon: Laptop },
  OTHER: { label: "Other", icon: Boxes },
};

export const getParcelType = (type?: string | null) =>
  PARCEL_TYPES[String(type ?? "").toUpperCase() as ParcelType] ?? {
    label: type || "Other",
    icon: Package,
  };

export const formatFee = (fee?: number | null) =>
  `$${Number(fee ?? 0).toFixed(2)}`;

const NO_REPAY: PaymentStatus[] = ["PAID", "REFUNDED"];

export const isPaid = (p: Parcel) => p.payment?.status === "PAID";

export const canPay = (p: Parcel) =>
  !(p.payment && NO_REPAY.includes(p.payment.status)) &&
  p.status !== "CANCELLED" &&
  p.status !== "FAILED";

export const canEdit = (p: Parcel) => p.status === "PENDING";

export const canCancel = (p: Parcel) => p.status === "PENDING" && !isPaid(p);

export function paymentUi(p: Parcel) {
  switch (p.payment?.status) {
    case "PAID":
      return { label: "Paid", className: "text-green-600" };
    case "REFUNDED":
      return { label: "Refunded", className: "text-[#64748b]" };
    case "FAILED":
      return { label: "Failed", className: "text-red-600" };
    default:
      return { label: "Unpaid", className: "text-[#e8590c]" };
  }
}

export function normalizeParcel(raw: any): Parcel {
  const legacyPaid = raw.paymentStatus === "PAID";
  return {
    ...raw,
    parcelType: raw.parcelType ?? "PACKAGE",
    fee: raw.fee ?? raw.price ?? 0,
    weightKg: raw.weightKg ?? raw.weight ?? 0,
    pickupAddress: raw.pickupAddress ?? raw.from ?? "",
    deliveryAddress: raw.deliveryAddress ?? raw.to ?? "",
    payment:
      raw.payment ??
      (legacyPaid
        ? {
            id: "legacy",
            status: "PAID",
            gateway: "STRIPE",
            amount: raw.fee ?? raw.price ?? 0,
            paidAt: null,
          }
        : null),
  };
}
