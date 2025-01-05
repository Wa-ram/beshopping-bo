"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/components/auth/login/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <div className="flex h-16 items-center px-4 border border-b w-full">
        <div className="p-4">
          <h1 className="text-xl font-bold">BeShopping</h1>
        </div>
      </div>
      <div className="flex items-center justify-center flex-grow">
        <Card className="w-full max-w-md border-none shadow-none">
          <CardHeader>
            <CardTitle>Se connecter</CardTitle>
            <CardDescription>
              Connectez vous à votre compte et gerez votre boutique
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <div className="mt-4 text-center text-sm">
              Vous n'avez pas de compte ?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Inscrivez-vous
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}