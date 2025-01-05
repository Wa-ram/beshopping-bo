import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { logout } from "@/lib/api/auth";
import { useAuth } from "@/lib/auth/auth-provider";
import { useRegisterMutation } from "@/hooks/mutations/use-register-mutation";
import { useUserInfoMutation } from "@/hooks/mutations/use-user-info-mutation";
import * as yup from "yup";
import { RegisterFormValues } from "@/lib/types/auth";
import { FieldProps } from "formik";

export const registerSchema = yup.object().shape({
  firstname: yup
    .string()
    .required("Le prénom est requis")
    .min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastname: yup
    .string()
    .required("Le nom est requis")
    .min(2, "Le nom doit contenir au moins 2 caractères"),
  email: yup.string().email("Email invalide").required("L'email est requis"),
  password: yup
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .matches(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
    .required("Le mot de passe est requis"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas")
    .required("La confirmation du mot de passe est requise"),
});

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { login: authLogin } = useAuth();

  const registerMutation = useRegisterMutation();
  const userInfoMutation = useUserInfoMutation();

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      // Première étape : Inscription
      await registerMutation.mutateAsync(values);

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
        console.error("Failed to get user info", error);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "L'inscription a échoué",
      });
      console.error("Failed to register user", error);
    }
  };

  const isLoading = registerMutation.isPending || userInfoMutation.isPending;

  const initialValues: RegisterFormValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, values, setFieldValue }) => {
        if (values.password !== values.password_confirmation) {
          setFieldValue("password_confirmation", values.password);
        }

        return (
          <Form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lastname">Nom</Label>
                <Field name="lastname">
                  {({ field }: FieldProps) => (
                    <Input
                      {...field}
                      placeholder="Nom"
                      aria-invalid={Boolean(
                        errors.lastname && touched.lastname
                      )}
                    />
                  )}
                </Field>
                {errors.lastname && touched.lastname && (
                  <p className="text-sm text-destructive">{errors.lastname}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstname">Prénoms</Label>
                <Field name="firstname">
                  {({ field }: FieldProps) => (
                    <Input
                      {...field}
                      placeholder="Prénoms"
                      aria-invalid={Boolean(
                        errors.firstname && touched.firstname
                      )}
                    />
                  )}
                </Field>
                {errors.firstname && touched.firstname && (
                  <p className="text-sm text-destructive">{errors.firstname}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Field name="email">
                {({ field }: FieldProps) => (
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
                {({ field }: FieldProps) => (
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
              S&apos;inscrire
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}
