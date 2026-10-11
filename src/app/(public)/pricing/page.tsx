import type { Metadata } from "next";
import { Suspense } from "react";
import IncludedStrip from "@/components/pricing/IncludedStrip";
import InternationalRates from "@/components/pricing/InternationalRates";
import PricingCards from "@/components/pricing/PricingCards";
import PricingHero from "@/components/pricing/PricingHero";
import RateCalculator from "@/components/pricing/RateCalculator";
import ServicesCta from "@/components/services/ServicesCta";

export const metadata: Metadata = {
  title: "Pricing | SwiftShip",
  description:
    "Transparent delivery pricing. Estimate your cost for document, parcel, express and international shipping.",
};

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <Suspense fallback={<div className="h-[420px] bg-[#f7f9fc]" />}>
        <RateCalculator />
      </Suspense>
      <PricingCards />
      <InternationalRates />
      <IncludedStrip />
      <ServicesCta />
    </>
  );
}
