"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createParcel, getMyParcels, type BookingInput } from "./dashboard";

export function useMyParcels() {
  return useQuery({ queryKey: ["my-parcels"], queryFn: getMyParcels });
}

export function useCreateParcel() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: BookingInput) => createParcel(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["my-parcels"] }),
  });
}
