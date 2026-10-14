"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Clock, Loader2, Send } from "lucide-react";
import { EASE } from "@/components/shared/motion";
import {
  INTL_RATES,
  SERVICE_RATES,
  type ServiceKey,
} from "@/constants/pricing";
import { estimatePrice } from "@/lib/dashboard";
import PageHeader from "../PageHeader";
import { useCreateParcel } from "@/hooks/useParcel";

type Values = {
  pickup: string;
  delivery: string;
  receiverName: string;
  receiverPhone: string;
  description: string;
  notes: string;
};
type Errors = Partial<Record<keyof Values | "weight", string>>;

const EMPTY: Values = {
  pickup: "",
  delivery: "",
  receiverName: "",
  receiverPhone: "",
  description: "",
  notes: "",
};
const SERVICE_KEYS = Object.keys(SERVICE_RATES) as ServiceKey[];

const inputClass = (error?: string) =>
  `w-full rounded-xl border bg-white px-4 text-sm text-[#0f2a4a] outline-none transition-colors placeholder:text-[#94a3b8] focus:ring-2 ${
    error
      ? "border-red-400 focus:border-red-400 focus:ring-red-200"
      : "border-[#e2e8f0] focus:border-[#ff7a1a] focus:ring-[#ff7a1a]/25"
  }`;

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[13px] font-medium text-[#334155]"
      >
        {label}{" "}
        {optional && (
          <span className="font-normal text-[#94a3b8]">(optional)</span>
        )}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1.5 text-xs text-red-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function BookParcelForm() {
  const {
    mutate: create,
    isPending,
    isError,
    data: created,
    reset: resetMutation,
    isSuccess,
  } = useCreateParcel();

  const [service, setService] = useState<ServiceKey>("parcel");
  const [country, setCountry] = useState(INTL_RATES[0].country);
  const [weight, setWeight] = useState("1");
  const [values, setValues] = useState<Values>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const rate = SERVICE_RATES[service];
  const intl = INTL_RATES.find((r) => r.country === country) ?? INTL_RATES[0];
  const weightNum = Number(weight);
  const isIntl = service === "international";

  const errors: Errors = {};
  if (values.pickup.trim().length < 5)
    errors.pickup = "Enter the full pickup address.";
  if (!isIntl && values.delivery.trim().length < 5)
    errors.delivery = "Enter the full delivery address.";
  if (isIntl && values.delivery.trim().length < 5)
    errors.delivery = "Enter the full delivery address.";
  if (values.receiverName.trim().length < 2)
    errors.receiverName = "Enter the receiver's name.";
  if (!/^\+?[0-9\s-]{7,15}$/.test(values.receiverPhone.trim()))
    errors.receiverPhone = "Enter a valid phone number.";
  if (!weight || Number.isNaN(weightNum) || weightNum <= 0)
    errors.weight = "Enter the parcel weight.";
  else if (weightNum > rate.maxKg)
    errors.weight = `${rate.label} accepts up to ${rate.maxKg} kg.`;
  if (values.description.trim().length < 3)
    errors.description = "Briefly describe what you are sending.";

  const show = (k: keyof Errors) => (submitted ? errors[k] : undefined);
  const aria = (k: keyof Errors) => ({
    "aria-invalid": !!show(k),
    "aria-describedby": show(k) ? `${k}-error` : undefined,
  });
  const set =
    (k: keyof Values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((p) => ({ ...p, [k]: e.target.value }));

  const price =
    weightNum > 0 && weightNum <= rate.maxKg
      ? estimatePrice(service, weightNum, country)
      : 0;
  const time = isIntl ? intl.days : rate.time;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const first = (Object.keys(errors) as (keyof Errors)[])[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    create({
      service,
      country: isIntl ? country : undefined,
      weight: weightNum,
      notes: values.notes.trim() || undefined,
      pickup: values.pickup.trim(),
      delivery: values.delivery.trim(),
      receiverName: values.receiverName.trim(),
      receiverPhone: values.receiverPhone.trim(),
      description: values.description.trim(),
    });
  };

  const bookAnother = () => {
    resetMutation();
    setValues(EMPTY);
    setWeight("1");
    setSubmitted(false);
  };

  if (isSuccess && created) {
    return (
      <>
        <PageHeader title="Book a parcel" />
        <motion.div
          role="status"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mx-auto max-w-lg rounded-3xl bg-white p-8 text-center shadow-[0_16px_40px_rgba(15,42,74,0.1)] ring-1 ring-black/5"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 14,
              delay: 0.15,
            }}
            className="mx-auto flex size-20 items-center justify-center rounded-full bg-green-100 text-green-600"
          >
            <CheckCircle2 aria-hidden="true" className="size-10" />
          </motion.span>
          <h2 className="mt-6 text-2xl font-bold text-[#0f2a4a]">
            Parcel booked!
          </h2>
          <p className="mt-2 text-sm text-[#64748b]">Your tracking ID is</p>
          <p className="mt-1 text-2xl font-extrabold tracking-tight text-[#e8590c]">
            {created.trackingId}
          </p>
          <p className="mt-3 text-sm text-[#64748b]">
            Estimated cost{" "}
            <span className="font-semibold text-[#0f2a4a]">
              ${created.price.toFixed(2)}
            </span>
            . Payment is still pending.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href={`/track/${created.trackingId}`}
              className="rounded-full bg-[#ff7a1a] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#e8590c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a] focus-visible:ring-offset-2"
            >
              Track parcel
            </Link>
            <Link
              href="/dashboard/customer/parcels"
              className="rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold text-[#0f2a4a] hover:border-[#ff7a1a] hover:text-[#e8590c]"
            >
              My parcels
            </Link>
            <button
              type="button"
              onClick={bookAnother}
              className="rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold text-[#0f2a4a] hover:border-[#ff7a1a] hover:text-[#e8590c]"
            >
              Book another
            </button>
          </div>
        </motion.div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Book a parcel"
        description="Tell us what to send and where. You will get a tracking ID instantly."
      />

      <form
        onSubmit={onSubmit}
        noValidate
        className="grid gap-6 lg:grid-cols-[1.6fr_1fr]"
      >
        <div className="space-y-6">
          {/* Service */}
          <section className="rounded-2xl bg-white p-5 shadow-[0_6px_24px_rgba(15,42,74,0.06)] ring-1 ring-black/5 sm:p-6">
            <h2 className="text-base font-semibold text-[#0f2a4a]">
              1. Choose a service
            </h2>
            <div
              role="radiogroup"
              aria-label="Service"
              className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4"
            >
              {SERVICE_KEYS.map((key) => {
                const { label, icon: Icon } = SERVICE_RATES[key];
                const active = service === key;
                return (
                  <motion.button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setService(key)}
                    whileTap={{ scale: 0.95 }}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a] ${active ? "border-[#ff7a1a] bg-[#ff7a1a]/10 text-[#0f2a4a] shadow-sm shadow-[#ff7a1a]/20" : "border-[#e2e8f0] text-[#64748b] hover:border-[#cbd5e1] hover:text-[#0f2a4a]"}`}
                  >
                    <Icon
                      aria-hidden="true"
                      className={`size-5 ${active ? "text-[#ff7a1a]" : ""}`}
                    />
                    {label}
                  </motion.button>
                );
              })}
            </div>
            <AnimatePresence initial={false}>
              {isIntl && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="pt-5">
                    <Field id="country" label="Destination country">
                      <select
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className={`${inputClass()} h-11`}
                      >
                        {INTL_RATES.map((r) => (
                          <option key={r.country} value={r.country}>
                            {r.country}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Addresses */}
          <section className="rounded-2xl bg-white p-5 shadow-[0_6px_24px_rgba(15,42,74,0.06)] ring-1 ring-black/5 sm:p-6">
            <h2 className="text-base font-semibold text-[#0f2a4a]">
              2. Pickup and delivery
            </h2>
            <div className="mt-4 space-y-5">
              <Field id="pickup" label="Pickup address" error={show("pickup")}>
                <input
                  id="pickup"
                  autoComplete="street-address"
                  placeholder="House, road, area, city"
                  value={values.pickup}
                  onChange={set("pickup")}
                  className={`${inputClass(show("pickup"))} h-11`}
                  {...aria("pickup")}
                />
              </Field>
              <Field
                id="delivery"
                label="Delivery address"
                error={show("delivery")}
              >
                <input
                  id="delivery"
                  placeholder={
                    isIntl
                      ? `Full address in ${country}`
                      : "House, road, area, city"
                  }
                  value={values.delivery}
                  onChange={set("delivery")}
                  className={`${inputClass(show("delivery"))} h-11`}
                  {...aria("delivery")}
                />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="receiverName"
                  label="Receiver name"
                  error={show("receiverName")}
                >
                  <input
                    id="receiverName"
                    placeholder="Rahim Uddin"
                    value={values.receiverName}
                    onChange={set("receiverName")}
                    className={`${inputClass(show("receiverName"))} h-11`}
                    {...aria("receiverName")}
                  />
                </Field>
                <Field
                  id="receiverPhone"
                  label="Receiver phone"
                  error={show("receiverPhone")}
                >
                  <input
                    id="receiverPhone"
                    type="tel"
                    placeholder="+8801XXXXXXXXX"
                    value={values.receiverPhone}
                    onChange={set("receiverPhone")}
                    className={`${inputClass(show("receiverPhone"))} h-11`}
                    {...aria("receiverPhone")}
                  />
                </Field>
              </div>
            </div>
          </section>

          {/* Parcel */}
          <section className="rounded-2xl bg-white p-5 shadow-[0_6px_24px_rgba(15,42,74,0.06)] ring-1 ring-black/5 sm:p-6">
            <h2 className="text-base font-semibold text-[#0f2a4a]">
              3. Parcel details
            </h2>
            <div className="mt-4 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="weight"
                  label={`Weight (kg, max ${rate.maxKg})`}
                  error={show("weight")}
                >
                  <input
                    id="weight"
                    type="number"
                    min={0.1}
                    max={rate.maxKg}
                    step={0.1}
                    inputMode="decimal"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className={`${inputClass(show("weight"))} h-11`}
                    {...aria("weight")}
                  />
                </Field>
                <Field
                  id="description"
                  label="What are you sending?"
                  error={show("description")}
                >
                  <input
                    id="description"
                    placeholder="Documents, clothes, gift box..."
                    value={values.description}
                    onChange={set("description")}
                    className={`${inputClass(show("description"))} h-11`}
                    {...aria("description")}
                  />
                </Field>
              </div>
              <Field id="notes" label="Notes for the courier" optional>
                <textarea
                  id="notes"
                  rows={3}
                  placeholder="Fragile, call before arriving..."
                  value={values.notes}
                  onChange={set("notes")}
                  className={`${inputClass()} resize-none py-3`}
                />
              </Field>
            </div>
          </section>
        </div>

        {/* Summary */}
        <aside>
          <div className="sticky top-24 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f2a4a] to-[#143a63] p-6 text-white shadow-lg shadow-[#0f2a4a]/20">
            <p className="text-xs font-medium uppercase tracking-widest text-white/60">
              Estimated cost
            </p>
            <motion.p
              key={price}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              aria-live="polite"
              className="mt-2 text-4xl font-extrabold tracking-tight"
            >
              ${price.toFixed(2)}
            </motion.p>

            <dl className="mt-5 space-y-2 border-t border-white/15 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-white/65">Service</dt>
                <dd className="font-medium">{rate.label}</dd>
              </div>
              {isIntl && (
                <div className="flex justify-between">
                  <dt className="text-white/65">To</dt>
                  <dd className="font-medium">{country}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-white/65">Weight</dt>
                <dd className="font-medium">
                  {weightNum > 0 ? `${weightNum} kg` : "-"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="flex items-center gap-1.5 text-white/65">
                  <Clock aria-hidden="true" className="size-3.5" /> Delivery
                </dt>
                <dd className="font-medium">{time}</dd>
              </div>
            </dl>

            <AnimatePresence>
              {isError && (
                <motion.p
                  role="alert"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 flex items-center gap-2 rounded-xl bg-red-500/15 px-3 py-2 text-xs text-red-100"
                >
                  <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
                  Could not book your parcel. Please try again.
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={isPending}
              whileHover={isPending ? undefined : { scale: 1.02 }}
              whileTap={isPending ? undefined : { scale: 0.98 }}
              className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#ff7a1a] text-sm font-semibold text-white shadow-lg shadow-[#ff7a1a]/30 transition-colors hover:bg-[#e8590c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f2a4a] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPending ? (
                <>
                  <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                  Booking...
                </>
              ) : (
                <>
                  Confirm booking
                  <Send
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </motion.button>
            <p className="mt-3 text-center text-[11px] text-white/50">
              Final price is confirmed by SwiftShip after booking.
            </p>
          </div>
        </aside>
      </form>
    </>
  );
}
