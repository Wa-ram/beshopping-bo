"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { getCsrfToken, register } from "@/lib/api/auth";
import { useAuth } from "@/lib/auth/auth-provider";
import Image from "next/image";
import registerImage from "/register-image.png";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const router = useRouter();
  const { toast } = useToast();
  // const { login } = useAuth();

  const mutation = useMutation({
    mutationFn: async (formData: {
      firstname: string;
      lastname: string;
      email: string;
      password: string;
      password_confirmation: string;
    }) => {
      // Get CSRF token before login attempt
      // await getCsrfToken();
      return register(formData);
    },
    // mutationFn: ,
    onSuccess: (data) => {
      // login(data.token, data.user);
      router.push("/dashboard");
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Registration failed. Please try again.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    formData.password_confirmation = formData.password;
    mutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
          className="w-full h-screen"
        />
      </div>
      <div className="w-full lg:w-8/12 bg-white flex items-center justify-center relative">
        <div className="p-4 absolute lg:hidden top-2 left-4">
          <h1 className="text-xl font-bold">BeShopping</h1>
        </div>
        <Card className="w-full max-w-md border-none shadow-none">
          <CardHeader>
            <CardTitle>Créer un compte</CardTitle>
            <CardDescription>
              Créez un compte en un clic et gerez votre boutique
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nom</Label>
                  <Input
                    name="lastname"
                    placeholder="Nom"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Prénoms</Label>
                  <Input
                    name="firstname"
                    placeholder="Prénoms"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Mot de passe</Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button
                className="w-full"
                type="submit"
                disabled={mutation.isPending}
              >
                {mutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                S'inscrire
              </Button>
            </form>
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
