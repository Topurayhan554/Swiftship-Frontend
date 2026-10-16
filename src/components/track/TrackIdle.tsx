import { PackageSearch } from "lucide-react";
import { Float, Reveal } from "@/components/shared/motion";

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
    </Reveal>
  );
}
