"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import { Reveal } from "@/components/shared/motion";
import { trackCard } from "@/components/track/styles";

export default function TrackingError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Reveal className={`${trackCard} mx-auto max-w-lg text-center`}>
      <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#ff7a1a]/10 text-[#e8590c]">
        <AlertTriangle aria-hidden="true" className="size-8" />
      </span>
      <h2 className="mt-5 text-xl font-bold text-[#0f2a4a]">
        Something went wrong
      </h2>
      <p className="mt-2 text-sm text-[#64748b]">
        We couldn&apos;t load tracking details right now.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#ff7a1a] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e8590c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a] focus-visible:ring-offset-2"
      >
        <RotateCcw aria-hidden="true" className="size-4" />
        Try again
      </button>
    </Reveal>
  );
}
