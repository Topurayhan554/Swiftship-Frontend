import type { Metadata } from "next";
import TrackLookup from "@/components/track/TrackLookup";
import { normalizeId } from "@/lib/track";

type Props = { params: Promise<{ trackingId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const trackingId = normalizeId((await params).trackingId);
  return { title: `Track ${trackingId} | SwiftShip` };
}

export default async function TrackResultPage({ params }: Props) {
  const trackingId = normalizeId((await params).trackingId);
  return <TrackLookup trackingId={trackingId} />;
}
