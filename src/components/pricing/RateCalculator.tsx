"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { EASE, Reveal } from "@/components/shared/motion";
import {
  INTL_RATES,
  SERVICE_RATES,
  type ServiceKey,
} from "@/constants/pricing";

const SERVICE_KEYS = Object.keys(SERVICE_RATES) as ServiceKey[];

function AnimatedPrice({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      prev.current = value;
      return;
    }
    const controls = animate(prev.current, value, {
      duration: 0.5,
      ease: "easeOut",
      onUpdate: setDisplay,
    });
    prev.current = value;
    return () => controls.stop();
  }, [value, reduce]);

  return <>${display.toFixed(2)}</>;
}

export default function RateCalculator() {
  const searchParams = useSearchParams();
  const toParam = searchParams.get("to")?.toLowerCase();
  const initialCountry = INTL_RATES.find(
    (r) => r.country.toLowerCase() === toParam,
  );

  const [service, setService] = useState<ServiceKey>(
    initialCountry ? "international" : "parcel",
  );
  const [weight, setWeight] = useState(1);
  const [country, setCountry] = useState(
    initialCountry?.country ?? INTL_RATES[0].country,
  );

  const rate = SERVICE_RATES[service];
  const intl = INTL_RATES.find((r) => r.country === country) ?? INTL_RATES[0];

  const { base, weightCharge, total, time } = useMemo(() => {
    const baseFee = service === "international" ? intl.from : rate.base;
    const wCharge = Math.round(rate.perKg * weight * 100) / 100;
    return {
      base: baseFee,
      weightCharge: wCharge,
      total: Math.round((baseFee + wCharge) * 100) / 100,
      time: service === "international" ? intl.days : rate.time,
    };
  }, [service, weight, rate, intl]);

  const pickService = (key: ServiceKey) => {
    setService(key);
    setWeight((w) => Math.min(w, SERVICE_RATES[key].maxKg));
  };

  return (
    <section className="bg-[#f7f9fc] pb-14 pt-4">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal y={36}>
          <div className="grid overflow-hidden rounded-3xl bg-white shadow-[0_16px_40px_rgba(15,42,74,0.1)] ring-1 ring-black/5 lg:grid-cols-[1.3fr_1fr]">
            {/* Form */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#0f2a4a]">
                Estimate your shipping cost
              </h2>
              <p className="mt-1 text-sm text-[#64748b]">
                Estimates only. The final price is confirmed when you book.
              </p>

              <div
                role="radiogroup"
                aria-label="Service"
                className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4"
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
                      onClick={() => pickService(key)}
                      whileTap={{ scale: 0.95 }}
                      className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a] ${
                        active
                          ? "border-[#ff7a1a] bg-[#ff7a1a]/10 text-[#0f2a4a] shadow-sm shadow-[#ff7a1a]/20"
                          : "border-[#e2e8f0] text-[#64748b] hover:border-[#cbd5e1] hover:text-[#0f2a4a]"
                      }`}
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
                {service === "international" && (
                  <motion.div
                    key="country"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6">
                      <label
                        htmlFor="country"
                        className="text-[13px] font-medium text-[#334155]"
                      >
                        Destination country
                      </label>
                      <select
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="mt-2 h-11 w-full rounded-xl border border-[#e2e8f0] bg-white px-3 text-sm text-[#0f2a4a] outline-none transition-colors focus:border-[#ff7a1a] focus:ring-2 focus:ring-[#ff7a1a]/30"
                      >
                        {INTL_RATES.map((r) => (
                          <option key={r.country} value={r.country}>
                            {r.country}
                          </option>
                        ))}
                      </select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="weight"
                    className="text-[13px] font-medium text-[#334155]"
                  >
                    Weight
                  </label>
                  <span className="rounded-full bg-[#ff7a1a]/10 px-3 py-1 text-xs font-semibold text-[#c2570c]">
                    {weight} kg
                  </span>
                </div>
                <input
                  id="weight"
                  type="range"
                  min={0.5}
                  max={rate.maxKg}
                  step={0.5}
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="mt-3 h-2 w-full cursor-pointer accent-[#ff7a1a]"
                />
                <div className="mt-1 flex justify-between text-[11px] text-[#94a3b8]">
                  <span>0.5 kg</span>
                  <span>{rate.maxKg} kg</span>
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="relative isolate flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0f2a4a] to-[#143a63] p-6 text-white sm:p-8">
              <div
                aria-hidden="true"
                className="absolute -right-10 -top-10 -z-10 size-48 rounded-full bg-[#ff7a1a]/25 blur-3xl"
              />

              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-white/60">
                  Estimated cost
                </p>
                <p
                  aria-live="polite"
                  className="mt-2 text-5xl font-extrabold tracking-tight"
                >
                  <AnimatedPrice value={total} />
                </p>

                <dl className="mt-6 space-y-2 border-t border-white/15 pt-4 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-white/65">Base fee</dt>
                    <dd className="font-medium">${base.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-white/65">Weight ({weight} kg)</dt>
                    <dd className="font-medium">${weightCharge.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="flex items-center gap-1.5 text-white/65">
                      <Clock aria-hidden="true" className="size-3.5" /> Delivery
                      time
                    </dt>
                    <dd className="font-medium">{time}</dd>
                  </div>
                </dl>
              </div>

              <Link
                href="/register"
                className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#ff7a1a] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#e8590c] hover:shadow-lg hover:shadow-[#ff7a1a]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f2a4a]"
              >
                Book now
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
