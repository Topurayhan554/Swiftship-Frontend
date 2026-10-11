import ServicesHero from "@/components/services/ServicesHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | SwiftShip",
  description:
    "Document, parcel, express and international delivery. Fast, secure and trackable with SwiftShip.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
    </>
  );
}
