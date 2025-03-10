import { AccountManagementForm } from "@/components/settings/account-management-form";

export default function StoreDetailsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestion des comptes</h1>
      <AccountManagementForm />
    </div>
  );
}
