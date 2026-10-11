import Link from "next/link";
import { Check } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { Stagger, StaggerItem } from "@/components/shared/motion";
import { PRICING_PLANS } from "@/constants/pricing";

export default function PricingCards() {
  return (
    <section className="bg-[#f7f9fc] pb-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          title="Domestic delivery"
          description="Choose the speed that fits your parcel."
        />

        <Stagger as="ul" gap={0.12} className="mt-8 grid gap-6 md:grid-cols-3">
          {PRICING_PLANS.map(
            ({ id, name, from, unit, time, popular, features }) => (
              <StaggerItem as="li" key={id} lift={8} className="relative">
                {popular && (
                  <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-[#ff7a1a] px-3 py-1 text-[11px] font-semibold text-white shadow-md shadow-[#ff7a1a]/30">
                    Most popular
                  </span>
                )}
                <div
                  className={`flex h-full flex-col rounded-2xl bg-white p-6 transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(255,122,26,0.2)] ${
                    popular
                      ? "shadow-[0_12px_32px_rgba(255,122,26,0.18)] ring-2 ring-[#ff7a1a]"
                      : "shadow-[0_6px_24px_rgba(15,42,74,0.06)] ring-1 ring-black/5"
                  }`}
                >
                  <h3 className="text-base font-semibold text-[#0f2a4a]">
                    {name}
                  </h3>
                  <p className="mt-4 flex items-baseline gap-1.5">
                    <span className="text-4xl font-extrabold tracking-tight text-[#0f2a4a]">
                      {from}
                    </span>
                    <span className="text-xs text-[#64748b]">{unit}</span>
                  </p>
                  <p className="mt-1 text-xs font-medium text-[#e8590c]">
                    {time}
                  </p>

                  <ul className="mb-6 mt-5 space-y-2.5 border-t border-black/5 pt-5">
                    {features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2.5 text-sm text-[#334155]"
                      >
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#ff7a1a]/15 text-[#e8590c]">
                          <Check
                            aria-hidden="true"
                            className="size-3"
                            strokeWidth={3}
                          />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/services#${id}`}
                    className={`rounded-full px-5 py-2.5 text-center text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a] focus-visible:ring-offset-2 ${
                      popular
                        ? "mt-auto bg-[#ff7a1a] text-white hover:bg-[#e8590c]"
                        : "mt-auto border border-black/10 text-[#0f2a4a] hover:border-[#ff7a1a] hover:text-[#e8590c]"
                    }`}
                  >
                    View details
                  </Link>
                </div>
              </StaggerItem>
            ),
          )}
        </Stagger>
      </div>
    </section>
  );
}
