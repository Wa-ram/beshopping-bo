"use client";

import { UserNav } from "@/components/user-nav";
// import { usePathname } from "next/navigation";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="flex-1 space-y-4">
        <div className="flex h-16 items-center px-4 border border-b">
          <div className="p-4">
            <h1 className="text-xl font-bold">BeShopping</h1>
          </div>
          <UserNav />
        </div>
        <div className="py-8 pt-6 w-full lg:w-8/12 xl:7/12 max-w-xl mx-auto">{children}</div>
      </div>
    </div>
  );
}
