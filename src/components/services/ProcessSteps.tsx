"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/shared/motion";
import SectionHeader from "@/components/shared/SectionHeader";
import { PROCESS_STEPS } from "@/constants/services";

export default function ProcessSteps() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          title="How it works"
          description="Four simple steps from booking to doorstep."
        />

        <div className="relative mt-12">
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-0.5 rounded-full bg-[#0f2a4a]/10 lg:block"
          />
          <motion.div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-0.5 origin-left rounded-full bg-gradient-to-r from-[#ff7a1a] to-[#ffb27a] lg:block"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.4, delay: 0.3, ease: "easeInOut" }}
          />

          <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {PROCESS_STEPS.map(({ icon: Icon, title, text }, i) => (
              <motion.li
                key={title}
                className="group flex flex-col items-center text-center"
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.18,
                  ease: EASE,
                }}
              >
                <div className="relative">
                  <span className="flex size-16 items-center justify-center rounded-full bg-[#ff7a1a] text-white shadow-lg shadow-[#ff7a1a]/30 ring-8 ring-white transition-transform duration-300 group-hover:scale-110">
                    <Icon
                      aria-hidden="true"
                      className="size-7"
                      strokeWidth={1.7}
                    />
                  </span>
                  <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-[#0f2a4a] text-[11px] font-bold text-white ring-2 ring-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-semibold text-[#0f2a4a]">
                  {title}
                </h3>
                <p className="mt-1.5 max-w-[220px] text-sm leading-relaxed text-[#64748b]">
                  {text}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
