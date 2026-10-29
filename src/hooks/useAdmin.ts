"use client";

import { adminApi, ListQuery } from "@/api/admin.api";
import { ParcelStatus } from "@/types";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const key = {
  stats: ["admin", "stats"] as const,
  parcels: ["admin", "parcels"] as const,
  users: ["admin", "users"] as const,
  payments: ["admin", "payments"] as const,
  reviews: ["admin", "reviews"] as const,
  logs: ["admin", "audit-logs"] as const,
};

export const useAdminStats = () =>
  useQuery({ queryKey: key.stats, queryFn: adminApi.stats });

export const useAdminParcels = (q: ListQuery) =>
  useQuery({
    queryKey: [...key.parcels, q],
    queryFn: () => adminApi.parcels(q),
    placeholderData: keepPreviousData,
  });

export const useAdminUsers = (q: ListQuery) =>
  useQuery({
    queryKey: [...key.users, q],
    queryFn: () => adminApi.users(q),
    placeholderData: keepPreviousData,
  });

export const useCouriersForAssign = () =>
  useQuery({
    queryKey: [...key.users, "assign-list"],
    queryFn: () => adminApi.users({ role: "COURIER", limit: 100 }),
  });

export const useAdminPayments = (q: ListQuery) =>
  useQuery({
    queryKey: [...key.payments, q],
    queryFn: () => adminApi.payments(q),
    placeholderData: keepPreviousData,
  });

export const useAdminReviews = (q: ListQuery) =>
  useQuery({
    queryKey: [...key.reviews, q],
    queryFn: () => adminApi.reviews(q),
    placeholderData: keepPreviousData,
  });

export const useAuditLogs = (q: ListQuery) =>
  useQuery({
    queryKey: [...key.logs, q],
    queryFn: () => adminApi.auditLogs(q),
    placeholderData: keepPreviousData,
  });

function useInvalidating<TVars>(
  fn: (v: TVars) => Promise<unknown>,
  keys: (readonly unknown[])[],
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () =>
      Promise.all(keys.map((k) => qc.invalidateQueries({ queryKey: k }))),
  });
}

const parcelKeys = [key.parcels, key.stats, key.payments];

export const useAssignCourier = () =>
  useInvalidating(
    ({ id, courierId }: { id: string; courierId: string }) =>
      adminApi.assignCourier(id, courierId),
    [...parcelKeys, key.users],
  );

export const useUpdateParcelStatus = () =>
  useInvalidating(
    ({
      id,
      status,
      note,
    }: {
      id: string;
      status: ParcelStatus;
      note?: string;
    }) => adminApi.updateParcelStatus(id, status, note),
    parcelKeys,
  );

export const useCancelParcel = () =>
  useInvalidating((id: string) => adminApi.cancelParcel(id), parcelKeys);

export const useSetUserBlocked = () =>
  useInvalidating(
    ({ id, isBlocked }: { id: string; isBlocked: boolean }) =>
      adminApi.setUserBlocked(id, isBlocked),
    [key.users, key.stats],
  );

export const useDeleteReview = () =>
  useInvalidating((id: string) => adminApi.deleteReview(id), [key.reviews]);
