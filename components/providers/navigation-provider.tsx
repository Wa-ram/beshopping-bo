"use client";

import { createContext, useContext, useState } from "react";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";

const NavigationContext = createContext({});

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <NavigationContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      <div className="flex min-h-screen">
        <MainNav />
        <div className="flex-grow flex flex-col">
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              <UserNav />
            </div>
          </div>
          <main className="space-y-4 p-8 pt-6 bg-[#F8F8F8] flex-grow">
            {children}
          </main>
        </div>
      </div>
    </NavigationContext.Provider>
  );
}

export const useNavigation = () => useContext(NavigationContext);
