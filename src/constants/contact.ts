import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";

export const CONTACT_INFO: {
  icon: LucideIcon;
  title: string;
  lines: string[];
  href?: string;
}[] = [
  {
    icon: Phone,
    title: "Call us",
    lines: ["+880 1700-000000"],
    href: "tel:+8801700000000",
  },
  {
    icon: Mail,
    title: "Email us",
    lines: ["support@swiftship.com"],
    href: "mailto:support@swiftship.com",
  },
  {
    icon: MapPin,
    title: "Visit us",
    lines: ["Main Road, Dinajpur", "Rangpur Division, Bangladesh"],
  },
  {
    icon: Clock,
    title: "Working hours",
    lines: ["Sat – Thu: 9:00 AM – 8:00 PM", "Friday: Closed"],
  },
];

export const CONTACT_SUBJECTS = [
  "General question",
  "Booking help",
  "Tracking issue",
  "Pricing and quotes",
  "Business partnership",
  "Complaint or feedback",
];
