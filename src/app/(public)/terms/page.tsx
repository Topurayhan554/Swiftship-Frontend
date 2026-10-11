import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { LEGAL_UPDATED, TERMS_INTRO, TERMS_SECTIONS } from "@/constants/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions | SwiftShip",
  description:
    "The terms that apply when you use SwiftShip's website and delivery services.",
};

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="LEGAL"
      title="Terms &"
      highlight="Conditions"
      intro={TERMS_INTRO}
      updated={LEGAL_UPDATED}
      sections={TERMS_SECTIONS}
    />
  );
}
