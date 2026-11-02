import {
  INTL_RATES,
  SERVICE_RATES,
  type ServiceKey,
} from "@/constants/pricing";
import type { Parcel, ParcelPayment, ParcelType } from "@/types";

export type RawParcel = {
  id: string;
  trackingId?: string;
  trackingNumber?: string;
  service?: string;
  serviceType?: string;
  parcelType?: string;
  status: string;
  paymentStatus?: string;
  payment?: Partial<ParcelPayment> | null;
  fee?: number | string;
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
  description?: string | null;
  estimatedDelivery?: string | null;
  actualDelivery?: string | null;
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

export function mapParcel(raw: RawParcel): Parcel {
  const fee = num(raw.fee, raw.price, raw.totalPrice, raw.cost, raw.amount);

  const payment: ParcelPayment | null =
    raw.payment || raw.paymentStatus
      ? {
          id: raw.payment?.id ?? "",
          status: (raw.payment?.status ??
            raw.paymentStatus ??
            "PENDING") as ParcelPayment["status"],
          gateway: raw.payment?.gateway ?? "STRIPE",
          amount: num(raw.payment?.amount, fee),
          paidAt: raw.payment?.paidAt ?? null,
        }
      : null;

  return {
    id: raw.id,
    trackingId: raw.trackingId ?? raw.trackingNumber ?? "",
    parcelType: (raw.parcelType ?? "OTHER") as ParcelType,
    description: raw.description ?? null,
    weightKg: num(raw.weightKg, raw.weight),
    fee,
    pickupAddress: raw.pickupAddress ?? raw.pickup ?? raw.from ?? "",
    deliveryAddress: raw.deliveryAddress ?? raw.delivery ?? raw.to ?? "",
    receiverName: raw.receiverName,
    receiverPhone: raw.receiverPhone,
    status: raw.status as Parcel["status"],
    estimatedDelivery: raw.estimatedDelivery ?? null,
    actualDelivery: raw.actualDelivery ?? null,
    createdAt: raw.createdAt,
    payment,
  };
}
