"use client";

import { useEffect, useState } from "react";
import RegisterForm from "@/components/form/register-form";
import Logo from "@/components/shared/Logo";
import Link from "next/link";
import Image from "next/image";
import { animate, motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Clock,
  Package,
  ShieldCheck,
  Truck,
  XCircle,
} from "lucide-react";
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

const perks = [
  {
    icon: Package,
    title: "Book in seconds",
    desc: "Create a parcel booking with pickup and drop-off in one form.",
  },
  {
    icon: Clock,
    title: "Live status updates",
    desc: "Track every parcel from pickup to delivery, in real time.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    desc: "Role-based access and encrypted payments on every order.",
  },
];

const stats = [
  { to: 10, suffix: "k+", label: "Deliveries", decimals: 0 },
  { to: 50, suffix: "+", label: "Cities", decimals: 0 },
  { to: 4.9, suffix: "", label: "Avg. rating", decimals: 1 },
];

const STATUS_FLOW = [
  { key: "PENDING", label: "Pending", hint: "Order placed" },
  { key: "APPROVED", label: "Approved", hint: "Booking confirmed" },
  { key: "ASSIGNED", label: "Assigned", hint: "Courier assigned" },
  { key: "PICKED_UP", label: "Picked up", hint: "Parcel collected" },
  { key: "IN_TRANSIT", label: "In transit", hint: "On the way" },
  { key: "DELIVERED", label: "Delivered", hint: "Handed to receiver" },
] as const;

