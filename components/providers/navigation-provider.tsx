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
      <div className="">
        <MainNav />
        <div className="md:ml-64 h-screen bg-[#F8F8F8]">
          <div className="border-b">
            <div className="flex h-16 border-b items-center px-6 bg-white fixed w-full md:w-[calc(100%-256px)] z-10">
              <UserNav />
            </div>
          </div>
          <main className="space-y-4 p-6 pt-6 bg-[#F8F8F8] mt-16">
            {children}
          </main>
        </div>
      </div>
    </NavigationContext.Provider>
  );
}

export const useNavigation = () => useContext(NavigationContext);
