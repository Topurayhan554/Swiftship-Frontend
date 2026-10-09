import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Send } from "lucide-react";
import {
  Float,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/shared/motion";

export default function PromoBanner() {
  return (
    <section className="bg-[#f7f9fc] pb-14">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal scale={0.97} y={36}>
          <div className="relative isolate overflow-hidden rounded-2xl bg-[#0f2a4a]">
            <Image
              src="/images/promo-boxes.jpg"
              alt=""
              fill
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="-z-10 object-cover object-right opacity-90"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0f2a4a] via-[#0f2a4a]/85 to-transparent" />

            <Float
              className="absolute right-10 top-8 hidden sm:block"
              y={14}
              rotate={8}
              duration={4}
            >
              <Send
                aria-hidden="true"
                className="size-10 -rotate-12 fill-[#ff7a1a] text-[#ff7a1a]"
              />
            </Float>

            <Stagger
              gap={0.12}
              delay={0.2}
              className="px-8 py-12 sm:px-12 sm:py-14"
            >
              <StaggerItem>
                <p className="text-sm font-semibold text-[#ff7a1a]">
                  Special Offer
                </p>
              </StaggerItem>
              <StaggerItem>
                <h2 className="mt-2 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                  Get 30% Off
                  <span className="block text-2xl font-bold sm:text-3xl">
                    on Your First Shipment
                  </span>
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">
                  Sign up today and enjoy a special discount on your first
                  delivery.
                </p>
              </StaggerItem>
              <StaggerItem className="mt-7">
                <Link
                  href="/register"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#ff7a1a] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#e8590c] hover:shadow-lg hover:shadow-[#ff7a1a]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f2a4a]"
                >
                  Create Account
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </StaggerItem>
            </Stagger>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
