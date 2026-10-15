"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  LocateFixed,
  MapPin,
  Send,
} from "lucide-react";
import { EASE } from "@/components/shared/motion";
import { MAX_WEIGHT_KG, PARCEL_TYPES, formatFee } from "@/lib/parcel";
import type { ParcelType } from "@/types";
import PageHeader from "../PageHeader";
import { useCreateParcel } from "@/hooks/useParcel";
import { useGetMe } from "@/hooks";

type Values = {
  pickup: string;
  delivery: string;
  receiverName: string;
  receiverPhone: string;
  description: string;
};
type Errors = Partial<Record<keyof Values | "weight", string>>;
type Coords = { lat: number; lng: number };
type Kind = "pickup" | "delivery";

const FEE_BASE = 60;
const FEE_PER_KG = 15;
const estimateFee = (kg: number) => FEE_BASE + FEE_PER_KG * kg;

const EMPTY: Values = {
  pickup: "",
  delivery: "",
  receiverName: "",
  receiverPhone: "",
  description: "",
};
const NO_COORDS: Record<Kind, Coords | null> = { pickup: null, delivery: null };
const NO_FLAGS: Record<Kind, boolean> = { pickup: false, delivery: false };
const NO_MSGS: Record<Kind, string | undefined> = {
  pickup: undefined,
  delivery: undefined,
};
const TYPE_KEYS = Object.keys(PARCEL_TYPES) as ParcelType[];

const inputClass = (error?: string) =>
  `w-full rounded-xl border bg-white px-4 text-sm text-[#0f2a4a] outline-none transition-colors placeholder:text-[#94a3b8] focus:ring-2 ${
    error
      ? "border-red-400 focus:border-red-400 focus:ring-red-200"
      : "border-[#e2e8f0] focus:border-[#ff7a1a] focus:ring-[#ff7a1a]/25"
  }`;

async function geocode(address: string): Promise<Coords | null> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=bd&q=${encodeURIComponent(address)}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error("Geocoding failed");
  const data = (await res.json()) as { lat: string; lon: string }[];
  if (!data[0]) return null;
  const lat = Number(data[0].lat);
  const lng = Number(data[0].lon);
  return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
}

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

function LocationRow({
  coords,
  busy,
  message,
  onPin,
  onUseMine,
}: {
  coords: Coords | null;
  busy: boolean;
  message?: string;
  onPin: () => void;
  onUseMine?: () => void;
}) {
  const btn =
    "inline-flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-[#0f2a4a] transition-colors hover:border-[#ff7a1a] hover:text-[#e8590c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a] disabled:cursor-not-allowed disabled:opacity-60";
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={onPin} disabled={busy} className={btn}>
          {busy ? (
            <Loader2 aria-hidden="true" className="size-3.5 animate-spin" />
          ) : (
            <MapPin aria-hidden="true" className="size-3.5" />
          )}
          Pin this address
        </button>
        {onUseMine && (
          <button
            type="button"
            onClick={onUseMine}
            disabled={busy}
            className={btn}
          >
            <LocateFixed aria-hidden="true" className="size-3.5" />
            Use my location
          </button>
        )}
        {coords && (
          <span
            role="status"
            className="inline-flex items-center gap-1 text-xs text-green-700"
          >
            <CheckCircle2 aria-hidden="true" className="size-3.5" />
            Pinned: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
          </span>
        )}
      </div>
      {message && !coords && (
        <p role="status" className="mt-1.5 text-xs text-[#64748b]">
          {message}
        </p>
      )}
    </div>
  );
}

