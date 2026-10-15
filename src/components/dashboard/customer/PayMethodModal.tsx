"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { CreditCard, Loader2, Lock, Smartphone, X } from "lucide-react";
import type { PaymentMethod } from "@/api";
import { formatFee } from "@/lib/parcel";
import type { Parcel } from "@/types";

const METHODS: {
  key: PaymentMethod;
  label: string;
  hint: string;
  icon: typeof CreditCard;
  color: string;
}[] = [
  {
    key: "bkash",
    label: "bKash",
    hint: "Mobile wallet, pay in BDT",
    icon: Smartphone,
    color: "#e2136e",
  },
  {
    key: "stripe",
    label: "Card (Stripe)",
    hint: "Visa, Mastercard and other cards",
    icon: CreditCard,
    color: "#635bff",
  },
];

export default function PayMethodModal({
  parcel,
  pendingMethod,
  isError,
  onSelect,
  onClose,
}: {
  parcel: Parcel;
  pendingMethod: PaymentMethod | null;
  isError: boolean;
  onSelect: (m: PaymentMethod) => void;
  onClose: () => void;
}) {
  const busy = pendingMethod !== null;
  const dialogRef = useRef<HTMLDivElement>(null);

  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current
      ?.querySelector<HTMLElement>("button[data-method]:not([disabled])")
      ?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    if (busy) dialogRef.current?.focus();
  }, [busy]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !busy) {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const items = dialogRef.current?.querySelectorAll<HTMLElement>(
        "button:not([disabled])",
      );
      if (!items?.length) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [busy]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 sm:items-center sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !busy) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pay-title"
        aria-describedby="pay-summary"
        aria-busy={busy}
        tabIndex={-1}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-h-[90vh] w-full overflow-y-auto rounded-t-2xl bg-white p-6 shadow-xl outline-none sm:max-w-md sm:rounded-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="pay-title" className="text-lg font-bold text-[#0f2a4a]">
              Choose payment method
            </h2>
            <p id="pay-summary" className="mt-1 text-sm text-[#64748b]">
              {parcel.trackingId}
            </p>
          </div>
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

        <div className="mt-4 flex items-baseline justify-between rounded-xl bg-[#f8fafc] px-4 py-3">
          <span className="text-sm text-[#64748b]">Amount to pay</span>
          <span className="text-xl font-extrabold text-[#0f2a4a]">
            {formatFee(parcel.fee)}
          </span>
        </div>

        {isError && (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            Could not start the payment. Please try again or choose another
            method.
          </p>
        )}

        <div className="mt-4 grid gap-3">
          {METHODS.map(({ key, label, hint, icon: Icon, color }) => {
            const loading = pendingMethod === key;
            return (
              <button
                key={key}
                type="button"
                data-method
                onClick={() => onSelect(key)}
                disabled={busy}
                aria-busy={loading}
                className="flex items-center gap-4 rounded-xl border border-[#e2e8f0] p-4 text-left transition-colors hover:border-[#ff7a1a] hover:bg-[#ff7a1a]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span
                  className="flex size-11 shrink-0 items-center justify-center rounded-xl text-white"
                  style={{ backgroundColor: color }}
                >
                  {loading ? (
                    <Loader2
                      aria-hidden="true"
                      className="size-5 animate-spin"
                    />
                  ) : (
                    <Icon aria-hidden="true" className="size-5" />
                  )}
                </span>
                <span>
                  <span className="block font-semibold text-[#0f2a4a]">
                    {loading ? `Opening ${label}...` : label}
                  </span>
                  <span className="block text-xs text-[#94a3b8]">{hint}</span>
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#94a3b8]">
          <Lock aria-hidden="true" className="size-3" />
          You will be redirected to complete the payment securely.
        </p>
      </motion.div>
    </div>,
    document.body,
  );
}
