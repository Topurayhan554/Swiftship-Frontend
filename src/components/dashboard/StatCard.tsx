"use client";

import { useEffect, useState } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export default function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  hint?: string;
}) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce) {
      setShown(value);
      return;
    }
    const c = animate(0, value, {
      duration: 1,
      ease: "easeOut",
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => c.stop();
  }, [value, reduce]);

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group rounded-2xl bg-white p-5 shadow-[0_6px_24px_rgba(15,42,74,0.06)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_14px_32px_rgba(255,122,26,0.15)]"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[#64748b]">{label}</p>
        <span className="flex size-10 items-center justify-center rounded-full bg-[#ffe6d1] text-[#0f2a4a] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#ff7a1a] group-hover:text-white">
          <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
        </span>
      </div>
      <p className="mt-3 text-3xl font-extrabold tracking-tight text-[#0f2a4a]">
        {shown}
      </p>
      {hint && <p className="mt-1 text-xs text-[#94a3b8]">{hint}</p>}
    </motion.div>
  );
}
