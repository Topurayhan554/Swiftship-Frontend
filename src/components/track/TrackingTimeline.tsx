"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Truck } from "lucide-react";
import { EASE } from "@/components/shared/motion";
import { BRANCH_STATUS, STATUS_FLOW } from "@/constants/track";
import type { Parcel } from "@/lib/track";

export default function TrackingTimeline({ parcel }: { parcel: Parcel }) {
  const reduce = useReducedMotion() ?? false;
  const branch = BRANCH_STATUS[parcel.status];
  const flowKeys = STATUS_FLOW.map((s) => s.key);

  const lastFlow = [...parcel.events]
    .reverse()
    .find((e) => flowKeys.includes(e.status));
  const activeIdx = branch
    ? STATUS_FLOW.findIndex((s) => s.key === lastFlow?.status)
    : STATUS_FLOW.findIndex((s) => s.key === parcel.status);

  const steps = branch
    ? [
        ...STATUS_FLOW.slice(0, activeIdx + 1),
        { key: parcel.status, label: branch.label, hint: branch.hint },
      ]
    : STATUS_FLOW;

  const delivered = parcel.status === "DELIVERED";
  const timeOf = (key: string) =>
    parcel.events.find((e) => e.status === key)?.time;

  return (
    <ol className="relative">
      {steps.map((step, i) => {
        const isBranchNode = !!branch && i === steps.length - 1;
        const done = isBranchNode
          ? false
          : branch
            ? true
            : delivered || i < activeIdx;
        const isActive = !done && (isBranchNode || i === activeIdx);
        const isLast = i === steps.length - 1;
        const BranchIcon = branch?.icon;
        const time = timeOf(step.key);

        return (
          <motion.li
            key={step.key}
            className="relative flex gap-4 pb-8 last:pb-0"
            initial={reduce ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.18, ease: EASE }}
          >
            {/* Connector to next step */}
            {!isLast && (
              <>
                <span
                  aria-hidden="true"
                  className="absolute left-5 top-10 h-[calc(100%-2.5rem)] w-0.5 -translate-x-1/2 rounded-full bg-[#0f2a4a]/10"
                />
                <motion.span
                  aria-hidden="true"
                  className="absolute left-5 top-10 h-[calc(100%-2.5rem)] w-0.5 origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-[#ff7a1a] to-[#ffb27a]"
                  initial={reduce ? false : { scaleY: 0 }}
                  animate={{ scaleY: done ? 1 : 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + i * 0.18,
                    ease: "easeInOut",
                  }}
                />
              </>
            )}

            {/* Node */}
            <div className="relative z-10 shrink-0">
              {isActive && !reduce && (
                <motion.span
                  aria-hidden="true"
                  className={`absolute inset-0 rounded-full ${isBranchNode ? "bg-red-500" : "bg-[#ff7a1a]"}`}
                  animate={{ scale: [1, 1.6], opacity: [0.45, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              )}
              <motion.span
                className={`relative flex size-10 items-center justify-center rounded-full transition-colors ${
                  isBranchNode
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                    : done || isActive
                      ? "bg-[#ff7a1a] text-white shadow-lg shadow-[#ff7a1a]/30"
                      : "bg-white text-[#94a3b8] ring-1 ring-[#0f2a4a]/15"
                }`}
                initial={reduce ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 16,
                  delay: 0.1 + i * 0.18,
                }}
              >
                {isBranchNode && BranchIcon ? (
                  <BranchIcon aria-hidden="true" className="size-5" />
                ) : done || (isActive && delivered) ? (
                  <Check
                    aria-hidden="true"
                    className="size-5"
                    strokeWidth={3}
                  />
                ) : isActive ? (
                  <Truck aria-hidden="true" className="size-5" />
                ) : (
                  <span className="size-2 rounded-full bg-[#0f2a4a]/25" />
                )}
              </motion.span>
            </div>

            {/* Text */}
            <div className="min-w-0 flex-1 pt-1.5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <p
                  className={`text-sm font-semibold ${isBranchNode ? "text-red-600" : done || isActive ? "text-[#0f2a4a]" : "text-[#94a3b8]"}`}
                >
                  {step.label}
                </p>
                {time && <p className="text-xs text-[#64748b]">{time}</p>}
              </div>
              <p
                className={`mt-0.5 text-xs ${isActive ? "font-medium text-[#c2570c]" : "text-[#64748b]"}`}
              >
                {step.hint}
              </p>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
