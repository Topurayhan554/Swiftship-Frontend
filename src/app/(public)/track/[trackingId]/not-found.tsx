import Link from "next/link";
import { SearchX } from "lucide-react";
import { Reveal } from "@/components/shared/motion";
import { trackCard } from "@/components/track/styles";

export default function TrackingNotFound() {
  return (
    <Reveal className={`${trackCard} mx-auto max-w-lg text-center`}>
      <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-50 text-red-500">
        <SearchX aria-hidden="true" className="size-8" />
      </span>
      <h2 className="mt-5 text-xl font-bold text-[#0f2a4a]">No parcel found</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
        We couldn&apos;t find a parcel with that tracking ID. Please check the
        ID and try again.
      </p>
      <Link
        href="/contact"
        className="mt-5 inline-block text-sm font-semibold text-[#e8590c] hover:underline"
      >
        Need help? Contact support
      </Link>
    </Reveal>
  );
}
