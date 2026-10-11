"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { EASE, Reveal } from "@/components/shared/motion";
import SectionHeader from "@/components/shared/SectionHeader";
import { FAQS } from "@/constants/services";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[#f7f9fc] py-16">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeader
          title="Frequently asked questions"
          description="Quick answers about booking, tracking and payment."
        />

        <div className="mt-8 space-y-3">
          {FAQS.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={q} y={16} delay={i * 0.06}>
                <div
                  className={`overflow-hidden rounded-2xl bg-white ring-1 transition-shadow duration-300 ${
                    isOpen
                      ? "shadow-[0_10px_30px_rgba(255,122,26,0.15)] ring-[#ff7a1a]/40"
                      : "shadow-sm ring-black/5"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-button-${i}`}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-[#0f2a4a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ff7a1a]"
                    >
                      {q}
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="shrink-0 text-[#ff7a1a]"
                      >
                        <ChevronDown aria-hidden="true" className="size-5" />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-button-${i}`}
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-[#475569]">
                          {a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
