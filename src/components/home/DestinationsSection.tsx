import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { Stagger, StaggerItem } from "@/components/shared/motion";
import { DESTINATIONS } from "@/constants/home";

export default function DestinationsSection() {
  return (
    <section className="bg-[#f7f9fc] pb-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          title="Popular Destinations"
          description="We deliver to every major city across Bangladesh."
          actionLabel="View All"
          actionHref="/pricing"
        />

        <Stagger
          as="ul"
          gap={0.1}
          className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        >
          {DESTINATIONS.map(({ city, price, image }) => (
            <StaggerItem as="li" key={city} lift={8}>
              <Link
                href={`/pricing?to=${encodeURIComponent(city)}`}
                aria-label={`${city}, delivery from ${price}`}
                className="group block overflow-hidden rounded-2xl bg-white shadow-[0_6px_24px_rgba(15,42,74,0.06)] ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(255,122,26,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a]"
              >
                <div className="relative h-28 overflow-hidden bg-gradient-to-br from-[#dbe7f3] to-[#c4d6ea]">
                  {image && (
                    <Image
                      src={image}
                      alt={city}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
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
                  <span
                    aria-hidden="true"
                    className="flex size-7 items-center justify-center rounded-full bg-[#ffe6d1] text-[#e8590c] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#ff7a1a] group-hover:text-white"
                  >
                    <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
