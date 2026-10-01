export function VerifyFormSkeleton() {
  return (
    <div
      className="w-full animate-pulse space-y-6"
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading verification form...</span>

      {/* Tabs / heading */}
      <div className="space-y-2">
        <div className="h-6 w-2/3 rounded-md bg-[#e2e8f0]" />
        <div className="h-[3px] w-12 rounded-full bg-[#ff7a1a]/30" />
      </div>

      {/* Description + email */}
      <div className="space-y-2">
        <div className="h-3.5 w-full rounded bg-[#e2e8f0]" />
        <div className="h-3.5 w-4/5 rounded bg-[#e2e8f0]" />
        <div className="h-3.5 w-1/2 rounded bg-[#e2e8f0]" />
      </div>

      {/* OTP boxes */}
      <div className="flex items-center justify-between gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-11 flex-1 rounded-lg bg-[#e2e8f0] sm:h-12"
          />
        ))}
      </div>

      {/* Verify button */}
      <div className="h-10 w-full rounded-lg bg-[#0f2a4a]/15" />

      {/* Resend link */}
      <div className="flex justify-center">
        <div className="h-3.5 w-40 rounded bg-[#e2e8f0]" />
      </div>
    </div>
  );
}
