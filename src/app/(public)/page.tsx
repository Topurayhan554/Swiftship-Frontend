import DestinationsSection from "@/components/home/DestinationsSection";
import FeatureStrip from "@/components/home/FeatureStrip";
import HeroSection from "@/components/home/HeroSection";
import PromoBanner from "@/components/home/PromoBanner";

import ServicesSection from "@/components/home/ServicesSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeatureStrip />
      <ServicesSection />
      <PromoBanner />
      <DestinationsSection />
    </>
  );
}
