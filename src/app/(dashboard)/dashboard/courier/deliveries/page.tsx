import CourierParcelList from "@/components/dashboard/courier/CourierParcelList";

export default function CourierDeliveriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0f2a4a]">Active deliveries</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Update the status as you pick up and deliver each parcel.
        </p>
      </div>
      <CourierParcelList mode="active" />
    </div>
  );
}
