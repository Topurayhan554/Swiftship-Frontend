import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import { Reveal } from "@/components/shared/motion";

export const metadata: Metadata = {
  title: "Contact | SwiftShip",
  description:
    "Get in touch with the SwiftShip team for booking help, quotes or tracking issues.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <section className="bg-[#f7f9fc] py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[1.4fr_1fr]">
          <Reveal y={32}>
            <div className="relative rounded-3xl bg-white p-6 shadow-[0_16px_40px_rgba(15,42,74,0.1)] ring-1 ring-black/5 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
          <ContactInfo />
        </div>
      </section>
    </>
  );
}
