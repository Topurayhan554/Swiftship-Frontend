import VerifyAccountForm from "@/components/form/verify-account-form";
import Logo from "@/components/shared/Logo";
import { Suspense } from "react";
import { VerifyFormSkeleton } from "./verify-form-skeleton";

export default function VerifyAccountPage() {
  return (
    <div className="min-h-screen w-full bg-[#f7f9fc] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, #0f2a4a 1.5px, transparent 1.5px)`,
          backgroundSize: "26px 26px",
        }}
      />

      {/* Logo */}
      <div className="absolute top-6 left-6 z-10 flex items-center gap-2.5">
        <Logo />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="flex w-full max-w-md flex-col items-center">
          {/* Form Card */}
          <div className="w-full rounded-2xl bg-white p-9 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#ff7a1a]/10">
                <span className="text-[22px]">📦</span>
              </div>
              <h1 className="text-2xl font-bold text-[#0f172a]">
                Verify Your Account
              </h1>
              <p className="mt-1 text-sm text-[#94a3b8]">
                Enter the OTP sent to your email to start booking parcels
              </p>
            </div>

            <Suspense fallback={<VerifyFormSkeleton />}>
              <VerifyAccountForm />
            </Suspense>
          </div>

          {/* Copyright */}
          <p className="mt-8 text-center text-[11px] text-[#94a3b8]">
            Copyright © {new Date().getFullYear()} SwiftShip. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
