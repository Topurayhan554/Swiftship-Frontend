"use client";

import { motion } from "framer-motion";
import { STATUS_LABEL } from "@/constants/track";
import type { Parcel } from "@/lib/track";

function badgeClass(status: Parcel["status"]) {
  if (status === "DELIVERED") return "bg-green-100 text-green-700";
  if (status === "CANCELLED" || status === "FAILED")
    return "bg-red-100 text-red-700";
  return "bg-[#ff7a1a]/10 text-[#c2570c]";
}

export default function ParcelSummary({ parcel }: { parcel: Parcel }) {
  const details = [
    { label: "From", value: parcel.from },
    { label: "To", value: parcel.to },
    { label: "Service", value: parcel.service },
    { label: "Weight", value: parcel.weight },
    { label: "Receiver", value: parcel.receiver },
    { label: "Courier", value: parcel.courier ?? "Not assigned yet" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-[#64748b]">
            Tracking ID
          </p>
          <p className="mt-1 text-xl font-bold text-[#0f2a4a]">{parcel.id}</p>
        </div>
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(parcel.status)}`}
        >
          {parcel.status !== "DELIVERED" &&
            parcel.status !== "CANCELLED" &&
            parcel.status !== "FAILED" && (
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#ff7a1a] opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-[#ff7a1a]" />
              </span>
            )}
          {STATUS_LABEL[parcel.status]}
        </span>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5">
        {details.map(({ label, value }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
          >
            <dt className="text-xs text-[#64748b]">{label}</dt>
            <dd className="mt-0.5 text-sm font-semibold text-[#0f2a4a]">
              {value}
            </dd>
          </motion.div>
        ))}
      </dl>

      <div className="mt-6 rounded-xl bg-[#f7f9fc] px-4 py-3">
        <p className="text-xs text-[#64748b]">
          {parcel.status === "DELIVERED" ? "Status" : "Estimated delivery"}
        </p>
        <p className="mt-0.5 text-sm font-bold text-[#0f2a4a]">{parcel.eta}</p>
      </div>
    </div>
  );
}
