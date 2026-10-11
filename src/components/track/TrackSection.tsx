import type { ReactNode } from "react";

export default function TrackSection({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-[420px] bg-[#f7f9fc] py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">{children}</div>
    </section>
  );
}
