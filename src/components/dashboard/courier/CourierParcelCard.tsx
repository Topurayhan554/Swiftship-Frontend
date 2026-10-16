"use client";

import { MapPin, Package, Phone } from "lucide-react";
import { STATUS_LABEL, type ParcelStatus } from "@/constants/track";
import { useUpdateParcelStatus, type CourierParcel } from "@/hooks/useCourier";

type Action = { status: ParcelStatus; label: string; danger?: boolean };

const ACTIONS: Partial<Record<ParcelStatus, Action[]>> = {
  ASSIGNED: [{ status: "PICKED_UP", label: "Mark picked up" }],
  PICKED_UP: [
    { status: "IN_TRANSIT", label: "Start transit" },
    { status: "FAILED", label: "Delivery failed", danger: true },
  ],
  IN_TRANSIT: [
    { status: "DELIVERED", label: "Mark delivered" },
    { status: "FAILED", label: "Delivery failed", danger: true },
  ],
};

function badgeClass(status: ParcelStatus) {
  if (status === "DELIVERED") return "bg-green-100 text-green-700";
  if (status === "FAILED" || status === "CANCELLED")
    return "bg-red-100 text-red-700";
  return "bg-[#ff7a1a]/10 text-[#c2570c]";
}

export default function CourierParcelCard({
  parcel,
}: {
  parcel: CourierParcel;
}) {
  const { mutate, isPending, error } = useUpdateParcelStatus();
  const status = parcel.status;
  const actions = ACTIONS[status] ?? [];

  const handle = (a: Action) => {
    if (a.danger && !window.confirm("Mark this delivery as failed?")) return;
    mutate({ id: parcel.id, status: a.status });
  };

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-[#64748b]">
            Tracking ID
          </p>
          <p className="mt-1 text-lg font-bold text-[#0f2a4a]">
            {parcel.trackingId}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(status)}`}
        >
          {STATUS_LABEL[status] ?? status}
        </span>
      </div>

      <div className="mt-4 grid gap-3 text-sm text-[#0f2a4a] sm:grid-cols-2">
        <p className="flex gap-2">
          <MapPin className="mt-0.5 size-4 shrink-0 text-[#ff7a1a]" />
          <span>
            <span className="block text-xs text-[#64748b]">Pickup</span>
            {parcel.pickupAddress}
          </span>
        </p>
        <p className="flex gap-2">
          <MapPin className="mt-0.5 size-4 shrink-0 text-[#0f2a4a]" />
          <span>
            <span className="block text-xs text-[#64748b]">Delivery</span>
            {parcel.deliveryAddress}
          </span>
        </p>
        <p className="flex gap-2">
          <Phone className="mt-0.5 size-4 shrink-0 text-[#64748b]" />
          <span>
            <span className="block text-xs text-[#64748b]">Receiver</span>
            {parcel.receiverName} · {parcel.receiverPhone}
          </span>
        </p>
        <p className="flex gap-2">
          <Package className="mt-0.5 size-4 shrink-0 text-[#64748b]" />
          <span>
            <span className="block text-xs text-[#64748b]">Parcel</span>
            {parcel.parcelType} · {parcel.weightKg} kg
          </span>
        </p>
      </div>

      {actions.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {actions.map((a) => (
            <button
              key={a.status}
              type="button"
              disabled={isPending}
              onClick={() => handle(a)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-opacity disabled:opacity-50 ${
                a.danger
                  ? "border border-red-200 text-red-600 hover:bg-red-50"
                  : "bg-[#ff7a1a] text-white hover:opacity-90"
              }`}
            >
              {isPending ? "Updating..." : a.label}
            </button>
          ))}
        </div>
      )}

      {error && <p className="mt-3 text-sm text-red-600">{error.message}</p>}
    </div>
  );
}
