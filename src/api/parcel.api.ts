import apiClient from "@/lib/apiClient";
import type { CreateParcelPayload } from "@/types";

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
