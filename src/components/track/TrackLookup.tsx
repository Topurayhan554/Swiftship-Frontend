"use client";

import { PackageX } from "lucide-react";
import { useTrackParcel } from "@/hooks";
import TrackResult from "./TrackResult";
import TrackSkeleton from "./TrackSkeleton";

export default function TrackLookup({ trackingId }: { trackingId: string }) {
  const { data, isLoading, isError, refetch } = useTrackParcel(trackingId);

  if (isLoading) return <TrackSkeleton />;

  if (isError) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <h2 className="text-xl font-bold text-[#0f2a4a]">
          Something went wrong
        </h2>
        <p className="mt-2 text-sm text-[#64748b]">
          We couldn&apos;t load tracking details. Please try again.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 rounded-full bg-[#ff7a1a] px-5 py-2 text-sm font-semibold text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <span className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-white text-[#ff7a1a] shadow-xl shadow-[#0f2a4a]/10 ring-1 ring-black/5">
          <PackageX aria-hidden="true" className="size-10" />
        </span>
        <h2 className="mt-6 text-xl font-bold text-[#0f2a4a]">
          Parcel not found
        </h2>
        <p className="mt-2 text-sm text-[#64748b]">
          No parcel matches <b>{trackingId}</b>. Check the tracking ID and try
          again.
        </p>
      </div>
    );
  }

  return <TrackResult parcel={data} />;
}
