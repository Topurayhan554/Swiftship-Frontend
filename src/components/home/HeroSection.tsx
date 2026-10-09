"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { MapPin, ShieldCheck, Zap } from "lucide-react";
import TrackingInput from "./TrackingInput";

const INTERVAL = 5500;
const EASE = [0.22, 1, 0.36, 1] as const;

const SLIDES = [
  {
    eyebrow: "FAST · SAFE · RELIABLE",
    lines: ["Your Packages,", "Our Priority"],
    text: "We deliver what matters. From important documents to everyday parcels, SwiftShip makes shipping simple, fast and secure.",
  },
  {
    eyebrow: "SAME DAY DELIVERY",
    lines: ["Delivered Today,", "Not Tomorrow"],
    text: "Need it there in hours? Our express network gets your urgent parcels to their destination the very same day.",
  },
  {
    eyebrow: "REAL-TIME TRACKING",
    lines: ["Always Know", "Where It Is"],
    text: "Follow every parcel from pickup to doorstep with live status updates, so you're never left guessing.",
  },
];

const STATS: { to?: number; suffix?: string; text?: string; label: string }[] =
  [
    { to: 50, suffix: "K+", label: "Parcels delivered" },
    { to: 99, suffix: "%", label: "On-time rate" },
    { text: "24/7", label: "Support" },
  ];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

const lineReveal: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.8, ease: EASE } },
  exit: { y: "-110%", transition: { duration: 0.35, ease: "easeIn" } },
};

function CountUp({
  to,
  suffix = "",
  reduce,
}: {
  to: number;
  suffix?: string;
  reduce: boolean | null;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function HeroSection() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setTimeout(() => setIndex((index + 1) % SLIDES.length), INTERVAL);
    return () => clearTimeout(t);
  }, [index, reduce, paused]);

  const slide = SLIDES[index];

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#ffe8d6] via-[#fff4ea] to-[#f7f9fc]">
      <div
        aria-hidden="true"
        className="absolute -left-24 top-0 -z-10 size-[380px] rounded-full bg-[#ee7b22]/10 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-20 bottom-0 -z-10 size-[420px] rounded-full bg-[#0f2a4a]/5 blur-[100px]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.35] [background-image:radial-gradient(#0f2a4a_0.8px,transparent_0.8px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom_right,black,transparent_60%)]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-12 pt-10 md:grid-cols-2 md:pb-0 md:pt-16">
        {/* LEFT: rotating content */}
        <div
          className="relative z-10 md:pb-20"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="min-h-[290px] sm:min-h-[310px]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                variants={container}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <motion.p
                  variants={fadeUp}
                  className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.25em] text-[#ee7b22]"
                >
                  <span className="h-px w-8 bg-[#ee7b22]" />
                  {slide.eyebrow}
                </motion.p>

                <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-[#0f2a4a] sm:text-5xl lg:text-6xl">
                  {slide.lines.map((line) => (
                    <span key={line} className="block overflow-hidden pb-1">
                      <motion.span variants={lineReveal} className="block">
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </h1>

                <motion.p
                  variants={fadeUp}
                  className="mt-5 max-w-md text-[15px] leading-relaxed text-[#475569]"
                >
                  {slide.text}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            className="mt-2"
          >
            <TrackingInput />
          </motion.div>

          {/* Stats */}
          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[#0f2a4a]/10 pt-6"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-bold text-[#0f2a4a]">
                  {s.to !== undefined ? (
                    <CountUp to={s.to} suffix={s.suffix} reduce={reduce} />
                  ) : (
                    s.text
                  )}
                </dd>
                <p className="text-xs text-[#64748b]">{s.label}</p>
              </div>
            ))}
          </motion.dl>

          <div
            className="mt-6 flex items-center gap-2"
            role="tablist"
            aria-label="Hero slides"
          >
            {SLIDES.map((s, i) => (
              <button
                key={s.eyebrow}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className="relative h-1 w-10 overflow-hidden rounded-full bg-[#0f2a4a]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee7b22] focus-visible:ring-offset-2"
              >
                {i === index && (
                  <motion.span
                    key={`progress-${index}`}
                    className="absolute inset-0 origin-left rounded-full bg-[#ee7b22]"
                    initial={{ scaleX: reduce ? 1 : 0 }}
                    animate={{ scaleX: paused && !reduce ? 0 : 1 }}
                    transition={{
                      duration: reduce ? 0 : paused ? 0.3 : INTERVAL / 1000,
                      ease: "linear",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="relative h-[340px] sm:h-[420px] md:h-[540px]">
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE }}
            className="absolute bottom-0 left-1/2 aspect-square w-[88%] max-w-[480px] -translate-x-1/2 translate-y-[12%] rounded-full bg-gradient-to-br from-[#ee7b22]/30 via-[#ee7b22]/15 to-transparent"
          />
          <motion.div
            aria-hidden="true"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 60, ease: "linear", repeat: Infinity }}
            className="absolute bottom-0 left-1/2 aspect-square w-[98%] max-w-[540px] -translate-x-1/2 translate-y-[18%] rounded-full border border-dashed border-[#0f2a4a]/15"
          />

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src="/currier-man.png"
              alt="SwiftShip courier carrying a parcel in front of a delivery van"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain object-bottom"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.08 }}
            className="absolute right-2 top-30 z-20 hidden sm:block md:right-0"
          >
            <div className="float2 flex items-center gap-2.5 rounded-2xl bg-white/90 px-3.5 py-2.5 shadow-[0_12px_30px_rgba(15,42,74,0.12)] ring-1 ring-black/5 backdrop-blur">
              <span className="flex size-8 items-center justify-center rounded-xl bg-[#0f2a4a]/10 text-[#0f2a4a]">
                <MapPin className="size-4" aria-hidden="true" />
              </span>
              <div className="leading-tight">
                <p className="flex items-center gap-1.5 text-xs font-bold text-[#0f2a4a]">
                  Live tracking
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#16a34a] opacity-70" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-[#16a34a]" />
                  </span>
                </p>
                <p className="text-[11px] text-[#64748b]">real-time updates</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.08 }}
            className="absolute left-2 top-45 z-20 hidden sm:block md:left-0"
          >
            <div className="float1 flex items-center gap-2.5 rounded-2xl bg-white/90 px-3.5 py-2.5 shadow-[0_12px_30px_rgba(15,42,74,0.12)] ring-1 ring-black/5 backdrop-blur">
              <span className="flex size-8 items-center justify-center rounded-xl bg-[#ee7b22]/10 text-[#ee7b22]">
                <Zap className="size-4" aria-hidden="true" />
              </span>
              <div className="leading-tight">
                <p className="text-xs font-bold text-[#0f2a4a]">Same day</p>
                <p className="text-[11px] text-[#64748b]">delivery available</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.08 }}
            className="absolute bottom-24 right-2 z-20 hidden sm:block md:right-0"
          >
            <div className="float1 flex items-center gap-2.5 rounded-2xl bg-white/90 px-3.5 py-2.5 shadow-[0_12px_30px_rgba(15,42,74,0.12)] ring-1 ring-black/5 backdrop-blur">
              <span className="flex size-8 items-center justify-center rounded-xl bg-[#16a34a]/10 text-[#16a34a]">
                <ShieldCheck className="size-4" aria-hidden="true" />
              </span>
              <div className="leading-tight">
                <p className="text-xs font-bold text-[#0f2a4a]">Insured</p>
                <p className="text-[11px] text-[#64748b]">safe &amp; secure</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
