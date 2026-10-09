"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";

export default function TrackingInput() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = value.trim();
    if (id) router.push(`/track?id=${encodeURIComponent(id)}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-md items-center gap-2 rounded-full bg-white p-1.5 pl-5 shadow-[0_10px_30px_rgba(238,123,34,0.15)] ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-[#ee7b22]"
    >
      <MapPin aria-hidden="true" className="size-4 shrink-0 text-[#1a1c20]" />
      <label htmlFor="tracking-id" className="sr-only">
        Tracking ID
      </label>
      <input
        id="tracking-id"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Track your package..."
        className="min-w-0 flex-1 bg-transparent py-2 text-sm text-[#1a1c20] outline-none placeholder:text-[#9a9ea5]"
      />
      <button
        type="submit"
        aria-label="Track package"
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#ee7b22] text-white transition-colors hover:bg-[#d96c16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1c20] focus-visible:ring-offset-2"
      >
        <ArrowRight aria-hidden="true" className="size-4" />
      </button>
    </form>
  );
}
