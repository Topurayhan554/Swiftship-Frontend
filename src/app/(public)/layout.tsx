import Navbar from "@/components/shared/Navbar";
import type { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#fdf6ee]">
      <Navbar />
      <main className="flex-1">{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
