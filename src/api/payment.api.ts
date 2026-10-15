import apiClient from "@/lib/apiClient";

export type PaymentMethod = "bkash" | "stripe";

const PAYMENT_ENDPOINTS: Record<PaymentMethod, string> = {
  bkash: "/parcels/payment/initiate",
  stripe: "/parcels/payment/initiate-stripe",
};

const URL_KEYS = [
  "paymentUrl",
  "bkashURL",
  "bkashUrl",
  "redirectUrl",
  "checkoutUrl",
  "sessionUrl",
  "url",
] as const;

export async function initiatePayment(
  parcelId: string,
  method: PaymentMethod,
): Promise<string> {
  const res = await apiClient(PAYMENT_ENDPOINTS[method], {
    method: "POST",
    body: { parcelId },
  });

  const d = (res?.data?.data ?? res?.data ?? {}) as Record<string, unknown>;

  for (const key of URL_KEYS) {
    const value = d[key];
    if (typeof value === "string" && value) return value;
  }

  throw new Error("Payment URL not found in response");
}
