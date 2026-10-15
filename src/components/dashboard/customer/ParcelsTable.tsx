"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CreditCard,
  Eye,
  ExternalLink,
  PackagePlus,
  PackageSearch,
  Pencil,
  Search,
  XCircle,
} from "lucide-react";
import { EASE } from "@/components/shared/motion";
import {
  canCancel,
  canEdit,
  canPay,
  formatFee,
  getParcelType,
  normalizeParcel,
  paymentUi,
} from "@/lib/parcel";
import type { Parcel } from "@/types";
import EmptyState from "../EmptyState";
import PageHeader from "../PageHeader";
import StatusBadge from "../StatusBadge";
import {
  CancelParcelModal,
  EditParcelModal,
  ViewParcelModal,
} from "./ParcelModals";
import PayMethodModal from "./PayMethodModal";
import { useMyParcels } from "@/hooks/useParcel";
import { usePayParcel } from "@/hooks";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "delivered", label: "Delivered" },
  { key: "cancelled", label: "Cancelled / Failed" },
] as const;
type FilterKey = (typeof FILTERS)[number]["key"];

const matchFilter = (status: string, f: FilterKey) =>
  f === "all" ||
  (f === "delivered" && status === "DELIVERED") ||
  (f === "cancelled" && (status === "CANCELLED" || status === "FAILED")) ||
  (f === "active" && !["DELIVERED", "CANCELLED", "FAILED"].includes(status));

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function IconButton({
  label,
  onClick,
  danger,
  children,
}: {
  label: string;
  onClick: () => void;
  danger?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`rounded-lg p-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a] ${
        danger
          ? "text-red-500 hover:bg-red-50"
          : "text-[#64748b] hover:bg-[#ff7a1a]/10 hover:text-[#e8590c]"
      }`}
    >
      {children}
    </button>
  );
}

