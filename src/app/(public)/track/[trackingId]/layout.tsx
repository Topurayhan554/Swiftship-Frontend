import type { ReactNode } from "react";
import TrackHero from "@/components/track/TrackHero";
import TrackSection from "@/components/track/TrackSection";
import { normalizeId } from "@/lib/track";

export default async function TrackingLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ trackingId: string }>;
}) {
  const { trackingId } = await params;

  return (
    <>
      <TrackHero defaultValue={normalizeId(trackingId)} />
      <TrackSection>{children}</TrackSection>
    </>
  );
}
