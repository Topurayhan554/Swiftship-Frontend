"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/shared/motion";
import { ABOUT_STATS } from "@/constants/about";

function CountUp({
  to,
  suffix,
  decimals,
  start,
}: {
  to: number;
  suffix: string;
  decimals: number;
  start: boolean;
}) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!start) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate: setValue,
    });
    return () => controls.stop();
  }, [start, to, reduce]);

  return (
    <>
      {value.toFixed(decimals)}
      {suffix}
    </>
  );
}

export default function AboutStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="bg-white py-14">
      <div
        ref={ref}
        className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2a4a] to-[#143a63] px-6 py-12 sm:px-12"
      >
        <div
          aria-hidden="true"
          className="absolute -right-10 -top-10 -z-10 size-56 rounded-full bg-[#ff7a1a]/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-12 -left-10 -z-10 size-56 rounded-full bg-[#ffb27a]/15 blur-3xl"
        />

        <dl className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {ABOUT_STATS.map(({ to, suffix, label, decimals }, i) => (
            <motion.div
              key={label}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
            >
              <dd className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                <CountUp
                  to={to}
                  suffix={suffix}
                  decimals={decimals}
                  start={inView}
                />
              </dd>
              <dt className="mt-2 text-sm text-white/65">{label}</dt>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
