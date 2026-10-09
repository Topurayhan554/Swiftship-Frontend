import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { FOOTER_QUICK_LINKS, FOOTER_SERVICES } from "@/constants/home";
import NewsletterForm from "../home/NewsletterForm";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const SOCIALS = [
  { icon: FaFacebook, label: "Facebook", href: "https://facebook.com" },
  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
  { icon: FaTwitter, label: "X (Twitter)", href: "https://x.com" },
  { icon: FaLinkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: FaYoutube, label: "YouTube", href: "https://youtube.com" },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f2a4a]";

const linkClass = `rounded-sm text-sm text-white/70 transition-colors hover:text-[#ff7a1a] hover:underline underline-offset-4 ${focusRing}`;

export default function Footer() {
  return (
    <footer className="bg-[#0f2a4a] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        <div>
          <Link
            href="/"
            aria-label="SwiftShip home"
            className={`inline-flex items-center gap-3 rounded-lg ${focusRing}`}
          >
            <span className="rounded-xl bg-white p-1.5">
              <Logo asLink={false} className="h-9 w-9" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-xl font-bold tracking-tight">
                SwiftShip
              </span>
              <span className="mt-1 text-[10px] text-white/60">
                Delivering Your World
              </span>
            </span>
          </Link>
          <p className="mt-4 max-w-[260px] text-sm leading-relaxed text-white/70">
            Fast, safe and reliable delivery services for individuals and
            businesses worldwide.
          </p>
          <ul className="mt-5 flex gap-3">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  className={`flex size-9 items-center justify-center rounded-full text-white/75 transition-colors hover:bg-white/10 hover:text-[#ff7a1a] ${focusRing}`}
                >
                  <Icon aria-hidden="true" className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-labelledby="footer-quick-links">
          <h2 id="footer-quick-links" className="text-sm font-semibold">
            Quick Links
          </h2>
          <ul className="mt-4 space-y-2.5">
            {FOOTER_QUICK_LINKS.map(({ href, label }) => (
              <li key={label}>
                <Link href={href} className={linkClass}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-services">
          <h2 id="footer-services" className="text-sm font-semibold">
            Services
          </h2>
          <ul className="mt-4 space-y-2.5">
            {FOOTER_SERVICES.map(({ href, label }) => (
              <li key={label}>
                <Link href={href} className={linkClass}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section aria-labelledby="footer-newsletter">
          <h2 id="footer-newsletter" className="text-sm font-semibold">
            Subscribe to our newsletter
          </h2>
          <p className="mt-1.5 text-sm text-white/70">
            Get the latest updates, offers and news.
          </p>
          <NewsletterForm />
        </section>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/60 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} SwiftShip. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex gap-6">
            <Link href="/privacy" className={linkClass}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={linkClass}>
              Terms &amp; Conditions
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
