import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { logout } from "@/lib/api/auth";
import { useAuth } from "@/lib/auth/auth-provider";
import { useLoginMutation } from "@/hooks/mutations/use-login-mutation";
import { useUserInfoMutation } from "@/hooks/mutations/use-user-info-mutation";
import * as yup from "yup";
import { LoginFormValues } from "@/lib/types/auth";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Email invalide").required("L'email est requis"),
  password: yup
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .required("Le mot de passe est requis"),
});

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { login: authLogin } = useAuth();

  const loginMutation = useLoginMutation();
  const userInfoMutation = useUserInfoMutation();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      // Première étape : Login
      await loginMutation.mutateAsync(values);

      try {
        // Deuxième étape : Récupération des infos utilisateur
        const userInfo = await userInfoMutation.mutateAsync();

        // Troisième étape : Stockage des infos et redirection
        authLogin(userInfo);
        router.push("/dashboard");
      } catch (error) {
        // En cas d'échec de getUserInfo
        await logout();
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de récupérer les informations utilisateur",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Identifiants invalides",
      });
    }
  };

  const isLoading = loginMutation.isPending || userInfoMutation.isPending;

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Field name="email">
              {({ field }: any) => (
                <Input
                  {...field}
                  type="email"
                  placeholder="Email"
                  aria-invalid={Boolean(errors.email && touched.email)}
                />
              )}
            </Field>
            {errors.email && touched.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Field name="password">
              {({ field }: any) => (
                <Input
                  {...field}
                  type="password"
                  placeholder="Mot de passe"
                  aria-invalid={Boolean(errors.password && touched.password)}
                />
              )}
            </Field>
            {errors.password && touched.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Se connecter
          </Button>
        </Form>
      )}
    </Formik>
  );
}
