import Link from "next/link";
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-xl font-bold text-blue-600">
            SwiftShip
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Home
            </Link>
            <Link
              href="/track"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Track Parcel
            </Link>
            <Link
              href="/about"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-3 text-lg font-bold text-blue-600">
                SwiftShip
              </h3>
              <p className="text-sm text-gray-500">
                Fast, reliable courier and logistics management for everyone.
              </p>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-semibold text-gray-800">
                Company
              </h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="/about" className="hover:text-blue-600">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-blue-600">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-semibold text-gray-800">
                Services
              </h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="/track" className="hover:text-blue-600">
                    Track Parcel
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-blue-600">
                    Become a Courier
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-semibold text-gray-800">
                Legal
              </h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="/terms" className="hover:text-blue-600">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-blue-600">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t pt-6 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} SwiftShip. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
