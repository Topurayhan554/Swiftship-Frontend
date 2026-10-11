import Link from "next/link";
import { PackageSearch } from "lucide-react";
import { Float, Reveal } from "@/components/shared/motion";
import { SAMPLE_IDS } from "@/constants/track";

export default function TrackIdle() {
  return (
    <Reveal className="mx-auto max-w-lg text-center">
      <Float y={8} duration={4}>
        <span className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-white text-[#ff7a1a] shadow-xl shadow-[#0f2a4a]/10 ring-1 ring-black/5">
          <PackageSearch aria-hidden="true" className="size-10" />
        </span>
      </Float>
      <h2 className="mt-6 text-xl font-bold text-[#0f2a4a]">Track a parcel</h2>
      <p className="mt-2 text-sm text-[#64748b]">
        Your tracking ID is in the confirmation email sent when you booked.
      </p>

      {/* Demo only: remove together with SAMPLE_IDS once the real API is connected */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs text-[#94a3b8]">Try a sample:</span>
        {SAMPLE_IDS.map((s) => (
          <Link
            key={s}
            href={`/track/${s}`}
            className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-[#0f2a4a] transition-colors hover:border-[#ff7a1a] hover:text-[#e8590c]"
          >
            {s}
          </Link>
        ))}
      </div>
    </Reveal>
  );
}
