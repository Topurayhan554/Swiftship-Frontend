import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TrackResult from "@/components/track/TrackResult";
import { getParcel, normalizeId } from "@/lib/track";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ trackingId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { trackingId } = await params;
  const id = normalizeId(trackingId);

  return {
    title: `Track ${id} | SwiftShip`,
    robots: { index: false, follow: false },
  };
}

export default async function TrackingResultPage({ params }: Props) {
  const { trackingId } = await params;
  const parcel = await getParcel(normalizeId(trackingId));

  if (!parcel) notFound();

  return <TrackResult parcel={parcel} />;
}
