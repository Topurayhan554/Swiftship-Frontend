import {
  ClipboardList,
  FileText,
  Globe2,
  MapPin,
  Package,
  PackageCheck,
  Timer,
  Truck,
  type LucideIcon,
} from "lucide-react";

export type ServiceDetail = {
  id: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  time: string;
  from: string;
  image: string;
};

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    id: "document",
    icon: FileText,
    title: "Document Delivery",
    tagline: "Important papers, handled with care",
    description:
      "Contracts, certificates, legal papers and more. Every document is sealed, tracked and handed over only to the named receiver.",
    features: [
      "Sealed, tamper-evident packaging",
      "Receiver verification on handover",
      "Same-day city delivery",
      "Live tracking from pickup to drop",
    ],
    time: "Same day – 24 hrs",
    from: "$4.99",
    image: "/images/services/document1.jpg",
  },
  {
    id: "parcel",
    icon: Package,
    title: "Parcel Delivery",
    tagline: "Small or large, we carry it all",
    description:
      "From a single gift box to bulk orders for your shop, we pick up from your door and deliver safely to any address in the country.",
    features: [
      "Door-to-door pickup and drop",
      "Packages up to 30 kg",
      "Cash on delivery available",
      "Fragile item handling",
    ],
    time: "1 – 3 days",
    from: "$7.99",
    image: "/images/services/parcel.jpg",
  },
  {
    id: "express",
    icon: Timer,
    title: "Express Delivery",
    tagline: "When it's urgent, we go faster",
    description:
      "A dedicated courier takes your parcel straight to its destination with no stops in between. Perfect for last-minute and time-critical orders.",
    features: [
      "Dedicated courier, direct route",
      "Priority pickup within 1 hour",
      "Real-time location updates",
      "Delivery-time guarantee",
    ],
    time: "Within 4 hrs",
    from: "$14.99",
    image: "/images/services/express1.jpg",
  },
  {
    id: "international",
    icon: Globe2,
    title: "International Delivery",
    tagline: "Global shipping to 200+ countries",
    description:
      "We handle customs paperwork and partner with trusted carriers worldwide, so your parcel crosses borders without the hassle.",
    features: [
      "Customs documentation support",
      "200+ countries covered",
      "Insurance on every shipment",
      "End-to-end international tracking",
    ],
    time: "3 – 7 days",
    from: "$12.99",
    image: "/images/services/international.jpg",
  },
];

export const PROCESS_STEPS: {
  icon: LucideIcon;
  title: string;
  text: string;
}[] = [
  {
    icon: ClipboardList,
    title: "Book online",
    text: "Enter pickup and drop-off details and choose a service.",
  },
  {
    icon: Truck,
    title: "We pick it up",
    text: "A courier collects the parcel from your door.",
  },
  {
    icon: MapPin,
    title: "Track it live",
    text: "Follow every step of the journey in real time.",
  },
  {
    icon: PackageCheck,
    title: "Safely delivered",
    text: "The receiver gets it and you get a confirmation.",
  },
];

export const FAQS = [
  {
    q: "How do I book a delivery?",
    a: "Create a free account, enter the pickup and drop-off addresses, choose a service and confirm. A courier is assigned shortly after your booking is approved.",
  },
  {
    q: "How can I track my parcel?",
    a: "Use your tracking ID on the Tracking page, or open your dashboard. Status updates move from Pending through Approved, Assigned, Picked up and In transit to Delivered.",
  },
  {
    q: "What if my parcel is cancelled or delivery fails?",
    a: "You will see the Cancelled or Failed status on your tracking page. Contact support and we will help you rebook or arrange a return.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "You can pay online by card or mobile wallet, and cash on delivery is available for parcel deliveries.",
  },
  {
    q: "Can businesses ship in bulk?",
    a: "Yes. Register as a customer and book multiple parcels from one dashboard, or contact us for a business plan with discounted rates.",
  },
];
