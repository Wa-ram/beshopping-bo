"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "@/components/auth/register/register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-900">
      <div className="hidden lg:block w-4/12 bg-gray-50 relative">
        <div className="p-4 absolute">
          <h1 className="text-xl font-bold">BeShopping</h1>
        </div>
        <Image
          src="/register-img.png"
          alt="register side image"
          width={500}
          height={500}
          className="w-full min-h-[720px] h-screen object-cover"
        />
      </div>
      <div className="w-full lg:w-8/12 bg-white flex items-center justify-center relative">
        <div className="p-4 absolute lg:hidden top-2 left-4">
          <h1 className="text-xl font-bold">BeShopping</h1>
        </div>
        <Card className="w-full max-w-md border-none shadow-none mt-16">
          <CardHeader>
            <CardTitle>Créer un compte</CardTitle>
            <CardDescription>
              Créez un compte en un clic et gerez votre boutique
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
            <div className="mt-4 text-center text-sm">
              Vous avez un compte ?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Connectez-vous
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
