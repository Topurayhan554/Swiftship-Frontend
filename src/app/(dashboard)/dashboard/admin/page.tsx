"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Package, Truck, Users, Wallet, type LucideIcon } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import { formatFee } from "@/lib/parcel";
import { useAdminParcels, useAdminStats } from "@/hooks/useAdmin";
import {
  Badge,
  CARD,
  PARCEL_TONE,
  fmtDate,
  prettyEnum,
} from "@/components/dashboard/admin/AdminUI";
import { PARCEL_STATUSES } from "@/types";

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  loading,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  icon: LucideIcon;
  loading: boolean;
}) {
  return (
    <div className={`${CARD} p-5`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-[#94a3b8]">
          {label}
        </p>
        <span className="flex size-9 items-center justify-center rounded-xl bg-[#ff7a1a]/10 text-[#ff7a1a]">
          <Icon aria-hidden="true" className="size-4" />
        </span>
      </div>
      {loading ? (
        <div className="mt-3 h-8 w-24 animate-pulse rounded bg-slate-100" />
      ) : (
        <p className="mt-2 text-2xl font-extrabold tracking-tight text-[#0f2a4a]">
          {value}
        </p>
      )}
      {hint && !loading && (
        <p className="mt-1 text-xs text-[#94a3b8]">{hint}</p>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  const stats = useAdminStats();
  const recent = useAdminParcels({ page: 1, limit: 5 });
  const s = stats.data;
  const total = s?.totalParcels ?? 0;

  return (
    <>
      <PageHeader
        title="Admin dashboard"
        description="A quick look at how SwiftShip is doing."
      />

      {stats.error && (
        <p
          role="alert"
          className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          Could not load stats: {stats.error.message}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Parcels"
          icon={Package}
          loading={stats.isLoading}
          value={s?.totalParcels ?? 0}
        />
        <StatCard
          label="Revenue"
          icon={Wallet}
          loading={stats.isLoading}
          value={formatFee(s?.totalRevenue ?? 0)}
          hint="From paid parcels"
        />
        <StatCard
          label="Customers"
          icon={Users}
          loading={stats.isLoading}
          value={s?.totalCustomers ?? 0}
        />
        <StatCard
          label="Couriers"
          icon={Truck}
          loading={stats.isLoading}
          value={s?.totalCouriers ?? 0}
          hint={`${s?.availableCouriers ?? 0} available now`}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className={`${CARD} p-5`}>
          <h2 className="text-base font-semibold text-[#0f2a4a]">
            Parcels by status
          </h2>
          <ul className="mt-4 space-y-3">
            {PARCEL_STATUSES.map((st) => {
              const n = s?.parcelsByStatus[st] ?? 0;
              const pct = total ? Math.round((n / total) * 100) : 0;
              return (
                <li key={st}>
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-[#334155]">
                      {prettyEnum(st)}
                    </span>
                    <span className="text-[#64748b]">{n}</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-[#ff7a1a]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className={`${CARD} p-5`}>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#0f2a4a]">
              Recent parcels
            </h2>
            <Link
              href="/dashboard/admin/parcels"
              className="text-xs font-semibold text-[#e8590c] hover:underline"
            >
              View all
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-[#f1f5f9]">
            {recent.isLoading && (
              <li className="py-6 text-center text-sm text-[#94a3b8]">
                Loading...
              </li>
            )}
            {recent.data?.data.length === 0 && (
              <li className="py-6 text-center text-sm text-[#94a3b8]">
                No parcels yet.
              </li>
            )}
            {recent.data?.data.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between gap-3 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#0f2a4a]">
                    {p.trackingId}
                  </p>
                  <p className="truncate text-xs text-[#94a3b8]">
                    {p.pickupDistrict} to {p.deliveryDistrict} &middot;{" "}
                    {fmtDate(p.createdAt)}
                  </p>
                </div>
                <Badge tone={PARCEL_TONE[p.status]}>
                  {prettyEnum(p.status)}
                </Badge>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
