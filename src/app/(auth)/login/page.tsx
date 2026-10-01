import LoginForm from "@/components/form/login-form";
import Logo from "@/components/shared/Logo";
import Link from "next/link";
import { Package, MapPin, Truck } from "lucide-react";
import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";
import { HiOutlinePhone, HiOutlineMail } from "react-icons/hi";

const socialIcons = [
  { name: "linkedin", Icon: FaLinkedinIn },
  { name: "instagram", Icon: FaInstagram },
  { name: "facebook", Icon: FaFacebookF },
  { name: "twitter", Icon: FaTwitter },
];

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="flex w-full max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-2xl">
          {/*  LEFT PANEL — Courier / tracking theme  */}
          <div className="relative hidden lg:flex lg:w-[55%] flex-col overflow-hidden bg-gradient-to-br from-[#0f2a4a] via-[#143a63] to-[#ff7a1a] lg:flex">
            {/* Curved right edge */}
            <div className="absolute right-0 top-0 z-20 h-full w-20">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="h-full w-full fill-[#f7f9fc]"
              >
                <path d="M100 0 H45 C20 10 20 25 40 35 C65 45 75 55 60 70 C40 85 20 85 45 100 H100 Z" />
              </svg>
            </div>

            {/* Logo */}
            <div className="relative z-10 flex items-center gap-2.5 p-8 pb-4">
              <Logo />
            </div>

            {/* Dotted "route map" pattern */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: `radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)`,
                backgroundSize: "26px 26px",
              }}
            />

            {/* Dashed delivery route line */}
            <svg
              className="absolute left-10 top-1/4 z-0 h-[55%] w-[70%] opacity-40"
              viewBox="0 0 300 300"
              fill="none"
            >
              <path
                d="M20 260 C 80 220, 60 140, 140 120 S 260 60, 280 20"
                stroke="white"
                strokeWidth="3"
                strokeDasharray="2 14"
                strokeLinecap="round"
              />
            </svg>

            {/* Center content: tracking card illustration */}
            <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8">
              <div className="relative w-full max-w-[320px] rounded-2xl bg-white/10 p-6 backdrop-blur-sm ring-1 ring-white/20">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#ff7a1a] px-3 py-1 text-[11px] font-semibold text-white">
                    In Transit
                  </span>
                  <span className="text-[11px] text-white/60">#SW-28471</span>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ff7a1a]">
                    <Truck className="h-5 w-5 text-white" />
                  </div>
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-[#ff7a1a] to-white/20" />
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 text-white/80">
                  <Package className="h-4 w-4" />
                  <p className="text-[13px]">
                    Your parcel is on the way — ETA 2h 15m
                  </p>
                </div>
              </div>

              <h2 className="mt-8 text-center text-xl font-semibold text-white">
                Deliver Smarter, Track Faster
              </h2>
              <p className="mt-2 max-w-[280px] text-center text-[13px] text-white/70">
                One platform for bookings, live tracking, and payments.
              </p>
            </div>

            {/* Copyright */}
            <p className="relative z-10 pb-6 text-center text-[11px] text-white/70">
              Copyright © {new Date().getFullYear()} SwiftShip. All rights
              reserved.
            </p>
          </div>

          {/*  RIGHT PANEL  */}
          <div className="flex w-full flex-col bg-[#f7f9fc] lg:w-[45%]">
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 sm:px-12">
              {/* Form Card */}
              <div className="w-full max-w-[340px] rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                {/* Tabs */}
                <div className="mb-7 flex items-center gap-6">
                  <Link
                    href="/register"
                    className="pb-2 text-[15px] font-medium text-[#94a3b8] transition hover:text-[#64748b]"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/login"
                    className="relative pb-2 text-[15px] font-semibold text-[#0f2a4a]"
                  >
                    Sign In
                    <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#ff7a1a]" />
                  </Link>
                </div>

                <LoginForm />
              </div>
            </div>

            {/* Bottom social + contact */}
            <div className="pb-8 pt-2">
              <div className="mb-5 flex justify-center gap-5">
                {socialIcons.map(({ name, Icon }) => (
                  <Link
                    key={name}
                    href="#"
                    className="text-[#94a3b8] transition hover:text-[#ff7a1a]"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </Link>
                ))}
              </div>

              <div className="flex flex-col items-center gap-1.5 text-[12px] text-[#94a3b8] sm:flex-row sm:justify-center sm:gap-6">
                <div className="flex items-center gap-1.5">
                  <HiOutlinePhone className="h-3.5 w-3.5" />
                  <span>+880 1700-000000</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HiOutlineMail className="h-3.5 w-3.5" />
                  <span>support@swiftship.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
