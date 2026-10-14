import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cancelParcel, createParcel, getMyParcels, updateParcel } from "@/api";
import { mapParcel, type RawParcel } from "@/lib/dashboard";
import type { CreateParcelPayload, Parcel, UpdateParcelPayload } from "@/types";

export const PARCELS_KEY = ["my-parcels"];

export function useMyParcels() {
  return useQuery<Parcel[]>({
    queryKey: PARCELS_KEY,
    queryFn: async () => {
      const res = await getMyParcels();
      const list = res?.data?.data ?? res?.data ?? [];
      return (Array.isArray(list) ? list : []).map((p: RawParcel) =>
        mapParcel(p),
      );
    },
  });
}

export function useCreateParcel() {
  const queryClient = useQueryClient();

  return useMutation<Parcel, Error, CreateParcelPayload>({
    mutationFn: async (payload) => {
      const res = await createParcel(payload);
      return mapParcel((res?.data ?? res) as RawParcel);
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
