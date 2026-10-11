import { Eye, Heart, ShieldCheck, Zap, type LucideIcon } from "lucide-react";

export const ABOUT_STATS = [
  { to: 10, suffix: "k+", label: "Deliveries", decimals: 0 },
  { to: 50, suffix: "+", label: "Cities", decimals: 0 },
  { to: 4.9, suffix: "", label: "Average rating", decimals: 1 },
  { to: 200, suffix: "+", label: "Countries reached", decimals: 0 },
];

export const ABOUT_VALUES: { icon: LucideIcon; title: string; text: string }[] =
  [
    {
      icon: Zap,
      title: "Speed",
      text: "We move fast so your parcel arrives when it matters.",
    },
    {
      icon: ShieldCheck,
      title: "Safety",
      text: "Every parcel is handled with care and fully protected.",
    },
    {
      icon: Eye,
      title: "Transparency",
      text: "Clear prices and live tracking, with no hidden surprises.",
    },
    {
      icon: Heart,
      title: "Care",
      text: "Real people who treat every delivery like it is their own.",
    },
  ];

export const ABOUT_HIGHLIGHTS = [
  "Door-to-door pickup and delivery",
  "Live tracking from booking to handover",
  "Local couriers who know the streets",
  "Support that answers when you need it",
];

export const TEAM = [
  { name: "Full Name", role: "Founder & CEO" },
  { name: "Full Name", role: "Head of Operations" },
  { name: "Full Name", role: "Customer Support Lead" },
  { name: "Full Name", role: "Lead Courier" },
];
