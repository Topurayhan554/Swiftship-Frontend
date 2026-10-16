"use client";

import Link from "next/link";
import { useCourierParcels } from "@/hooks/useCourier";

export default function CourierOverviewPage() {
  const { data, isLoading } = useCourierParcels();
  const parcels = data ?? [];

  const count = (...s: string[]) =>
    parcels.filter((p) => s.includes(p.status)).length;

  const stats = [
    { label: "Assigned", value: count("ASSIGNED") },
    { label: "In progress", value: count("PICKED_UP", "IN_TRANSIT") },
    { label: "Delivered", value: count("DELIVERED") },
    { label: "Failed", value: count("FAILED") },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0f2a4a]">Courier overview</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Your assigned deliveries at a glance.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5"
          >
            <p className="text-xs text-[#64748b]">{s.label}</p>
            <p className="mt-1 text-3xl font-extrabold text-[#0f2a4a]">
              {isLoading ? "–" : s.value}
            </p>
          </div>
        ))}
      </div>

      <Link
        href="/dashboard/courier/deliveries"
        className="inline-block rounded-full bg-[#ff7a1a] px-5 py-2 text-sm font-semibold text-white"
      >
        View active deliveries
      </Link>
    </div>
  );
}
