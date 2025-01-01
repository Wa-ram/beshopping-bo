"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getCsrfToken } from "@/lib/api/auth";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // useEffect(() => {
  //   const initCSRF = async () => {
  //     try {
  //       // Get CSRF token on initial load
  //       await getCsrfToken();
  //     } catch (error) {
  //       console.error("Failed to initialize CSRF:", error);
  //       // Don't redirect on error, let the middleware handle it
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   initCSRF();
  // }, []);

  // useEffect(
  //   () => {
  //     const initAuth = async () => {
  //       try {
  //         const token = localStorage.getItem("token");
  //         const userData = localStorage.getItem("user");

  //         if (token && userData) {
  //           try {
  //             const parsedUser = JSON.parse(userData);
  //             setUser(parsedUser);
  //           } catch (e) {
  //             // Invalid user data in localStorage
  //             localStorage.removeItem("token");
  //             localStorage.removeItem("user");
  //             if (
  //               !pathname.startsWith("/login") &&
  //               !pathname.startsWith("/register")
  //             ) {
  //               router.push("/login");
  //             }
  //           }
  //         } else if (
  //           !pathname.startsWith("/login") &&
  //           !pathname.startsWith("/register")
  //         ) {
  //           router.push("/login");
  //         }
  //       } catch (error) {
  //         console.error("Failed to initialize auth:", error);
  //         // Don't redirect on error, let the middleware handle it
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     initAuth();
  //   },
  //   [
  //     // pathname, router
  //   ]
  // );

  const login = (token: string, userData: User) => {
    try {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Failed to store auth data:", error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
