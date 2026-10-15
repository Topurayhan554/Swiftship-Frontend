"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Package,
  PackagePlus,
  PackageSearch,
  Truck,
} from "lucide-react";
import { EASE } from "@/components/shared/motion";
import { PARCEL_TYPES, canPay } from "@/lib/parcel";
import { useGetMe } from "@/hooks";
import EmptyState from "../EmptyState";
import PageHeader from "../PageHeader";
import StatCard from "../StatCard";
import StatusBadge from "../StatusBadge";
import { useMyParcels } from "@/hooks/useParcel";

const ACTIVE = ["APPROVED", "ASSIGNED", "PICKED_UP", "IN_TRANSIT"];

export default function CustomerOverview() {
  const { data: me } = useGetMe();
  const { data: parcels, isLoading, isError, refetch } = useMyParcels();
  const firstName = me?.data?.name?.split(" ")[0];

  const total = parcels?.length ?? 0;
  const active = parcels?.filter((p) => ACTIVE.includes(p.status)).length ?? 0;
  const delivered =
    parcels?.filter((p) => p.status === "DELIVERED").length ?? 0;
  const unpaid = parcels?.filter(canPay).length ?? 0;
  const recent = parcels?.slice(0, 5) ?? [];

  return (
    <>
      <PageHeader
        title={`Welcome back${firstName ? `, ${firstName}` : ""}`}
        description="Here is what is happening with your deliveries."
        action={
          <Link
            href="/dashboard/customer/book"
            className="group inline-flex items-center gap-2 rounded-full bg-[#ff7a1a] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#ff7a1a]/25 transition-colors hover:bg-[#e8590c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a] focus-visible:ring-offset-2"
          >
            <PackagePlus aria-hidden="true" className="size-4" />
            Book a parcel
          </Link>
        }
      />

      {/* Stats */}
      {isLoading ? (
        <div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          aria-busy="true"
        >
          {[0, 1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-[118px] animate-pulse rounded-2xl bg-white ring-1 ring-black/5"
            />
          ))}
        </div>
      ) : (
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <StatCard icon={Package} label="Total parcels" value={total} />
          <StatCard
            icon={Truck}
            label="In progress"
            value={active}
            hint="On the way to receivers"
          />
          <StatCard icon={CheckCircle2} label="Delivered" value={delivered} />
          <StatCard
            icon={Clock}
            label="Awaiting payment"
            value={unpaid}
            hint="Pay to confirm booking"
          />
        </motion.div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Recent parcels */}
        <section className="rounded-2xl bg-white shadow-[0_6px_24px_rgba(15,42,74,0.06)] ring-1 ring-black/5">
          <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
            <h2 className="text-base font-semibold text-[#0f2a4a]">
              Recent parcels
            </h2>
            <Link
              href="/dashboard/customer/parcels"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#e8590c] hover:underline"
            >
              View all
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {isLoading ? (
            <ul className="divide-y divide-black/5" aria-busy="true">
              {[0, 1, 2].map((n) => (
                <li
                  key={n}
                  className="flex animate-pulse items-center gap-4 px-5 py-4"
                >
                  <div className="size-10 rounded-full bg-black/5" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/3 rounded bg-black/5" />
                    <div className="h-3 w-1/2 rounded bg-black/5" />
                  </div>
                </li>
              ))}
            </ul>
          ) : isError ? (
            <EmptyState
              icon={Package}
              title="Could not load parcels"
              text="Something went wrong while loading your parcels."
              action={
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="rounded-full bg-[#ff7a1a] px-5 py-2 text-sm font-semibold text-white hover:bg-[#e8590c]"
                >
                  Try again
                </button>
              }
            />
          ) : recent.length === 0 ? (
            <EmptyState
              icon={PackagePlus}
              title="No parcels yet"
              text="Book your first delivery and it will show up here."
              action={
                <Link
                  href="/dashboard/customer/book"
                  className="rounded-full bg-[#ff7a1a] px-5 py-2 text-sm font-semibold text-white hover:bg-[#e8590c]"
                >
                  Book a parcel
                </Link>
              }
            />
          ) : (
            <ul className="divide-y divide-black/5">
              {recent.map((p, i) => {
                const Icon = (
                  PARCEL_TYPES[p.parcelType] ?? PARCEL_TYPES.PACKAGE
                ).icon;
                return (
                  <motion.li
                    key={p.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.07, ease: EASE }}
                  >
                    <Link
                      href={`/track/${p.trackingId}`}
                      className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[#f7f9fc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ff7a1a]"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#ffe6d1] text-[#0f2a4a]">
                        <Icon
                          aria-hidden="true"
                          className="size-5"
                          strokeWidth={1.7}
                        />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[#0f2a4a]">
                          {p.trackingId} · {p.receiverName}
                        </p>
                        <p className="truncate text-xs text-[#64748b]">
                          {p.pickupAddress} → {p.deliveryAddress}
                        </p>
                      </div>
                      <StatusBadge status={p.status} />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Quick actions */}
        <section className="space-y-4">
          <Link
            href="/dashboard/customer/book"
            className="group block rounded-2xl bg-gradient-to-br from-[#0f2a4a] to-[#143a63] p-6 text-white shadow-lg shadow-[#0f2a4a]/20 transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a]"
          >
            <PackagePlus aria-hidden="true" className="size-7 text-[#ff7a1a]" />
            <h3 className="mt-3 text-base font-bold">Send a new parcel</h3>
            <p className="mt-1 text-sm text-white/70">
              Pick a parcel type, enter addresses and book in a minute.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#ff7a1a]">
              Book now{" "}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </span>
          </Link>

          <Link
            href="/track"
            className="group block rounded-2xl bg-white p-6 shadow-[0_6px_24px_rgba(15,42,74,0.06)] ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(255,122,26,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a]"
          >
            <PackageSearch
              aria-hidden="true"
              className="size-7 text-[#ff7a1a]"
            />
            <h3 className="mt-3 text-base font-bold text-[#0f2a4a]">
              Track any parcel
            </h3>
            <p className="mt-1 text-sm text-[#64748b]">
              Have a tracking ID? See live status in seconds.
            </p>
          </Link>
        </section>
      </div>
    </>
  );
}