export default function ParcelsTable() {
  const { data: rawParcels, isLoading, isError, refetch } = useMyParcels();
  const parcels = useMemo(
    () => (rawParcels ?? []).map(normalizeParcel),
    [rawParcels],
  );

  console.log("RAW:", rawParcels?.[0]);
  console.log("NORMALIZED:", parcels[0]);
  const pay = usePayParcel();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [viewing, setViewing] = useState<Parcel | null>(null);
  const [editing, setEditing] = useState<Parcel | null>(null);
  const [cancelling, setCancelling] = useState<Parcel | null>(null);
  const [payingParcel, setPayingParcel] = useState<Parcel | null>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return parcels.filter(
      (p) =>
        matchFilter(p.status, filter) &&
        (!q ||
          p.trackingId.toLowerCase().includes(q) ||
          p.receiverName.toLowerCase().includes(q) ||
          p.pickupAddress.toLowerCase().includes(q) ||
          p.deliveryAddress.toLowerCase().includes(q)),
    );
  }, [parcels, query, filter]);

  return (
    <>
      <PageHeader
        title="My parcels"
        description="Every parcel you have booked, in one place."
        action={
          <Link
            href="/dashboard/customer/book"
            className="inline-flex items-center gap-2 rounded-full bg-[#ff7a1a] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#ff7a1a]/25 transition-colors hover:bg-[#e8590c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a] focus-visible:ring-offset-2"
          >
            <PackagePlus aria-hidden="true" className="size-4" />
            Book a parcel
          </Link>
        }
      />

      <div className="rounded-2xl bg-white shadow-[0_6px_24px_rgba(15,42,74,0.06)] ring-1 ring-black/5">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-black/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="tablist"
            aria-label="Filter parcels"
            className="flex flex-wrap gap-2"
          >
            {FILTERS.map(({ key, label }) => {
              const active = filter === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(key)}
                  className={`relative rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a] ${active ? "text-white" : "text-[#64748b] hover:text-[#0f2a4a]"}`}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-[#0f2a4a]"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  )}
                  <span className="relative">{label}</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-64">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#94a3b8]"
            />
            <label htmlFor="parcel-search" className="sr-only">
              Search parcels
            </label>
            <input
              id="parcel-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search ID, receiver, address"
              className="h-10 w-full rounded-xl border border-[#e2e8f0] bg-white pl-9 pr-3 text-sm text-[#0f2a4a] outline-none transition-colors placeholder:text-[#94a3b8] focus:border-[#ff7a1a] focus:ring-2 focus:ring-[#ff7a1a]/25"
            />
          </div>
        </div>

        {/* Body */}
        {isLoading ? (
          <ul className="divide-y divide-black/5" aria-busy="true">
            {[0, 1, 2, 3, 4].map((n) => (
              <li key={n} className="flex animate-pulse gap-4 px-5 py-4">
                <div className="h-4 w-20 rounded bg-black/5" />
                <div className="h-4 flex-1 rounded bg-black/5" />
                <div className="h-4 w-16 rounded bg-black/5" />
              </li>
            ))}
          </ul>
        ) : isError ? (
          <EmptyState
            icon={PackageSearch}
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
        ) : rows.length === 0 ? (
          <EmptyState
            icon={PackageSearch}
            title="No parcels found"
            text={
              query || filter !== "all"
                ? "Try a different search or filter."
                : "You have not booked any parcels yet."
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <caption className="sr-only">Your parcels</caption>
              <thead className="text-xs uppercase tracking-wider text-[#94a3b8]">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Tracking ID
                  </th>
                  <th scope="col" className="px-3 py-3 font-semibold">
                    Receiver
                  </th>
                  <th scope="col" className="px-3 py-3 font-semibold">
                    Route
                  </th>
                  <th scope="col" className="px-3 py-3 font-semibold">
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-right font-semibold"
                  >
                    Fee
                  </th>
                  <th scope="col" className="px-3 py-3 font-semibold">
                    Payment
                  </th>
                  <th scope="col" className="px-3 py-3 font-semibold">
                    Status
                  </th>
                  <th scope="col" className="px-5 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                <AnimatePresence initial={false}>
                  {rows.map((p, i) => {
                    const typeInfo = getParcelType(p.parcelType);
                    const Icon = typeInfo.icon;
                    const payUi = paymentUi(p);
                    return (
                      <motion.tr
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: Math.min(i, 8) * 0.04,
                          ease: EASE,
                        }}
                        className="transition-colors hover:bg-[#f7f9fc]"
                      >
                        <th scope="row" className="px-5 py-4">
                          <p className="font-semibold text-[#0f2a4a]">
                            {p.trackingId}
                          </p>
                          <p className="text-xs font-normal text-[#94a3b8]">
                            {fmtDate(p.createdAt)}
                          </p>
                        </th>
                        <td className="px-3 py-4">
                          <p className="font-medium text-[#0f2a4a]">
                            {p.receiverName}
                          </p>
                          <p className="text-xs text-[#94a3b8]">
                            {p.receiverPhone}
                          </p>
                        </td>
                        <td className="max-w-[240px] px-3 py-4 text-[#475569]">
                          <p className="truncate" title={p.pickupAddress}>
                            {p.pickupAddress}
                          </p>
                          <p
                            className="truncate text-xs text-[#94a3b8]"
                            title={p.deliveryAddress}
                          >
                            → {p.deliveryAddress}
                          </p>
                        </td>
                        <td className="px-3 py-4">
                          <span className="inline-flex items-center gap-1.5 text-[#475569]">
                            <Icon
                              aria-hidden="true"
                              className="size-4 text-[#ff7a1a]"
                            />
                            {typeInfo.label}
                          </span>
                          <p className="text-xs text-[#94a3b8]">
                            {p.weightKg} kg
                          </p>
                        </td>
                        <td className="px-3 py-4 text-right font-semibold text-[#0f2a4a]">
                          {formatFee(p.fee)}
                        </td>
                        <td className="px-3 py-4">
                          <span
                            className={`text-xs font-semibold ${payUi.className}`}
                          >
                            {payUi.label}
                          </span>
                        </td>
                        <td className="px-3 py-4">
                          <StatusBadge status={p.status} />
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-1">
                            {canPay(p) && (
                              <button
                                type="button"
                                onClick={() => {
                                  pay.reset();
                                  setPayingParcel(p);
                                }}
                                className="mr-1 inline-flex items-center gap-1.5 rounded-full bg-[#ff7a1a] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#e8590c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a] focus-visible:ring-offset-2"
                              >
                                <CreditCard
                                  aria-hidden="true"
                                  className="size-3.5"
                                />
                                Pay
                              </button>
                            )}
                            <IconButton
                              label={`View ${p.trackingId}`}
                              onClick={() => setViewing(p)}
                            >
                              <Eye aria-hidden="true" className="size-4" />
                            </IconButton>
                            {canEdit(p) && (
                              <IconButton
                                label={`Edit ${p.trackingId}`}
                                onClick={() => setEditing(p)}
                              >
                                <Pencil aria-hidden="true" className="size-4" />
                              </IconButton>
                            )}
                            <Link
                              href={`/track/${p.trackingId}`}
                              aria-label={`Track ${p.trackingId}`}
                              title="Track"
                              className="rounded-lg p-1.5 text-[#64748b] transition-colors hover:bg-[#ff7a1a]/10 hover:text-[#e8590c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a]"
                            >
                              <ExternalLink
                                aria-hidden="true"
                                className="size-4"
                              />
                            </Link>
                            {canCancel(p) && (
                              <IconButton
                                label={`Cancel ${p.trackingId}`}
                                onClick={() => setCancelling(p)}
                                danger
                              >
                                <XCircle
                                  aria-hidden="true"
                                  className="size-4"
                                />
                              </IconButton>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {viewing && (
        <ViewParcelModal parcel={viewing} onClose={() => setViewing(null)} />
      )}
      {editing && (
        <EditParcelModal parcel={editing} onClose={() => setEditing(null)} />
      )}
      {cancelling && (
        <CancelParcelModal
          parcel={cancelling}
          onClose={() => setCancelling(null)}
        />
      )}
      {payingParcel && (
        <PayMethodModal
          parcel={payingParcel}
          pendingMethod={pay.isPending ? (pay.variables?.method ?? null) : null}
          isError={pay.isError}
          onClose={() => setPayingParcel(null)}
          onSelect={(method) =>
            pay.mutate({ parcelId: payingParcel.id, method })
          }
        />
      )}
    </>
  );
}
