import {
  FileText,
  Globe2,
  Headphones,
  MapPin,
  Package,
  ShieldCheck,
  Timer,
  Truck,
  type LucideIcon,
} from "lucide-react";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/track", label: "Track Parcel" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
type Feature = { icon: LucideIcon; title: string; text: string };

export const FEATURES: Feature[] = [
  { icon: Truck, title: "Fast Delivery", text: "Get your package on time" },
  {
    icon: ShieldCheck,
    title: "Secure & Safe",
    text: "Your items are fully protected",
  },
  {
    icon: MapPin,
    title: "Real-Time Tracking",
    text: "Track your package every step",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    text: "We're always here to help",
  },
];

export const SERVICES = [
  {
    icon: FileText,
    title: "Document Delivery",
    text: "Important documents, delivered safely.",
    image: "/document.jpg",
    href: "/services#document",
  },
  {
    icon: Package,
    title: "Parcel Delivery",
    text: "Small or large parcels, we deliver it all.",
    image: "/parcel.jpg",
    href: "/services#parcel",
  },
  {
    icon: Timer,
    title: "Express Delivery",
    text: "When it's urgent, we go faster.",
    image: "/express.jpg",
    href: "/services#express",
  },
  {
    icon: Globe2,
    title: "International Delivery",
    text: "Global shipping to 200+ countries.",
    image: "/international.jpg",
    href: "/services#international",
  },
];

export const DESTINATIONS = [
  { city: "Dhaka", price: "৳60", image: "/dhaka.jpg" },
  {
    city: "Chattogram",
    price: "৳100",
    image: "/chattogram.jpg",
  },
  { city: "Sylhet", price: "৳120", image: "/sylhet.jpg" },
  {
    city: "Rajshahi",
    price: "৳110",
    image: "/rajshahi.jpg",
  },
  { city: "Khulna", price: "৳110", image: "/khulna.jpg" },
];

export const FOOTER_QUICK_LINKS = NAV_LINKS.map(({ href, label }) => ({
  href,
  label,
}));

export const FOOTER_SERVICES = SERVICES.map(({ href, title }) => ({
  href,
  label: title,
}));
