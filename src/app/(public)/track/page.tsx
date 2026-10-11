import type { Metadata } from "next";
import TrackHero from "@/components/track/TrackHero";
import TrackIdle from "@/components/track/TrackIdle";
import TrackSection from "@/components/track/TrackSection";

export const metadata: Metadata = {
  title: "Track Parcel | SwiftShip",
  description:
    "Enter your tracking ID to see live status updates for your SwiftShip parcel.",
};

export default function TrackPage() {
  return (
    <>
      <TrackHero />
      <TrackSection>
        <TrackIdle />
      </TrackSection>
    </>
  );
}