// Off-path statuses (branches)
const STATUS_BRANCHES = [
  { key: "CANCELLED", label: "Cancelled", icon: XCircle },
  { key: "FAILED", label: "Failed", icon: AlertTriangle },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const glass =
  "bg-white/30 ring-1 ring-white/70 backdrop-blur-[6px] shadow-xl shadow-[#0f2a4a]/10";
const tile = "bg-white/40 ring-1 ring-white/70";

const ROW = 30; 
const NODE = 20;

function CountUp({
  to,
  suffix,
  decimals,
}: {
  to: number;
  suffix: string;
  decimals: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, to, {
      duration: 2,
      delay: 0.9,
      ease: "easeOut",
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [to]);

  return (
    <>
      {value.toFixed(decimals)}
      {suffix}
    </>
  );
}

function TrackingTree({ reduce }: { reduce: boolean }) {
  const lastIndex = STATUS_FLOW.length - 1;
  const [active, setActive] = useState(reduce ? 4 : 0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setActive((prev) => (prev >= lastIndex ? 0 : prev + 1));
    }, 1500);
    return () => clearInterval(id);
  }, [reduce, lastIndex]);

  const current = STATUS_FLOW[active];

  return (
    <motion.div
      className={`mt-5 rounded-2xl p-4 ${tile}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1, ease: EASE }}
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[12px] font-semibold text-[#0f2a4a]">
          Parcel #SS-2041
        </p>
        <span className="flex items-center gap-1.5 rounded-full bg-white/70 px-2.5 py-0.5 text-[11px] font-semibold text-[#c2570c]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff7a1a] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff7a1a]" />
          </span>
          {current.key}
        </span>
      </div>

      {/* Tree */}
      <div className="relative">
        {/* Trunk (background) */}
        <div
          className="absolute w-[2px] rounded-full bg-[#0f2a4a]/15"
          style={{
            left: NODE / 2 - 1,
            top: ROW / 2,
            height: lastIndex * ROW,
          }}
        />
        {/* Trunk (progress) */}
        <motion.div
          className="absolute w-[2px] rounded-full bg-gradient-to-b from-[#ff7a1a] to-[#ffb27a]"
          style={{ left: NODE / 2 - 1, top: ROW / 2 }}
          initial={{ height: 0 }}
          animate={{ height: active * ROW }}
          transition={{ duration: reduce ? 0 : 0.6, ease: "easeInOut" }}
        />

        {STATUS_FLOW.map((step, i) => {
          const done = i < active;
          const isActive = i === active;

          return (
            <div
              key={step.key}
              className="relative flex items-center gap-2.5"
              style={{ height: ROW }}
            >
              {/* Node */}
              <motion.div
                className={`relative z-10 flex shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                  done || isActive
                    ? "bg-[#ff7a1a] shadow-lg shadow-[#ff7a1a]/40"
                    : "bg-white/70 ring-1 ring-[#0f2a4a]/20"
                }`}
                style={{ width: NODE, height: NODE }}
                animate={
                  isActive && !reduce ? { scale: [1, 1.15, 1] } : { scale: 1 }
                }
                transition={
                  isActive && !reduce
                    ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.2 }
                }
              >
                {done || (isActive && i === lastIndex) ? (
                  <Check className="h-3 w-3 text-white" />
                ) : isActive ? (
                  <Truck className="h-3 w-3 text-white" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0f2a4a]/30" />
                )}
              </motion.div>

              {/* Branch line */}
              <span
                className={`h-px w-3 shrink-0 transition-colors duration-300 ${
                  done || isActive ? "bg-[#ff7a1a]/70" : "bg-[#0f2a4a]/20"
                }`}
              />

              {/* Label */}
              <div className="flex min-w-0 flex-1 items-baseline justify-between gap-2">
                <p
                  className={`text-[12.5px] font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-[#0f2a4a]"
                      : done
                        ? "text-[#0f2a4a]/80"
                        : "text-[#0f2a4a]/50"
                  }`}
                >
                  {step.label}
                </p>
                <p
                  className={`truncate text-[11px] font-medium transition-opacity duration-300 ${
                    isActive ? "text-[#c2570c] opacity-100" : "opacity-0"
                  }`}
                >
                  {step.hint}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Off-path branches */}
      <div className="mt-2 flex items-center gap-2 border-t border-dashed border-[#0f2a4a]/20 pt-2">
        <span className="text-[10.5px] text-[#475569]">Or</span>
        {STATUS_BRANCHES.map(({ key, label, icon: BranchIcon }) => (
          <span
            key={key}
            className="inline-flex items-center gap-1 rounded-full bg-white/70 px-2 py-0.5 text-[10.5px] font-medium text-[#0f2a4a] ring-1 ring-white/80"
          >
            <BranchIcon className="h-3 w-3 text-[#ff7a1a]" />
            {label}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function RegisterPage() {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={reduce ? { scale: 1 } : { scale: 1.04 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <Image
          src="/currier-man4.jpg"
          alt="Delivery illustration with courier, truck and scooter"
          fill
          priority
          className="object-cover object-center"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Top logo */}
        <motion.div
          className="p-5 sm:p-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div
            className={`inline-flex items-center gap-2.5 rounded-2xl px-4 py-2 ${glass}`}
          >
            <Logo />
          </div>
        </motion.div>

        <div className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center gap-12 px-4 pb-10 sm:px-6 lg:justify-between lg:px-10">
          {/* LEFT: glass panel */}
          <motion.div
            className={`hidden w-full max-w-[500px] flex-col rounded-3xl p-6 lg:flex ${glass}`}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-[12px] font-semibold text-[#0f2a4a] ring-1 ring-white/80">
              <Truck className="h-3.5 w-3.5 text-[#ff7a1a]" />
              Join SwiftShip
            </span>

            <h1 className="mt-3 text-[30px] font-semibold leading-[1.15] text-[#0f2a4a]">
              Book, track, and manage{" "}
              <span className="bg-gradient-to-r from-[#ff7a1a] to-[#e8590c] bg-clip-text text-transparent">
                every delivery
              </span>{" "}
              from one dashboard.
            </h1>

            {/* Stats */}
            <div className="mt-5 flex gap-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-[22px] font-semibold text-[#0f2a4a]">
                    <CountUp
                      to={s.to}
                      suffix={s.suffix}
                      decimals={s.decimals}
                    />
                  </p>
                  <p className="text-[12px] text-[#475569]">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Perks (compact tiles) */}
            <div className="mt-5 grid grid-cols-3 gap-2.5">
              {perks.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  title={desc}
                  className={`flex flex-col items-center gap-2 rounded-2xl px-2 py-3 text-center ${tile}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + i * 0.12,
                    ease: EASE,
                  }}
                  whileHover={reduce ? undefined : { y: -3 }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff7a1a] shadow-lg shadow-[#ff7a1a]/30">
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-[12px] font-semibold leading-tight text-[#0f2a4a]">
                    {title}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Parcel status tree */}
            <TrackingTree reduce={reduce} />
          </motion.div>

          {/* RIGHT: form card */}
          <div className="relative w-full max-w-[420px]">
            {/* Floating chips (big screens only) */}
            <motion.div
              className="absolute -left-16 top-10 z-20 hidden items-center gap-2 rounded-xl bg-white px-3 py-2 text-[12px] font-medium text-[#0f2a4a] shadow-xl xl:flex"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                reduce
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 1, scale: 1, y: [0, -8, 0] }
              }
              transition={{
                opacity: { delay: 1.2, duration: 0.5 },
                scale: { delay: 1.2, duration: 0.5 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Parcel delivered
            </motion.div>

            <motion.div
              className="absolute -right-10 bottom-24 z-20 hidden items-center gap-2 rounded-xl bg-[#0f2a4a] px-3 py-2 text-[12px] font-medium text-white shadow-xl ring-1 ring-white/20 xl:flex"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                reduce
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 1, scale: 1, y: [0, 8, 0] }
              }
              transition={{
                opacity: { delay: 1.5, duration: 0.5 },
                scale: { delay: 1.5, duration: 0.5 },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <Truck className="h-4 w-4 text-[#ff7a1a]" />
              Courier on the way
            </motion.div>

            {/* Transparent glass form card */}
            <motion.div
              className="relative overflow-hidden rounded-2xl bg-white/35 p-8 shadow-xl shadow-[#0f2a4a]/10 ring-1 ring-white/80 backdrop-blur-[6px] sm:p-9"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            >
              {/* Top accent line */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0f2a4a] via-[#ff7a1a] to-[#ffb27a]" />

              {/* Mobile-only heading */}
              <p className="mb-5 text-[13px] font-medium text-[#334155] lg:hidden">
                Book, track, and manage every delivery from one dashboard.
              </p>

              <RegisterForm />
            </motion.div>
          </div>
        </div>

        {/* Bottom social + contact */}
        <motion.div
          className="flex justify-center px-4 pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className={`rounded-2xl px-6 py-4 ${glass}`}>
            <div className="mb-3 flex justify-center gap-5">
              {socialIcons.map(({ name, Icon }) => (
                <Link
                  key={name}
                  href="#"
                  aria-label={name}
                  className="text-[#0f2a4a]/70 transition hover:-translate-y-0.5 hover:text-[#ff7a1a]"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </Link>
              ))}
            </div>

            <div className="flex flex-col items-center gap-1.5 text-[12px] text-[#334155] sm:flex-row sm:justify-center sm:gap-6">
              <div className="flex items-center gap-1.5">
                <HiOutlinePhone className="h-3.5 w-3.5" />
                <span>+880 1700-000000</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HiOutlineMail className="h-3.5 w-3.5" />
                <span>support@swiftship.com</span>
              </div>
            </div>

            <p className="mt-2 text-center text-[11px] text-[#475569]">
              Copyright © {new Date().getFullYear()} SwiftShip. All rights
              reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
