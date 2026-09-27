import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-blue-600 py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">
            Courier Delivery, Simplified
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-blue-100">
            Book parcels, track deliveries in real time, and pay securely — all
            from one platform.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/register"
              className="rounded-md bg-white px-6 py-3 font-medium text-blue-600 hover:bg-blue-50"
            >
              Book a Parcel
            </Link>
            <Link
              href="/track"
              className="rounded-md border border-white px-6 py-3 font-medium hover:bg-blue-700"
            >
              Track Parcel
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Why SwiftShip?
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Real-Time Tracking
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Know exactly where your parcel is, every step of the way.
            </p>
          </div>

          <div className="rounded-lg border p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Secure Payments
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Pay safely online through integrated bKash payments.
            </p>
          </div>

          <div className="rounded-lg border p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Trusted Couriers
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Verified delivery agents handling your parcels with care.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
