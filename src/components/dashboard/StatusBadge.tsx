import { STATUS_LABEL, type ParcelStatus } from "@/constants/track";

export function statusClass(status: ParcelStatus) {
  if (status === "DELIVERED")
    return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20";
  if (status === "CANCELLED" || status === "FAILED")
    return "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20";
  if (status === "PENDING")
    return "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-500/20 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-600/30";
  if (status === "IN_TRANSIT")
    return "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/20";
  return "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20";
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
