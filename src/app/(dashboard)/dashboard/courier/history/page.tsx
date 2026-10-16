import CourierParcelList from "@/components/dashboard/courier/CourierParcelList";

export default function CourierHistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0f2a4a]">Delivery history</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Completed and failed deliveries.
        </p>
      </div>
      <CourierParcelList mode="history" />
    </div>
  );
}
