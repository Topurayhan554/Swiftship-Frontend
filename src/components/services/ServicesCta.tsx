import Link from "next/link";
import { ArrowRight, Send } from "lucide-react";
import {
  Float,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/shared/motion";

export default function ServicesCta() {
  return (
    <section className="bg-[#f7f9fc] pb-16">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal scale={0.97} y={36}>
          <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2a4a] to-[#143a63] px-8 py-14 text-center sm:px-12">
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-10 -z-10 size-56 rounded-full bg-[#ff7a1a]/25 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-12 -left-10 -z-10 size-56 rounded-full bg-[#ffb27a]/15 blur-3xl"
            />

            <Float
              className="absolute left-8 top-8 hidden sm:block"
              y={10}
              rotate={8}
              duration={4.5}
            >
              <Send
                aria-hidden="true"
                className="size-8 -rotate-12 fill-[#ff7a1a] text-[#ff7a1a]"
              />
            </Float>

            <Stagger gap={0.12} delay={0.15} className="mx-auto max-w-xl">
              <StaggerItem>
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Ready to send your first parcel?
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  Create a free account and get 30% off your first shipment. It
                  takes less than a minute.
                </p>
              </StaggerItem>
              <StaggerItem className="mt-7 flex flex-wrap items-center justify-center gap-3">
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
                <Link
                  href="/contact"
                  className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f2a4a]"
                >
                  Talk to us
                </Link>
              </StaggerItem>
            </Stagger>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
