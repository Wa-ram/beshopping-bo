import { ShippingSettings } from "@/components/settings/shipping-settings";

export default function ShippingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Shipping & Delivery</h1>
      <ShippingSettings />
    </div>
  );
}
