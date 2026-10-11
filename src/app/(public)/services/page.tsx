import type { Metadata } from "next";
import FaqSection from "@/components/services/FaqSection";
import ProcessSteps from "@/components/services/ProcessSteps";
import ServiceDetailSection from "@/components/services/ServiceDetailSection";
import ServicesCta from "@/components/services/ServicesCta";
import ServicesHero from "@/components/services/ServicesHero";
import { SERVICE_DETAILS } from "@/constants/services";

export const metadata: Metadata = {
  title: "Services | SwiftShip",
  description:
    "Document, parcel, express and international delivery. Fast, secure and trackable with SwiftShip.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <div className="bg-[#f7f9fc]">
        {SERVICE_DETAILS.map((service, i) => (
          <ServiceDetailSection
            key={service.id}
            service={service}
            reverse={i % 2 === 1}
          />
        ))}
      </div>
      <ProcessSteps />
      <FaqSection />
      <ServicesCta />
    </>
  );
}
