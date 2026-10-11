"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

export default function TrackingInput({
  defaultValue = "",
}: {
  defaultValue?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);
  const controls = useAnimationControls();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = value.trim();
    if (!id) {
      // little shake when the field is empty
      controls.start({
        x: [0, -8, 8, -5, 5, 0],
        transition: { duration: 0.4 },
      });
      return;
    }
    router.push(`/track/${encodeURIComponent(id)}`);
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      role="search"
      animate={controls}
      whileHover={{ y: -2 }}
      className="group flex w-full max-w-md items-center gap-2 rounded-full bg-white p-1.5 pl-5 shadow-[0_10px_30px_rgba(255,122,26,0.15)] ring-1 ring-black/5 transition-shadow focus-within:shadow-[0_14px_36px_rgba(255,122,26,0.28)] focus-within:ring-2 focus-within:ring-[#ff7a1a]"
    >
      <MapPin
        aria-hidden="true"
        className="size-4 shrink-0 text-[#0f2a4a] transition-colors group-focus-within:text-[#ff7a1a]"
      />
      <label htmlFor="tracking-id" className="sr-only">
        Tracking ID
      </label>
      <input
        id="tracking-id"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Track your package..."
        className="min-w-0 flex-1 bg-transparent py-2 text-sm text-[#0f2a4a] outline-none placeholder:text-[#94a3b8]"
      />
      <motion.button
        type="submit"
        aria-label="Track package"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#ff7a1a] text-white transition-colors hover:bg-[#e8590c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f2a4a] focus-visible:ring-offset-2"
      >
        <ArrowRight aria-hidden="true" className="size-4" />
      </motion.button>
    </motion.form>
  );
}
