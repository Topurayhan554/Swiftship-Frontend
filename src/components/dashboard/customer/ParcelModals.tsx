"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { Loader2, X } from "lucide-react";
import { SERVICE_RATES } from "@/constants/pricing";
import { useCancelParcel, useUpdateParcel } from "@/lib/dashboard-queries";
import type { Parcel, UpdateParcelPayload } from "@/types";
import StatusBadge from "../StatusBadge";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const inputClass = (error?: string) =>
  `h-11 w-full rounded-xl border bg-white px-4 text-sm text-[#0f2a4a] outline-none transition-colors placeholder:text-[#94a3b8] focus:ring-2 ${
    error
      ? "border-red-400 focus:border-red-400 focus:ring-red-200"
      : "border-[#e2e8f0] focus:border-[#ff7a1a] focus:ring-[#ff7a1a]/25"
  }`;

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f2a4a]/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#0f2a4a]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-[#64748b] hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a]"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex justify-between gap-4 py-2.5 text-sm">
      <dt className="shrink-0 text-[#64748b]">{label}</dt>
      <dd className="text-right font-medium text-[#0f2a4a]">{children}</dd>
    </div>
  );
}

export function ViewParcelModal({
  parcel: p,
  onClose,
}: {
  parcel: Parcel;
  onClose: () => void;
}) {
  return (
    <Modal title="Parcel details" onClose={onClose}>
      <dl className="divide-y divide-black/5">
        <Row label="Tracking ID">{p.trackingId}</Row>
        <Row label="Status">
          <StatusBadge status={p.status} />
        </Row>
        <Row label="Payment">
          <span
            className={
              p.paymentStatus === "PAID" ? "text-green-600" : "text-[#e8590c]"
            }
          >
            {p.paymentStatus === "PAID" ? "Paid" : "Unpaid"}
          </span>
        </Row>
        <Row label="Service">{SERVICE_RATES[p.service].label}</Row>
        <Row label="Weight">{p.weight} kg</Row>
        <Row label="Price">${p.price.toFixed(2)}</Row>
        <Row label="Pickup">{p.from}</Row>
        <Row label="Delivery">{p.to}</Row>
        <Row label="Receiver">{p.receiverName}</Row>
        <Row label="Receiver phone">{p.receiverPhone}</Row>
        <Row label="Description">{p.description || "-"}</Row>
        <Row label="Booked on">{fmtDate(p.createdAt)}</Row>
      </dl>
      <Link
        href={`/track/${p.trackingId}`}
        className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-[#ff7a1a] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e8590c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a] focus-visible:ring-offset-2"
      >
        Track this parcel
      </Link>
    </Modal>
  );
}

type EditValues = {
  pickupAddress: string;
  deliveryAddress: string;
  receiverName: string;
  receiverPhone: string;
  description: string;
};

export function EditParcelModal({
  parcel: p,
  onClose,
}: {
  parcel: Parcel;
  onClose: () => void;
}) {
  const { mutate, isPending, isError, error } = useUpdateParcel();
  const [v, setV] = useState<EditValues>({
    pickupAddress: p.from,
    deliveryAddress: p.to,
    receiverName: p.receiverName,
    receiverPhone: p.receiverPhone,
    description: p.description,
  });
  const [submitted, setSubmitted] = useState(false);

  const errors: Partial<Record<keyof EditValues, string>> = {};
  if (v.pickupAddress.trim().length < 5)
    errors.pickupAddress = "Enter the full pickup address.";
  if (v.deliveryAddress.trim().length < 5)
    errors.deliveryAddress = "Enter the full delivery address.";
  if (v.receiverName.trim().length < 2)
    errors.receiverName = "Enter the receiver's name.";
  if (v.receiverPhone.trim().length < 6)
    errors.receiverPhone = "Enter a valid phone number.";
  if (v.description.trim().length > 500)
    errors.description = "Keep it under 500 characters.";

  const set =
    (k: keyof EditValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setV((prev) => ({ ...prev, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length > 0) return;

    const data: UpdateParcelPayload = {
      pickupAddress: v.pickupAddress.trim(),
      deliveryAddress: v.deliveryAddress.trim(),
      receiverName: v.receiverName.trim(),
      receiverPhone: v.receiverPhone.trim(),
      description: v.description.trim() || undefined,
    };
    mutate({ id: p.id, data }, { onSuccess: onClose });
  };

  const fields: { key: keyof EditValues; label: string }[] = [
    { key: "pickupAddress", label: "Pickup address" },
    { key: "deliveryAddress", label: "Delivery address" },
    { key: "receiverName", label: "Receiver name" },
    { key: "receiverPhone", label: "Receiver phone" },
  ];

  return (
    <Modal title={`Edit ${p.trackingId}`} onClose={onClose}>
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        {fields.map(({ key, label }) => {
          const err = submitted ? errors[key] : undefined;
          return (
            <div key={key}>
              <label
                htmlFor={`edit-${key}`}
                className="mb-1.5 block text-[13px] font-medium text-[#334155]"
              >
                {label}
              </label>
              <input
                id={`edit-${key}`}
                value={v[key]}
                onChange={set(key)}
                aria-invalid={!!err}
                className={inputClass(err)}
              />
              {err && (
                <p role="alert" className="mt-1.5 text-xs text-red-600">
                  {err}
                </p>
              )}
            </div>
          );
        })}

        <div>
          <label
            htmlFor="edit-description"
            className="mb-1.5 block text-[13px] font-medium text-[#334155]"
          >
            Description{" "}
            <span className="font-normal text-[#94a3b8]">(optional)</span>
          </label>
          <textarea
            id="edit-description"
            rows={3}
            value={v.description}
            onChange={set("description")}
            className={`${inputClass(submitted ? errors.description : undefined)} h-auto resize-none py-3`}
          />
          {submitted && errors.description && (
            <p role="alert" className="mt-1.5 text-xs text-red-600">
              {errors.description}
            </p>
          )}
        </div>

        {isError && (
          <p
            role="alert"
            className="rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600"
          >
            {error?.message || "Could not update the parcel. Please try again."}
          </p>
        )}

        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-black/10 py-3 text-sm font-semibold text-[#0f2a4a] hover:border-[#ff7a1a]"
          >
            Close
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#ff7a1a] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e8590c] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? (
              <>
                <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save changes"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export function CancelParcelModal({
  parcel: p,
  onClose,
}: {
  parcel: Parcel;
  onClose: () => void;
}) {
  const { mutate, isPending, isError, error } = useCancelParcel();

  return (
    <Modal title="Cancel this parcel?" onClose={onClose}>
      <p className="text-sm text-[#64748b]">
        Parcel{" "}
        <span className="font-semibold text-[#0f2a4a]">{p.trackingId}</span> to{" "}
        {p.receiverName} will be cancelled. This cannot be undone.
      </p>

      {isError && (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600"
        >
          {error?.message || "Could not cancel the parcel. Please try again."}
        </p>
      )}

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-xl border border-black/10 py-3 text-sm font-semibold text-[#0f2a4a] hover:border-[#ff7a1a]"
        >
          Keep parcel
        </button>
        <button
          type="button"
          disabled={isPending}
          onClick={() => mutate(p.id, { onSuccess: onClose })}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Cancelling...
            </>
          ) : (
            "Yes, cancel"
          )}
        </button>
      </div>
    </Modal>
  );
}
