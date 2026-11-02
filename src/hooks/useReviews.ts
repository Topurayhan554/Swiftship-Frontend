"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { ListQuery } from "@/api/admin.api";
import {
  publicReviewApi,
  reviewApi,
  type CreateReviewPayload,
} from "@/api/reviews.api";

export const reviewKey = {
  mine: ["reviews", "mine"] as const,
  courier: ["reviews", "courier"] as const,
};

// CUSTOMER
export const useMyReviews = (q: ListQuery = {}) =>
  useQuery({
    queryKey: [...reviewKey.mine, q],
    queryFn: () => reviewApi.mine(q),
    placeholderData: keepPreviousData,
  });

export const useCreateReview = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateReviewPayload) => reviewApi.create(payload),
    onSuccess: () =>
      Promise.all([
        qc.invalidateQueries({ queryKey: reviewKey.mine }),
        qc.invalidateQueries({ queryKey: reviewKey.courier }),
        qc.invalidateQueries({ queryKey: ["admin", "reviews"] }),
      ]),
  });
};

export const useCourierReviews = (
  courierId: string | undefined,
  q: ListQuery = {},
) =>
  useQuery({
    queryKey: [...reviewKey.courier, courierId, q],
    queryFn: () => reviewApi.forCourier(courierId as string, q),
    enabled: !!courierId,
    placeholderData: keepPreviousData,
  });

// PUBLIC
export const usePublicReviews = (q: {
  page?: number;
  limit?: number;
  rating?: number;
}) =>
  useQuery({
    queryKey: ["reviews", "public", q],
    queryFn: () => publicReviewApi.list(q),
    placeholderData: keepPreviousData,
  });
