import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import {
  LEGAL_UPDATED,
  PRIVACY_INTRO,
  PRIVACY_SECTIONS,
} from "@/constants/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | SwiftShip",
  description:
    "How SwiftShip collects, uses and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="LEGAL"
      title="Privacy"
      highlight="Policy"
      intro={PRIVACY_INTRO}
      updated={LEGAL_UPDATED}
      sections={PRIVACY_SECTIONS}
    />
  );
}
