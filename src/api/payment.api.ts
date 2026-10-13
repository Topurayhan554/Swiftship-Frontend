import apiClient from "@/lib/apiClient";

// /parcels/payment/initiate
export async function initiatePayment(parcelId: string): Promise<string> {
  const res = await apiClient("/parcels/payment/initiate", {
    method: "POST",
    body: { parcelId },
  });

  const d = (res?.data?.data ?? res?.data ?? {}) as Record<string, unknown>;
  const url =
    d.paymentUrl ??
    d.bkashURL ??
    d.bkashUrl ??
    d.redirectUrl ??
    d.checkoutUrl ??
    d.url;

  if (typeof url !== "string" || !url) {
    throw new Error("Payment URL not found in response");
  }
  return url;
}
