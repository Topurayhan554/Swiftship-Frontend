import { Loader2 } from "lucide-react";

export default function GuardSpinner() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-[#f7f9fc]"
      role="status"
      aria-label="Loading"
    >
      <Loader2
        aria-hidden="true"
        className="size-8 animate-spin text-[#ff7a1a]"
      />
    </div>
  );
}
