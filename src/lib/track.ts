import type { ParcelStatus } from "@/constants/track";

export type ParcelEvent = { status: ParcelStatus; time: string; note: string };

export type Parcel = {
  id: string;
  status: ParcelStatus;
  service: string;
  weight: string;
  from: string;
  to: string;
  receiver: string;
  courier: string | null;
  eta: string;
  events: ParcelEvent[];
};

const NOTES: Record<ParcelStatus, string> = {
  PENDING: "Booking received",
  APPROVED: "Booking approved by SwiftShip",
  ASSIGNED: "Courier assigned to your parcel",
  PICKED_UP: "Parcel collected from sender",
  IN_TRANSIT: "Parcel is on its way",
  DELIVERED: "Delivered to receiver",
  CANCELLED: "Booking was cancelled",
  FAILED: "Delivery attempt failed",
};

const TYPE_LABEL: Record<string, string> = {
  DOCUMENT: "Document Delivery",
  PACKAGE: "Parcel Delivery",
  FRAGILE: "Fragile Delivery",
  ELECTRONICS: "Electronics Delivery",
  OTHER: "Parcel Delivery",
};

const fmt = (d: string | Date) =>
  new Date(d).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

export function toTrackParcel(raw: any): Parcel | null {
  if (!raw) return null;

  const status = raw.status as ParcelStatus;
  const logs: any[] = raw.statusLogs ?? [];

  const events: ParcelEvent[] = [...logs]
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    )
    .map((l) => ({
      status: (l.status ?? l.toStatus) as ParcelStatus,
      time: fmt(l.createdAt),
      note: l.note ?? NOTES[(l.status ?? l.toStatus) as ParcelStatus] ?? "",
    }));

  let eta = "Not available";
  if (status === "DELIVERED") eta = "Delivered";
  else if (raw.estimatedDelivery) eta = fmt(raw.estimatedDelivery);

  return {
    id: raw.trackingId,
    status,
    service: TYPE_LABEL[raw.parcelType] ?? "Parcel Delivery",
    weight: `${raw.weightKg} kg`,
    from: raw.pickupAddress,
    to: raw.deliveryAddress,
    receiver: raw.receiverName,
    courier: raw.courier?.name ?? null,
    eta,
    events,
  };
}

export function normalizeId(raw: string) {
  try {
    return decodeURIComponent(raw).trim();
  } catch {
    return raw.trim();
  }
}
