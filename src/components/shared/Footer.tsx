import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import Logo from "@/components/shared/Logo";

const SOCIALS = [
  { name: "Facebook", Icon: FaFacebookF },
  { name: "Instagram", Icon: FaInstagram },
  { name: "LinkedIn", Icon: FaLinkedinIn },
  { name: "Twitter", Icon: FaTwitter },
];

const FOOTER_LINKS = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/track", label: "Track Parcel" },
      { href: "/register", label: "Become a Courier" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy Policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#e2e8f0] bg-[#0f2a4a] text-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Logo className="h-10 w-10" />
            <p className="mt-3 max-w-[260px] text-sm text-white/70">
              Fast, reliable courier and logistics management for everyone.
            </p>

            <div className="mt-5 flex gap-3">
              {SOCIALS.map(({ name, Icon }) => (
                <Link
                  key={name}
                  href="#"
                  aria-label={name}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-[#ff7a1a] hover:text-white"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h4 className="mb-4 text-sm font-semibold text-white">
                {group.title}
              </h4>
              <ul className="space-y-2.5 text-sm text-white/70">
                {group.links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="transition hover:text-[#ff7a1a]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
            <span className="flex items-center gap-2">
              <HiOutlinePhone className="size-4" /> +880 1700-000000
            </span>
            <span className="flex items-center gap-2">
              <HiOutlineMail className="size-4" /> support@swiftship.com
            </span>
          </div>
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} SwiftShip. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
