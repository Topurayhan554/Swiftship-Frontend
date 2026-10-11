import { MessageCircle } from "lucide-react";
import { Float, Reveal } from "@/components/shared/motion";

export default function ContactHero() {
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
        className="absolute right-[12%] top-14 hidden md:block"
        y={14}
        rotate={6}
        duration={5}
      >
        <span className="flex size-16 items-center justify-center rounded-2xl bg-white shadow-xl shadow-[#0f2a4a]/10 ring-1 ring-black/5">
          <MessageCircle aria-hidden="true" className="size-8 text-[#ff7a1a]" />
        </span>
      </Float>

      <div className="mx-auto max-w-6xl px-4 pb-14 pt-14 sm:pt-20">
        <Reveal y={16}>
          <p className="text-[11px] font-medium tracking-[0.2em] text-[#64748b]">
            CONTACT US
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-[#0f2a4a] sm:text-5xl">
            We&apos;re here to{" "}
            <span className="bg-gradient-to-r from-[#ff7a1a] to-[#e8590c] bg-clip-text text-transparent">
              help
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#475569]">
            Questions about a booking, a quote or a parcel? Send us a message
            and our team will get back to you within one working day.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
