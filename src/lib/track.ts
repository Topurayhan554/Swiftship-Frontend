import { cache } from "react";
import { STATUS_FLOW, type ParcelStatus } from "@/constants/track";

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

const fmt = (d: Date) =>
  d.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

function hash(s: string) {
  return [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
}

export async function fetchParcel(rawId: string): Promise<Parcel | null> {
  await new Promise((r) => setTimeout(r, 900));

  const id = rawId.toUpperCase();
  if (id.startsWith("X")) return null; // demo: IDs starting with X are "not found"

  const flow = STATUS_FLOW.map((s) => s.key);
  let status: ParcelStatus;
  if (id.includes("CANCEL")) status = "CANCELLED";
  else if (id.includes("FAIL")) status = "FAILED";
  else if (id === "SS-2041") status = "IN_TRANSIT";
  else status = flow[hash(id) % flow.length];

  const reached: ParcelStatus[] =
    status === "CANCELLED"
      ? flow.slice(0, 2)
      : status === "FAILED"
        ? flow.slice(0, 5)
        : flow.slice(0, flow.indexOf(status) + 1);
  const all =
    status === "CANCELLED" || status === "FAILED"
      ? [...reached, status]
      : reached;

  const now = Date.now();
  const events: ParcelEvent[] = all.map((s, i) => ({
    status: s,
    time: fmt(new Date(now - (all.length - i) * 5 * 3600_000)),
    note: NOTES[s],
  }));

  return {
    id,
    status,
    service: "Parcel Delivery",
    weight: "2.5 kg",
    from: "Dinajpur, Rangpur",
    to: "Dhaka, Dhaka",
    receiver: "Rahim Uddin",
    courier: reached.includes("ASSIGNED") ? "Karim Hossain" : null,
    eta:
      status === "DELIVERED" ? "Delivered" : fmt(new Date(now + 20 * 3600_000)),
    events,
  };
}

export const getParcel = cache(fetchParcel);

export function normalizeId(raw: string) {
  try {
    return decodeURIComponent(raw).trim();
  } catch {
    return raw.trim();
  }
}
