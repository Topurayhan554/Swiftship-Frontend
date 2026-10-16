"use client";

import { useCourierParcels } from "@/hooks/useCourier";
import CourierParcelCard from "./CourierParcelCard";

const ACTIVE = ["ASSIGNED", "PICKED_UP", "IN_TRANSIT"];

export default function CourierParcelList({
  mode,
}: {
  mode: "active" | "history";
}) {
  const { data, isLoading, isError, refetch } = useCourierParcels();

  if (isLoading) {
    return (
      <div className="space-y-4" aria-busy="true">
        {[0, 1].map((n) => (
          <div key={n} className="h-44 animate-pulse rounded-2xl bg-black/5" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-10 text-center">
        <p className="text-sm text-[#64748b]">Could not load parcels.</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-3 rounded-full bg-[#ff7a1a] px-5 py-2 text-sm font-semibold text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  const parcels = (data ?? []).filter((p) =>
    mode === "active" ? ACTIVE.includes(p.status) : !ACTIVE.includes(p.status),
  );

  if (parcels.length === 0) {
    return (
      <p className="rounded-2xl bg-white p-10 text-center text-sm text-[#64748b] ring-1 ring-black/5">
        {mode === "active"
          ? "No active deliveries right now."
          : "No delivery history yet."}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {parcels.map((p) => (
        <CourierParcelCard key={p.id} parcel={p} />
      ))}
    </div>
  );
}
