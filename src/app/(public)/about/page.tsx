import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutStats from "@/components/about/AboutStats";
import AboutStory from "@/components/about/AboutStory";
import AboutTeam from "@/components/about/AboutTeam";
import AboutValues from "@/components/about/AboutValues";
import ServicesCta from "@/components/services/ServicesCta";

export const metadata: Metadata = {
  title: "About | SwiftShip",
  description:
    "Learn about SwiftShip: our story, values and the team behind fast, secure and trackable deliveries.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutStats />
      <AboutValues />
      <AboutTeam />
      <div className="bg-[#f7f9fc] pt-16">
        <ServicesCta />
      </div>
    </>
  );
}
