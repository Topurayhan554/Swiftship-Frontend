import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ParcelStatus } from "@/constants/track";
import { getCourierParcels, updateParcelStatus } from "@/api";

export type CourierParcel = {
  id: string;
  trackingId: string;
  status: ParcelStatus;
  parcelType: string;
  weightKg: number;
  pickupAddress: string;
  deliveryAddress: string;
  receiverName: string;
  receiverPhone: string;
};

export const COURIER_PARCELS_KEY = ["courier-parcels"];

export function useCourierParcels() {
  return useQuery<CourierParcel[]>({
    queryKey: COURIER_PARCELS_KEY,
    staleTime: 0,
    refetchOnMount: "always",
    queryFn: async () => {
      const res = await getCourierParcels();
      const list = res?.data?.data ?? res?.data ?? [];
      return Array.isArray(list) ? (list as CourierParcel[]) : [];
    },
  });
}

export function useUpdateParcelStatus() {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    Error,
    { id: string; status: ParcelStatus; note?: string }
  >({
    mutationFn: ({ id, ...payload }) => updateParcelStatus(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURIER_PARCELS_KEY });
      queryClient.invalidateQueries({ queryKey: ["track"] });
    },
  });
}
