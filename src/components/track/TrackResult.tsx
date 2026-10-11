"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/shared/motion";
import type { Parcel } from "@/lib/track";
import ParcelSummary from "./ParcelSummary";
import TrackingTimeline from "./TrackingTimeline";
import { trackCard } from "./styles";

export default function TrackResult({ parcel }: { parcel: Parcel }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <motion.div
      className="grid gap-6 lg:grid-cols-[1fr_1.2fr]"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <div className={trackCard}>
        <ParcelSummary parcel={parcel} />
      </div>
      <div className={trackCard}>
        <h2 className="mb-6 text-lg font-bold text-[#0f2a4a]">
          Delivery progress
        </h2>
        <TrackingTimeline parcel={parcel} />
      </div>
    </motion.div>
  );
}
