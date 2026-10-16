import type { ReactNode } from "react";
import TrackHero from "@/components/track/TrackHero";
import TrackSection from "@/components/track/TrackSection";
import { normalizeId } from "@/lib/track";

type Props = {
  children: ReactNode;
  params: Promise<{ trackingId: string }>;
};

export default async function TrackLayout({ children, params }: Props) {
  const trackingId = normalizeId((await params).trackingId);

  return (
    <>
      <TrackHero defaultValue={trackingId} />
      <TrackSection>{children}</TrackSection>
    </>
  );
}
