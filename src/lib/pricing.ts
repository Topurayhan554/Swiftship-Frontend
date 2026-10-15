import {
  INTL_RATES,
  SERVICE_RATES,
  type ServiceKey,
} from "@/constants/pricing";

export function estimatePrice(
  service: ServiceKey,
  weightKg: number,
  country?: string,
): number {
  if (service === "international") {
    const intl = INTL_RATES.find((r) => r.country === country) ?? INTL_RATES[0];
    return intl.from + SERVICE_RATES.international.perKg * weightKg;
  }

  const rate = SERVICE_RATES[service];
  return rate.base + rate.perKg * weightKg;
}
