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
import { login, getCsrfToken } from "@/lib/api/auth";
import { useAuth } from "@/lib/auth/auth-provider";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  //const { login: authLogin } = useAuth();

  const mutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      // // Get CSRF token before login attempt
      // await getCsrfToken();
      return login(credentials);
    },
    onSuccess: (data) => {
      //authLogin(data.token, data.user);
      router.push("/dashboard");
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid credentials",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Mot de passe</Label>

                <Input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                Se connecter
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Vous n’avez pas de compte ?{" "}
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
