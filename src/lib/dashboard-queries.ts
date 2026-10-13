import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createParcel, getMyParcels } from "@/api";
import { mapParcel } from "@/lib/dashboard";
import type { CreateParcelPayload, Parcel } from "@/types";

export const PARCELS_KEY = ["my-parcels"];

export function useMyParcels() {
  return useQuery<Parcel[]>({
    queryKey: PARCELS_KEY,
    queryFn: async () => {
      const res = await getMyParcels();
      const list = res?.data?.data ?? res?.data ?? [];
      return (Array.isArray(list) ? list : []).map(mapParcel);
    },
  });
}

export function useCreateParcel() {
  const queryClient = useQueryClient();

  return useMutation<Parcel, Error, CreateParcelPayload>({
    mutationFn: async (payload) => {
      const res = await createParcel(payload);
      return mapParcel(res?.data ?? res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PARCELS_KEY });
    },
  });
}
