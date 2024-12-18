"use client"

import { createContext, useContext, useState } from "react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"

const NavigationContext = createContext({})

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <NavigationContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      <div className="flex min-h-screen">
        <MainNav />
        <div className="flex-1">
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              <UserNav />
            </div>
          </div>
          <main className="flex-1 space-y-4 p-8 pt-6">
            {children}
          </main>
        </div>
      </div>
    </NavigationContext.Provider>
  )
}

export const useNavigation = () => useContext(NavigationContext)