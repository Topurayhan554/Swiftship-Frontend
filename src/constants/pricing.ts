import {
  FileText,
  Globe2,
  Package,
  Timer,
  type LucideIcon,
} from "lucide-react";

export type ServiceKey = "document" | "parcel" | "express" | "international";

export const SERVICE_RATES: Record<
  ServiceKey,
  {
    label: string;
    icon: LucideIcon;
    base: number;
    perKg: number;
    maxKg: number;
    time: string;
  }
> = {
  document: {
    label: "Document",
    icon: FileText,
    base: 4.99,
    perKg: 0.5,
    maxKg: 2,
    time: "Same day – 24 hrs",
  },
  parcel: {
    label: "Parcel",
    icon: Package,
    base: 7.99,
    perKg: 1.2,
    maxKg: 30,
    time: "1 – 3 days",
  },
  express: {
    label: "Express",
    icon: Timer,
    base: 14.99,
    perKg: 2,
    maxKg: 20,
    time: "Within 4 hrs",
  },
  international: {
    label: "International",
    icon: Globe2,
    base: 0,
    perKg: 3.5,
    maxKg: 30,
    time: "3 – 7 days",
  },
};

export const INTL_RATES = [
  { country: "USA", from: 12.99, days: "4 – 7 days" },
  { country: "UK", from: 14.99, days: "3 – 6 days" },
  { country: "Canada", from: 13.99, days: "4 – 7 days" },
  { country: "France", from: 16.99, days: "3 – 5 days" },
  { country: "Germany", from: 15.99, days: "3 – 5 days" },
  { country: "Australia", from: 18.99, days: "5 – 8 days" },
  { country: "UAE", from: 11.99, days: "2 – 4 days" },
  { country: "Japan", from: 17.99, days: "4 – 6 days" },
];

export const PRICING_PLANS = [
  {
    id: "document",
    name: "Document",
    from: "$4.99",
    unit: "per document",
    time: "Same day – 24 hrs",
    popular: false,
    features: [
      "Sealed packaging",
      "Receiver verification",
      "Live tracking",
      "Up to 2 kg",
    ],
  },
  {
    id: "parcel",
    name: "Parcel",
    from: "$7.99",
    unit: "per parcel",
    time: "1 – 3 days",
    popular: true,
    features: [
      "Door-to-door pickup",
      "Cash on delivery",
      "Fragile handling",
      "Up to 30 kg",
    ],
  },
  {
    id: "express",
    name: "Express",
    from: "$14.99",
    unit: "per parcel",
    time: "Within 4 hrs",
    popular: false,
    features: [
      "Dedicated courier",
      "Priority pickup in 1 hr",
      "Real-time location",
      "Delivery guarantee",
    ],
  },
];
