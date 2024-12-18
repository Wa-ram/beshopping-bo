"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { NavigationProvider } from "@/components/providers/navigation-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavigationProvider>{children}</NavigationProvider>
      <Toaster />
    </>
    // <ThemeProvider
    //   attribute="class"
    //   defaultTheme="system"
    //   enableSystem
    //   disableTransitionOnChange
    // >

    // </ThemeProvider>
  );
}
