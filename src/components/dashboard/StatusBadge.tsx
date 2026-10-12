import { STATUS_LABEL, type ParcelStatus } from "@/constants/track";

export function statusClass(status: ParcelStatus) {
  if (status === "DELIVERED") return "bg-green-100 text-green-700";
  if (status === "CANCELLED" || status === "FAILED")
    return "bg-red-100 text-red-700";
  if (status === "PENDING") return "bg-slate-100 text-slate-600";
  return "bg-[#ff7a1a]/10 text-[#c2570c]";
}

export default function StatusBadge({ status }: { status: ParcelStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusClass(status)}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