function BookParcelFormInner() {
  const {
    mutate: create,
    isPending,
    isError,
    data: created,
    reset: resetMutation,
    isSuccess,
  } = useCreateParcel();
  const { data: me } = useGetMe();

  const myName: string = me?.data?.name ?? "";
  const myPhone: string =
    (me?.data as unknown as { phone?: string | null } | undefined)?.phone ?? "";

  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type")?.toUpperCase();
  const initialType: ParcelType = TYPE_KEYS.includes(typeParam as ParcelType)
    ? (typeParam as ParcelType)
    : "PACKAGE";

  const [parcelType, setParcelType] = useState<ParcelType>(initialType);
  const [weight, setWeight] = useState("1");
  const [values, setValues] = useState<Values>(EMPTY);
  const [useMine, setUseMine] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [coords, setCoords] = useState(NO_COORDS);
  const [locating, setLocating] = useState(NO_FLAGS);
  const [locMsg, setLocMsg] = useState(NO_MSGS);
  const [resolving, setResolving] = useState(false);

  const weightNum = Number(weight);
  const busy = isPending || resolving;
  const weightValid =
    !!weight &&
    !Number.isNaN(weightNum) &&
    weightNum > 0 &&
    weightNum <= MAX_WEIGHT_KG;

  const errors: Errors = {};
  if (values.pickup.trim().length < 5)
    errors.pickup = "Enter the full pickup address.";
  if (values.delivery.trim().length < 5)
    errors.delivery = "Enter the full delivery address.";
  if (values.receiverName.trim().length < 2)
    errors.receiverName = "Enter the receiver's name.";
  if (!/^\+?[0-9\s-]{7,15}$/.test(values.receiverPhone.trim()))
    errors.receiverPhone = "Enter a valid phone number.";
  if (!weight || Number.isNaN(weightNum) || weightNum <= 0)
    errors.weight = "Enter the parcel weight.";
  else if (weightNum > MAX_WEIGHT_KG)
    errors.weight = `Maximum weight is ${MAX_WEIGHT_KG} kg.`;
  if (values.description.trim() && values.description.trim().length < 3)
    errors.description = "Description must be at least 3 characters.";

  const show = (k: keyof Errors) => (submitted ? errors[k] : undefined);
  const aria = (k: keyof Errors) => ({
    "aria-invalid": !!show(k),
    "aria-describedby": show(k) ? `${k}-error` : undefined,
  });

  const set =
    (k: keyof Values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((p) => ({ ...p, [k]: e.target.value }));
      if (k === "receiverName" || k === "receiverPhone") setUseMine(false);
      if (k === "pickup" || k === "delivery") {
        setCoords((p) => ({ ...p, [k]: null }));
        setLocMsg((p) => ({ ...p, [k]: undefined }));
      }
    };

  const toggleUseMine = (checked: boolean) => {
    setUseMine(checked);
    setValues((p) => ({
      ...p,
      receiverName: checked ? myName : "",
      receiverPhone: checked ? myPhone : "",
    }));
  };

  const setBusy = (k: Kind, v: boolean) =>
    setLocating((p) => ({ ...p, [k]: v }));
  const setMsg = (k: Kind, v?: string) => setLocMsg((p) => ({ ...p, [k]: v }));

  const pin = async (kind: Kind) => {
    const address = values[kind].trim();
    if (address.length < 5) {
      setMsg(kind, "Enter the full address first.");
      return;
    }
    setBusy(kind, true);
    setMsg(kind, undefined);
    try {
      const c = await geocode(address);
      if (c) setCoords((p) => ({ ...p, [kind]: c }));
      else
        setMsg(
          kind,
          "Could not find this address on the map. You can still book without a pin.",
        );
    } catch {
      setMsg(kind, "Location lookup failed. You can still book without a pin.");
    } finally {
      setBusy(kind, false);
    }
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setMsg("pickup", "Your browser does not support location access.");
      return;
    }
    setBusy("pickup", true);
    setMsg("pickup", undefined);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords((p) => ({
          ...p,
          pickup: { lat: pos.coords.latitude, lng: pos.coords.longitude },
        }));
        setBusy("pickup", false);
      },
      () => {
        setMsg("pickup", "Location permission denied or unavailable.");
        setBusy("pickup", false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const first = (Object.keys(errors) as (keyof Errors)[])[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }

    let { pickup, delivery } = coords;
    if (!pickup || !delivery) {
      setResolving(true);
      const [p, d] = await Promise.all([
        pickup ? pickup : geocode(values.pickup.trim()).catch(() => null),
        delivery ? delivery : geocode(values.delivery.trim()).catch(() => null),
      ]);
      pickup = p;
      delivery = d;
      setCoords({ pickup, delivery });
      setResolving(false);
    }

    create({
      parcelType,
      weightKg: weightNum,
      pickupAddress: values.pickup.trim(),
      pickupLat: pickup?.lat,
      pickupLng: pickup?.lng,
      deliveryAddress: values.delivery.trim(),
      deliveryLat: delivery?.lat,
      deliveryLng: delivery?.lng,
      receiverName: values.receiverName.trim(),
      receiverPhone: values.receiverPhone.trim(),
      description: values.description.trim() || undefined,
    });
  };

  const bookAnother = () => {
    resetMutation();
    setValues(EMPTY);
    setParcelType(initialType);
    setWeight("1");
    setUseMine(false);
    setSubmitted(false);
    setCoords(NO_COORDS);
    setLocating(NO_FLAGS);
    setLocMsg(NO_MSGS);
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
            Delivery fee{" "}
            <span className="font-semibold text-[#0f2a4a]">
              {formatFee(created.fee)}
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
          {/* Parcel type */}
          <section className="rounded-2xl bg-white p-5 shadow-[0_6px_24px_rgba(15,42,74,0.06)] ring-1 ring-black/5 sm:p-6">
            <h2 className="text-base font-semibold text-[#0f2a4a]">
              1. What are you sending?
            </h2>
            <div
              role="radiogroup"
              aria-label="Parcel type"
              className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-5"
            >
              {TYPE_KEYS.map((key) => {
                const { label, icon: Icon } = PARCEL_TYPES[key];
                const active = parcelType === key;
                return (
                  <motion.button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setParcelType(key)}
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
                <LocationRow
                  coords={coords.pickup}
                  busy={locating.pickup}
                  message={locMsg.pickup}
                  onPin={() => pin("pickup")}
                  onUseMine={useMyLocation}
                />
              </Field>
              <Field
                id="delivery"
                label="Delivery address"
                error={show("delivery")}
              >
                <input
                  id="delivery"
                  placeholder="House, road, area, city"
                  value={values.delivery}
                  onChange={set("delivery")}
                  className={`${inputClass(show("delivery"))} h-11`}
                  {...aria("delivery")}
                />
                <LocationRow
                  coords={coords.delivery}
                  busy={locating.delivery}
                  message={locMsg.delivery}
                  onPin={() => pin("delivery")}
                />
              </Field>

              {/* Receiver is me */}
              <label
                htmlFor="useMine"
                className="flex cursor-pointer items-center gap-2.5 text-sm text-[#334155]"
              >
                <input
                  id="useMine"
                  type="checkbox"
                  checked={useMine}
                  onChange={(e) => toggleUseMine(e.target.checked)}
                  className="size-4 shrink-0 rounded border-[#cbd5e1] accent-[#ff7a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a]"
                />
                I am the receiver (use my name and phone)
              </label>

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

          {/* Parcel details */}
          <section className="rounded-2xl bg-white p-5 shadow-[0_6px_24px_rgba(15,42,74,0.06)] ring-1 ring-black/5 sm:p-6">
            <h2 className="text-base font-semibold text-[#0f2a4a]">
              3. Parcel details
            </h2>
            <div className="mt-4">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="weight"
                  label={`Weight (kg, max ${MAX_WEIGHT_KG})`}
                  error={show("weight")}
                >
                  <input
                    id="weight"
                    type="number"
                    min={0.1}
                    max={MAX_WEIGHT_KG}
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
                  label="Description"
                  optional
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
            </div>
          </section>
        </div>

        {/* Summary */}
        <aside>
          <div className="sticky top-24 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f2a4a] to-[#143a63] p-6 text-white shadow-lg shadow-[#0f2a4a]/20">
            <p className="text-xs font-medium uppercase tracking-widest text-white/60">
              Estimated delivery fee
            </p>
            <p
              className="mt-2 text-3xl font-extrabold tracking-tight"
              aria-live="polite"
            >
              {weightValid ? `~${formatFee(estimateFee(weightNum))}` : "-"}
            </p>
            <p className="mt-1 text-[11px] text-white/50">
              Based on weight. The final fee is confirmed after booking.
            </p>

            <dl className="mt-5 space-y-2 border-t border-white/15 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-white/65">Type</dt>
                <dd className="font-medium">
                  {PARCEL_TYPES[parcelType].label}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-white/65">Weight</dt>
                <dd className="font-medium">
                  {weightNum > 0 ? `${weightNum} kg` : "-"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-white/65">Map pins</dt>
                <dd className="font-medium">
                  {(coords.pickup ? 1 : 0) + (coords.delivery ? 1 : 0)} of 2
                </dd>
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
              disabled={busy}
              whileHover={busy ? undefined : { scale: 1.02 }}
              whileTap={busy ? undefined : { scale: 0.98 }}
              className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#ff7a1a] text-sm font-semibold text-white shadow-lg shadow-[#ff7a1a]/30 transition-colors hover:bg-[#e8590c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f2a4a] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {busy ? (
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
          </div>
        </aside>
      </form>
    </>
  );
}

export default function BookParcelForm() {
  return (
    <Suspense fallback={null}>
      <BookParcelFormInner />
    </Suspense>
  );
}
