import { TaxSettings } from "@/components/settings/tax-settings";

export default function TaxesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Taxes & Duties</h1>
      <TaxSettings />
    </div>
  );
}
