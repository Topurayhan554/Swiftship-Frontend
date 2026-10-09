import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { DESTINATIONS } from "@/constants/home";

export default function DestinationsSection() {
  return (
    <section className="bg-[#f7f9fc] pb-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          title="Popular Destinations"
          description="We deliver to all 64 districts of Bangladesh."
          actionLabel="View All"
          actionHref="/pricing"
        />

        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {DESTINATIONS.map(({ city, price, image }) => (
            <li key={city}>
              <Link
                href={`/pricing?to=${encodeURIComponent(city)}`}
                className="group block overflow-hidden rounded-2xl bg-white shadow-[0_6px_24px_rgba(15,42,74,0.06)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_12px_32px_rgba(255,122,26,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a]"
              >
                <div className="relative h-28 bg-gradient-to-br from-[#dbe7f3] to-[#c4d6ea]">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 20vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-between p-3">
                  <div>
                    <p className="text-sm font-semibold text-[#0f2a4a]">
                      {city}
                    </p>
                    <p className="mt-0.5 text-xs text-[#64748b]">
                      From {price}
                    </p>
                  </div>
                  <span className="flex size-7 items-center justify-center rounded-full bg-[#ffe6d1] text-[#e8590c] transition-colors group-hover:bg-[#ff7a1a] group-hover:text-white">
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
