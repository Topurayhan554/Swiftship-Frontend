import { Package } from "lucide-react";
import {
  Float,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/shared/motion";
import { SERVICE_DETAILS } from "@/constants/services";

export default function ServicesHero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#ffe8d6] via-[#fff4ea] to-[#f7f9fc]">
      <div
        aria-hidden="true"
        className="absolute -left-24 top-0 -z-10 size-72 rounded-full bg-[#ff7a1a]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-16 bottom-0 -z-10 size-80 rounded-full bg-[#ffb27a]/25 blur-3xl"
      />

      <Float
        className="absolute right-[12%] top-16 hidden md:block"
        y={14}
        rotate={6}
        duration={5}
      >
        <span className="flex size-16 items-center justify-center rounded-2xl bg-white shadow-xl shadow-[#0f2a4a]/10 ring-1 ring-black/5">
          <Package aria-hidden="true" className="size-8 text-[#ff7a1a]" />
        </span>
      </Float>

      <div className="mx-auto max-w-6xl px-4 pb-14 pt-14 sm:pt-20">
        <Reveal y={16}>
          <p className="text-[11px] font-medium tracking-[0.2em] text-[#64748b]">
            OUR SERVICES
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-[#0f2a4a] sm:text-5xl">
            Delivery solutions for{" "}
            <span className="bg-gradient-to-r from-[#ff7a1a] to-[#e8590c] bg-clip-text text-transparent">
              every need
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#475569]">
            Whether it is a single document or a shipment across the world,
            SwiftShip has a fast, secure and trackable way to get it there.
          </p>
        </Reveal>

        <Stagger
          as="ul"
          gap={0.08}
          delay={0.3}
          className="mt-8 flex flex-wrap gap-3"
        >
          {SERVICE_DETAILS.map(({ id, icon: Icon, title }) => (
            <StaggerItem as="li" key={id} lift={3}>
              <a
                href={`#${id}`}
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-[13px] font-medium text-[#0f2a4a] transition-colors hover:border-[#ff7a1a] hover:text-[#e8590c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a] focus-visible:ring-offset-2"
              >
                <Icon aria-hidden="true" className="size-4 text-[#ff7a1a]" />
                {title}
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
