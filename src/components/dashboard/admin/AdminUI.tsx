"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
  X,
  type LucideIcon,
} from "lucide-react";
import EmptyState from "@/components/dashboard/EmptyState";

export const CARD =
  "rounded-2xl bg-white shadow-[0_6px_24px_rgba(15,42,74,0.06)] ring-1 ring-black/5";

export const BTN =
  "inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a] disabled:cursor-not-allowed disabled:opacity-60";
export const BTN_PRIMARY = `${BTN} bg-[#ff7a1a] text-white hover:bg-[#e8590c]`;
export const BTN_GHOST = `${BTN} border border-black/10 text-[#0f2a4a] hover:border-[#ff7a1a] hover:text-[#e8590c]`;
export const BTN_DANGER = `${BTN} bg-red-600 text-white hover:bg-red-700`;

export const fieldClass =
  "h-10 w-full rounded-xl border border-[#e2e8f0] bg-white px-3 text-sm text-[#0f2a4a] outline-none focus:border-[#ff7a1a] focus:ring-2 focus:ring-[#ff7a1a]/25";

export const prettyEnum = (s: string) =>
  s.charAt(0) + s.slice(1).toLowerCase().replace(/_/g, " ");

export const fmtDate = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "-";

export const fmtDateTime = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";

export type Tone = "gray" | "green" | "red" | "amber" | "blue" | "purple";
const TONES: Record<Tone, string> = {
  gray: "bg-slate-100 text-slate-600",
  green: "bg-green-100 text-green-700",
  red: "bg-red-100 text-red-700",
  amber: "bg-amber-100 text-amber-700",
  blue: "bg-blue-100 text-blue-700",
  purple: "bg-violet-100 text-violet-700",
};

export function Badge({
  tone = "gray",
  children,
}: {
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${TONES[tone]}`}
    >
      {children}
    </span>
  );
}

export const PARCEL_TONE: Record<string, Tone> = {
  PENDING: "amber",
  APPROVED: "blue",
  ASSIGNED: "purple",
  PICKED_UP: "purple",
  IN_TRANSIT: "purple",
  DELIVERED: "green",
  CANCELLED: "gray",
  FAILED: "red",
};
export const PAYMENT_TONE: Record<string, Tone> = {
  PENDING: "amber",
  PAID: "green",
  FAILED: "red",
};

export type Column<T> = {
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
};

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  isLoading,
  error,
  icon,
  emptyTitle,
  emptyText,
}: {
  columns: Column<T>[];
  rows?: T[];
  isLoading: boolean;
  error?: Error | null;
  icon: LucideIcon;
  emptyTitle: string;
  emptyText: string;
}) {
  if (error) {
    return (
      <div
        role="alert"
        className="m-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
      >
        {error.message || "Something went wrong."}
      </div>
    );
  }
  if (!isLoading && rows?.length === 0) {
    return <EmptyState icon={icon} title={emptyTitle} text={emptyText} />;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-[#e2e8f0] text-[11px] uppercase tracking-wider text-[#94a3b8]">
            {columns.map((c) => (
              <th
                key={c.header}
                scope="col"
                className={`px-4 py-3 font-semibold ${c.className ?? ""}`}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f1f5f9]">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {columns.map((c) => (
                    <td key={c.header} className="px-4 py-4">
                      <div className="h-4 w-full max-w-[140px] animate-pulse rounded bg-slate-100" />
                    </td>
                  ))}
                </tr>
              ))
            : rows?.map((row) => (
                <tr key={row.id} className="align-top hover:bg-[#f8fafc]">
                  {columns.map((c) => (
                    <td
                      key={c.header}
                      className={`px-4 py-3.5 text-[#334155] ${c.className ?? ""}`}
                    >
                      {c.cell(row)}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

export function Pagination({
  meta,
  onPage,
}: {
  meta?: { page: number; totalPages: number; total: number };
  onPage: (p: number) => void;
}) {
  if (!meta || meta.totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between border-t border-[#e2e8f0] px-4 py-3 text-xs text-[#64748b]">
      <span>
        Page {meta.page} of {meta.totalPages} &middot; {meta.total} total
      </span>
      <div className="flex gap-2">
        <button
          type="button"
          className={BTN_GHOST}
          disabled={meta.page <= 1}
          onClick={() => onPage(meta.page - 1)}
        >
          <ChevronLeft aria-hidden="true" className="size-3.5" /> Prev
        </button>
        <button
          type="button"
          className={BTN_GHOST}
          disabled={meta.page >= meta.totalPages}
          onClick={() => onPage(meta.page + 1)}
        >
          Next <ChevronRight aria-hidden="true" className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

export function Toolbar({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-[#e2e8f0] p-4">
      {children}
    </div>
  );
}

export function SearchBox({
  onSearch,
  placeholder,
}: {
  onSearch: (v: string) => void;
  placeholder: string;
}) {
  const [v, setV] = useState("");
  const cb = useRef(onSearch);
  cb.current = onSearch;
  useEffect(() => {
    const t = setTimeout(() => cb.current(v.trim()), 400);
    return () => clearTimeout(t);
  }, [v]);
  return (
    <div className="relative min-w-[220px] flex-1">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#94a3b8]"
      />
      <input
        type="search"
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={`${fieldClass} pl-9`}
      />
    </div>
  );
}

export function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${fieldClass} w-auto min-w-[140px]`}
    >
      <option value="">{label}: All</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function Modal({
  title,
  onClose,
  busy,
  children,
}: {
  title: string;
  onClose: () => void;
  busy?: boolean;
  children: ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !busy) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [busy, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !busy) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="max-h-[90vh] w-full overflow-y-auto rounded-t-2xl bg-white p-6 shadow-xl sm:max-w-md sm:rounded-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-bold text-[#0f2a4a]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            aria-label="Close"
            className="rounded-lg p-1.5 text-[#64748b] hover:bg-black/5 disabled:opacity-50"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

export function ConfirmDialog({
  title,
  text,
  confirmLabel,
  danger,
  busy,
  error,
  onConfirm,
  onClose,
}: {
  title: string;
  text: string;
  confirmLabel: string;
  danger?: boolean;
  busy: boolean;
  error?: Error | null;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <Modal title={title} onClose={onClose} busy={busy}>
      <p className="text-sm text-[#64748b]">{text}</p>
      {error && (
        <p
          role="alert"
          className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600"
        >
          {error.message}
        </p>
      )}
      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          className={BTN_GHOST}
          onClick={onClose}
          disabled={busy}
        >
          Cancel
        </button>
        <button
          type="button"
          className={danger ? BTN_DANGER : BTN_PRIMARY}
          onClick={onConfirm}
          disabled={busy}
        >
          {busy && (
            <Loader2 aria-hidden="true" className="size-3.5 animate-spin" />
          )}
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
