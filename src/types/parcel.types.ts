export type ParcelStatus =
  | "PENDING"
  | "APPROVED"
  | "ASSIGNED"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "CANCELLED"
  | "FAILED";
export type ParcelType =
  | "DOCUMENT"
  | "PACKAGE"
  | "FRAGILE"
  | "ELECTRONICS"
  | "OTHER";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";
export type PaymentGateway = "STRIPE" | "BKASH";

export type ParcelPayment = {
  id: string;
  status: PaymentStatus;
  gateway: PaymentGateway;
  amount: number;
  paidAt: string | null;
};

export type Parcel = {
  id: string;
  trackingId: string;
  parcelType: ParcelType;
  description: string | null;
  weightKg: number;
  fee: number;
  pickupAddress: string;
  deliveryAddress: string;
  receiverName: string;
  receiverPhone: string;
  status: ParcelStatus;
  estimatedDelivery: string | null;
  actualDelivery: string | null;
  createdAt: string;
  payment: ParcelPayment | null;
};

export type CreateParcelPayload = {
  parcelType: ParcelType;
  weightKg: number;
  pickupAddress: string;
  pickupLat?: number;
  pickupLng?: number;
  deliveryAddress: string;
  deliveryLat?: number;
  deliveryLng?: number;
  receiverName: string;
  receiverPhone: string;
  description?: string;
};

export type UpdateParcelPayload = Partial<{
  description: string;
  pickupAddress: string;
  deliveryAddress: string;
  receiverName: string;
  receiverPhone: string;
}>;
