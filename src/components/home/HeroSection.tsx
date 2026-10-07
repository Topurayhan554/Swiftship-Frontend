import Image from "next/image";
import TrackingInput from "./TrackingInput";

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#ffe8d6] via-[#fff4ea] to-[#f7f9fc]">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-12 pt-10 md:grid-cols-2 md:pb-0 md:pt-16">
        <div className="relative z-10 md:pb-20">
          <p className="text-[11px] font-medium tracking-[0.2em] text-[#64748b]">
            FAST · SAFE · RELIABLE
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#0f2a4a] sm:text-5xl lg:text-6xl">
            Your Packages,
            <br />
            Our Priority
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#475569]">
            We deliver what matters. From important documents to everyday
            parcels, SwiftShip makes shipping simple, fast and secure.
          </p>
          <div className="mt-8">
            <TrackingInput />
          </div>
        </div>

        <div className="relative h-[340px] sm:h-[420px] md:h-[520px]">
          <Image
            src="/images/hero-courier.png"
            alt="SwiftShip courier carrying a parcel in front of a delivery van"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain object-bottom"
          />
          <p
            aria-hidden="true"
            className="absolute right-2 top-0 hidden -rotate-6 text-right font-serif text-xl italic leading-tight text-[#0f2a4a] sm:block"
          >
            Same day
            <br />
            delivery
            <br />
            available!
          </p>
        </div>
      </div>
    </section>
  );
}
