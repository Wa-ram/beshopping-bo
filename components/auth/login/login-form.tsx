import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field } from "formik";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { login, logout } from "@/lib/api/auth";
import { getUserInfo } from "@/lib/api/users";
import { useAuth } from "@/lib/auth/auth-provider";
import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Email invalide").required("L'email est requis"),
  password: yup
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .required("Le mot de passe est requis"),
});

interface LoginFormValues {
  email: string;
  password: string;
}

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { login: authLogin } = useAuth();

  const mutation = useMutation({
    mutationFn: async (values: LoginFormValues) => {
      // First attempt login
      await login(values);

      try {
        // If login successful, get user info
        const userInfo = await getUserInfo();
        return userInfo;
      } catch (error) {
        // If getUserInfo fails, logout and throw error
        await logout();
        toast({
          variant: "destructive",
          title: "Erreur",
          description:
            error instanceof Error
              ? error.message
              : "Impossible de récupérer les informations utilisateur",
        });
      }
    },
    onSuccess: (userInfo) => {
      authLogin(userInfo);
      router.push("/dashboard");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description:
          error instanceof Error ? error.message : "Identifiants invalides",
      });
    },
  });

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={(values) => mutation.mutate(values)}
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
        </Form>
      )}
    </Formik>
  );
}
