import {
  INTL_RATES,
  SERVICE_RATES,
  type ServiceKey,
} from "@/constants/pricing";
import type { Parcel } from "@/types";

type RawParcel = {
  id: string;
  trackingId?: string;
  trackingNumber?: string;
  service?: string;
  serviceType?: string;
  parcelType?: string;
  status: string;
  paymentStatus?: string;
  payment?: { status?: string };
  price?: number | string;
  totalPrice?: number | string;
  cost?: number | string;
  amount?: number | string;
  weightKg?: number | string;
  weight?: number | string;
  pickupAddress?: string;
  pickup?: string;
  from?: string;
  deliveryAddress?: string;
  delivery?: string;
  to?: string;
  receiverName: string;
  receiverPhone: string;
  createdAt: string;
};

function num(...values: unknown[]): number {
  for (const v of values) {
    if (v === undefined || v === null || v === "") continue;
    const n = Number(v);
    if (Number.isFinite(n)) return n;
  }
  return 0;
}

export function estimatePrice(
  service: ServiceKey,
  weightKg: number,
  country?: string,
): number {
  if (service === "international") {
    const intl = (INTL_RATES.find((r) => r.country === country) ??
      INTL_RATES[0]) as unknown as Record<string, unknown>;
    const base = num(intl.base, intl.basePrice);
    const perKg = num(intl.perKg, intl.perKgRate, intl.rate);
    return base + perKg * weightKg;
  }

  const rate = SERVICE_RATES[service] as unknown as Record<string, unknown>;
  const base = num(rate.base, rate.basePrice);
  const perKg = num(rate.perKg, rate.perKgRate);
  return base + perKg * weightKg;
}

const TYPE_TO_SERVICE: Record<string, string> = {
  DOCUMENT: "document",
  PACKAGE: "parcel",
  FRAGILE: "fragile",
  ELECTRONICS: "electronics",
  OTHER: "parcel",
};

function toServiceKey(raw: RawParcel): ServiceKey {
  const direct = String(raw.service ?? raw.serviceType ?? "").toLowerCase();
  if (direct in SERVICE_RATES) return direct as ServiceKey;

  const mapped = TYPE_TO_SERVICE[String(raw.parcelType ?? "").toUpperCase()];
  if (mapped && mapped in SERVICE_RATES) return mapped as ServiceKey;

  return "parcel" as ServiceKey;
}

export function mapParcel(raw: RawParcel): Parcel {
  return {
    id: raw.id,
    trackingId: raw.trackingId ?? raw.trackingNumber ?? "",
    service: toServiceKey(raw),
    status: raw.status as Parcel["status"],
    paymentStatus: (raw.paymentStatus ??
      raw.payment?.status ??
      "UNPAID") as Parcel["paymentStatus"],
    price: num(raw.price, raw.totalPrice, raw.cost, raw.amount),
    weight: num(raw.weightKg, raw.weight),
    from: raw.pickupAddress ?? raw.pickup ?? raw.from ?? "",
    to: raw.deliveryAddress ?? raw.delivery ?? raw.to ?? "",
    receiverName: raw.receiverName,
    receiverPhone: raw.receiverPhone,
    createdAt: raw.createdAt,
  };
}
