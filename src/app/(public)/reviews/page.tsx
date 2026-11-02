import type { Metadata } from "next";
import PublicReviews from "@/components/reviews/public-reviews";

export const metadata: Metadata = {
  title: "Customer reviews",
  description: "Read what customers say about their parcel deliveries.",
};

export default function ReviewsPage() {
  return <PublicReviews />;
}
