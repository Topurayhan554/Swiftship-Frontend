import apiClient from "@/lib/apiClient";
import type { CreateParcelPayload, UpdateParcelPayload } from "@/types";

export function createParcel(payload: CreateParcelPayload) {
  return apiClient("/parcels", {
    method: "POST",
    body: payload,
  });
}

export function getMyParcels() {
  return apiClient("/parcels");
}

export function updateParcel(id: string, payload: UpdateParcelPayload) {
  return apiClient(`/parcels/${id}`, {
    method: "PATCH",
    body: payload,
  });
}

export function cancelParcel(id: string) {
  return apiClient(`/parcels/${id}/cancel`, {
    method: "PATCH",
  });
}

export function trackParcel(trackingId: string) {
  return apiClient(`/parcels/track/${encodeURIComponent(trackingId)}`);
}
