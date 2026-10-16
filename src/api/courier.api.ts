import apiClient from "@/lib/apiClient";
import type { ParcelStatus } from "@/constants/track";

export function getCourierParcels() {
  return apiClient("/parcels?limit=100");
}

export function updateParcelStatus(
  id: string,
  payload: { status: ParcelStatus; note?: string },
) {
  return apiClient(`/parcels/${id}/status`, {
    method: "PATCH",
    body: payload,
  });
}
