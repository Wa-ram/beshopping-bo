"use client";

// import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
// import { NavigationProvider } from "@/components/providers/navigation-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/lib/auth/auth-provider";
import { useEffect } from "react";
import { getCsrfToken } from "@/lib/api/auth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initCSRF = async () => {
      try {
        // Get CSRF token on initial load
        await getCsrfToken();
      } catch (error) {
        console.error("Failed to initialize CSRF:", error);
        // Don't redirect on error, let the middleware handle it
      } finally {
        // setIsLoading(false);
      }
    };

    initCSRF();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <>{children}</>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}
