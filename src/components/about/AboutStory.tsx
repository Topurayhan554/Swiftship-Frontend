import Image from "next/image";
import { Check, Star } from "lucide-react";
import {
  Float,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/shared/motion";
import { ABOUT_HIGHLIGHTS } from "@/constants/about";

export default function AboutStory() {
  return (
    <section className="overflow-hidden bg-[#f7f9fc] py-14 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:gap-14">
        <Reveal x={-50} y={0}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-[#ffe8d6] to-[#ffd3b0] shadow-[0_16px_40px_rgba(15,42,74,0.12)] ring-1 ring-black/5">
            <Image
              src="/images/about/story.jpg"
              alt="SwiftShip couriers preparing parcels for delivery"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <Float className="absolute bottom-4 left-4" y={6} duration={4}>
              <span className="inline-flex items-center gap-2 rounded-xl bg-white/90 px-3 py-2 text-xs font-semibold text-[#0f2a4a] shadow-lg backdrop-blur">
                <Star
                  aria-hidden="true"
                  className="size-4 fill-[#ff7a1a] text-[#ff7a1a]"
                />
                Rated 4.9 by our customers
              </span>
            </Float>
          </div>
        </Reveal>

        <Reveal x={50} y={0} delay={0.1}>
          <p className="text-[11px] font-medium tracking-[0.2em] text-[#e8590c]">
            OUR STORY
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0f2a4a] sm:text-3xl">
            Built to make shipping simple
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#475569]">
            We started SwiftShip because sending a parcel should not be
            stressful. Too often, people were left guessing where their package
            was and when it would arrive.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-[#475569]">
            Today we combine local couriers with a modern booking and tracking
            platform, so every delivery is on time, protected and easy to
            follow.
          </p>

          <Stagger as="ul" gap={0.08} delay={0.2} className="mt-5 space-y-2.5">
            {ABOUT_HIGHLIGHTS.map((h) => (
              <StaggerItem
                as="li"
                key={h}
                className="flex items-start gap-3 text-sm text-[#334155]"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#ff7a1a]/15 text-[#e8590c]">
                  <Check
                    aria-hidden="true"
                    className="size-3"
                    strokeWidth={3}
                  />
                </span>
                {h}
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      </div>
    </section>
  );
}
