import type { ListQuery } from "@/api/admin.api";
import apiClient from "@/lib/apiClient";

export type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: Meta;
};

export type Review = {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  parcelId: string;
  user?: { id: string; name: string } | null;
  parcel?: { trackingId?: string } | null;
};

export type CreateReviewPayload = {
  parcelId: string;
  rating: number;
  comment?: string;
};

export const reviewApi = {
  create: (payload: CreateReviewPayload) =>
    apiClient<ApiResponse<Review>>("/reviews", {
      method: "POST",
      body: payload,
    }),

  mine: (q: ListQuery = {}) =>
    apiClient<ApiResponse<Review[]>>("/reviews/my-reviews", { query: q }),

  forCourier: (courierId: string, q: ListQuery = {}) =>
    apiClient<ApiResponse<Review[]>>(`/reviews/courier/${courierId}`, {
      query: q,
    }),
};

export type PublicReview = {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  customerName: string;
};

export type PublicReviewSummary = {
  total: number;
  average: number;
  distribution: { rating: number; count: number }[];
};

export type PublicReviewsData = {
  reviews: PublicReview[];
  summary: PublicReviewSummary;
};

export const publicReviewApi = {
  list: (q: { page?: number; limit?: number; rating?: number } = {}) =>
    apiClient<ApiResponse<PublicReviewsData>>("/reviews/public", { query: q }),
};
