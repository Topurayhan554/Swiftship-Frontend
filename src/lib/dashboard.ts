import {
  SERVICE_RATES,
  INTL_RATES,
  type ServiceKey,
} from "@/constants/pricing";
import type { ParcelStatus } from "@/constants/track";

export type DashboardParcel = {
  id: string;
  trackingId: string;
  receiverName: string;
  receiverPhone: string;
  from: string;
  to: string;
  service: ServiceKey;
  weight: number;
  price: number;
  status: ParcelStatus;
  paymentStatus: "PAID" | "UNPAID";
  createdAt: string;
};

export type BookingInput = {
  service: ServiceKey;
  country?: string;
  pickup: string;
  delivery: string;
  receiverName: string;
  receiverPhone: string;
  weight: number;
  description: string;
  notes?: string;
};

export function estimatePrice(
  service: ServiceKey,
  weight: number,
  country?: string,
) {
  const rate = SERVICE_RATES[service];
  const intl = INTL_RATES.find((r) => r.country === country) ?? INTL_RATES[0];
  const base = service === "international" ? intl.from : rate.base;
  return Math.round((base + rate.perKg * weight) * 100) / 100;
}

const daysAgo = (n: number) =>
  new Date(Date.now() - n * 86_400_000).toISOString();
let MOCK: DashboardParcel[] = [
  {
    id: "1",
    trackingId: "SS-2041",
    receiverName: "Rahim Uddin",
    receiverPhone: "+8801711000001",
    from: "Dinajpur",
    to: "Dhaka",
    service: "parcel",
    weight: 2.5,
    price: 10.99,
    status: "IN_TRANSIT",
    paymentStatus: "PAID",
    createdAt: daysAgo(1),
  },
  {
    id: "2",
    trackingId: "SS-2038",
    receiverName: "Nusrat Jahan",
    receiverPhone: "+8801711000002",
    from: "Dinajpur",
    to: "Rangpur",
    service: "express",
    weight: 1,
    price: 16.99,
    status: "DELIVERED",
    paymentStatus: "PAID",
    createdAt: daysAgo(3),
  },
  {
    id: "3",
    trackingId: "SS-2031",
    receiverName: "Karim Hossain",
    receiverPhone: "+8801711000003",
    from: "Dinajpur",
    to: "Chattogram",
    service: "document",
    weight: 0.5,
    price: 5.24,
    status: "PENDING",
    paymentStatus: "UNPAID",
    createdAt: daysAgo(4),
  },
  {
    id: "4",
    trackingId: "SS-2019",
    receiverName: "Sadia Akter",
    receiverPhone: "+8801711000004",
    from: "Dinajpur",
    to: "Sylhet",
    service: "parcel",
    weight: 4,
    price: 12.79,
    status: "DELIVERED",
    paymentStatus: "PAID",
    createdAt: daysAgo(9),
  },
  {
    id: "5",
    trackingId: "SS-2007",
    receiverName: "Tanvir Ahmed",
    receiverPhone: "+8801711000005",
    from: "Dinajpur",
    to: "Khulna",
    service: "parcel",
    weight: 3,
    price: 11.59,
    status: "CANCELLED",
    paymentStatus: "UNPAID",
    createdAt: daysAgo(14),
  },
  {
    id: "6",
    trackingId: "SS-1994",
    receiverName: "Mitu Rani",
    receiverPhone: "+8801711000006",
    from: "Dinajpur",
    to: "Dhaka",
    service: "express",
    weight: 2,
    price: 18.99,
    status: "PICKED_UP",
    paymentStatus: "PAID",
    createdAt: daysAgo(0),
  },
];

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getMyParcels(): Promise<DashboardParcel[]> {
  await wait(700);
  return [...MOCK].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createParcel(
  input: BookingInput,
): Promise<DashboardParcel> {
  await wait(900);
  const parcel: DashboardParcel = {
    id: String(Date.now()),
    trackingId: `SS-${Math.floor(1000 + Math.random() * 9000)}`,
    receiverName: input.receiverName,
    receiverPhone: input.receiverPhone,
    from: input.pickup,
    to:
      input.service === "international" && input.country
        ? input.country
        : input.delivery,
    service: input.service,
    weight: input.weight,
    price: estimatePrice(input.service, input.weight, input.country),
    status: "PENDING",
    paymentStatus: "UNPAID",
    createdAt: new Date().toISOString(),
  };
  MOCK = [parcel, ...MOCK];
  return parcel;
}
