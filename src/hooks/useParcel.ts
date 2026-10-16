import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelParcel,
  createParcel,
  getMyParcels,
  trackParcel,
  updateParcel,
} from "@/api";
import { toTrackParcel, type Parcel as TrackParcel } from "@/lib/track";
import type { CreateParcelPayload, Parcel, UpdateParcelPayload } from "@/types";

export const PARCELS_KEY = ["my-parcels"];

export function useMyParcels() {
  return useQuery<Parcel[]>({
    queryKey: PARCELS_KEY,
    staleTime: 0,
    refetchOnMount: "always",
    queryFn: async () => {
      const res = await getMyParcels();
      const list = res?.data?.data ?? res?.data ?? [];
      return Array.isArray(list) ? (list as Parcel[]) : [];
    },
    refetchInterval: (query) => {
      if (typeof window === "undefined") return false;
      const params = new URLSearchParams(window.location.search);
      if (params.get("paymentStatus") !== "success") return false;
      if (query.state.dataUpdateCount > 15) return false;

      const waiting = (query.state.data ?? []).some(
        (p) => p.status !== "CANCELLED" && p.payment?.status === "PENDING",
      );
      return waiting ? 2000 : false;
    },
  });
}

export function useTrackParcel(trackingId: string) {
  return useQuery<TrackParcel | null>({
    queryKey: ["track", trackingId],
    enabled: !!trackingId,
    retry: false,
    refetchInterval: (query) => {
      const s = query.state.data?.status;
      return s && s !== "DELIVERED" && s !== "CANCELLED" && s !== "FAILED"
        ? 30000
        : false;
    },
    queryFn: async () => {
      try {
        const res = await trackParcel(trackingId);
        console.log("TRACK RES:", res);
        return toTrackParcel(res?.data?.data ?? res?.data);
      } catch (err) {
        const e = err as { status?: number; response?: { status?: number } };
        if ((e?.status ?? e?.response?.status) === 404) return null;
        throw err;
      }
    },
  });
}

export function useCreateParcel() {
  const queryClient = useQueryClient();

  return useMutation<Parcel, Error, CreateParcelPayload>({
    mutationFn: async (payload) => {
      const res = await createParcel(payload);
      return (res?.data ?? res) as Parcel;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PARCELS_KEY });
    },
  });
}

export function useUpdateParcel() {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, { id: string; data: UpdateParcelPayload }>(
    {
      mutationFn: ({ id, data }) => updateParcel(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: PARCELS_KEY });
      },
    },
  );
}

export function useCancelParcel() {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, string>({
    mutationFn: cancelParcel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PARCELS_KEY });
    },
  });
}
