import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NavigationProvider } from "@/components/providers/navigation-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Ecommerce Back Office Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <>
          <NavigationProvider>{children}</NavigationProvider>
          <Toaster />
        </>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        ></ThemeProvider> */}
      </body>
    </html>
  );
}
