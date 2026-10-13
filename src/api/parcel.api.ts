import apiClient from "@/lib/apiClient";
import type { CreateParcelPayload, UpdateParcelPayload } from "@/types";

const PARCEL_TYPE_MAP: Record<string, string> = {
  document: "DOCUMENT",
  parcel: "PACKAGE",
  fragile: "FRAGILE",
  electronics: "ELECTRONICS",
};

export function createParcel(payload: CreateParcelPayload) {
  const body = {
    parcelType: PARCEL_TYPE_MAP[payload.service] ?? "PACKAGE",
    description: payload.description,
    weightKg: payload.weight,
    pickupAddress: payload.pickup,
    deliveryAddress: payload.delivery,
    receiverName: payload.receiverName,
    receiverPhone: payload.receiverPhone,
  };

  return apiClient("/parcels", {
    method: "POST",
    body,
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
