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
      whileHover={reduce ? undefined : { y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="flex size-10 items-center justify-center rounded-lg bg-[#0f2a4a]/5 text-[#0f2a4a] dark:bg-slate-800 dark:text-slate-200">
          <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
        </span>
      </div>
      <p className="mb-1 text-sm font-medium text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        {shown}
      </p>
      {hint && (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
          {hint}
        </p>
      )}
    </motion.div>
  );
}
