"use client"
import { ReactNode, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";

interface User {
    firstname: string;
    lastname: string;
    email: string;
    phone_number: string;
}

interface PasswordValues {
    current_password: string;
    password: string;
    password_confirmation: string;
}

const profileValidationSchema = Yup.object().shape({
    firstname: Yup.string().required("Le prénom est requis"),
    lastname: Yup.string().required("Le nom est requis"),
    email: Yup.string().email("Email invalide").required("L'email est requis"),
    phone_number: Yup.string().required("Phone number is required"),
});

const passwordValidationSchema = Yup.object().shape({
    current_password: Yup.string().required("Le mot de passe actuel est requis"),
    password: Yup.string()
        .min(8, "Le mot de passe doit avoir au moins 8 charactères")
        .required("Nouveau mot de passe est requis"),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas")
        .required("La confirmation de mot de passe est requise"),
});

export function AccountManagementForm() {
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const { data: user, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const response = await api.get("/api/user");
            return response.data;
        },
    });

    const updateProfileInitialValues = {
        firstname: user?.firstname,
        lastname: user?.lastname,
        email: user?.email,
        phone_number: user?.phone_number,
    }

    const updateProfileMutation = useMutation({
        mutationFn: async (values: User) => {
            const response = await axios.put("/api/user/profile-information", values);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("Profil mis à jour avec succes");
        },
        onError: () => {
            toast.error("Erreur lors de la mise à jour du profil");
        },
    });

    const updatePasswordMutation = useMutation({
        mutationFn: async (values: PasswordValues) => {
            const response = await axios.put("/api/user/password", values);
            return response.data;
        },
        onSuccess: () => {
            setIsPasswordModalOpen(false);
            toast.success("Mot de passe mis à jour avec succes");
        },
        onError: () => {
            toast.error("Erreur lors de la mise à jour du Mot de passe");
        },
    });

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Informations Personnelles</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        ))}
                        <Skeleton className="h-10 w-28" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Card className="border-none">
                <CardHeader>
                    <CardTitle>Informations Personnelles</CardTitle>
                </CardHeader>
                <CardContent>
                    <Formik
                        initialValues={updateProfileInitialValues}
                        validationSchema={profileValidationSchema}
                        enableReinitialize
                        onSubmit={(values) => {
                            const updatedValues = {
                                ...values,
                                firstname: values.firstname || user.firstname,
                                lastname: values.lastname || user.lastname,
                                email: values.email || user.email,
                                phone_number: values.phone_number || user.phone_number,
                            };
                            updateProfileMutation.mutate(updatedValues);
                        }}
                    >
                        {({ values, errors, touched, handleChange, handleBlur }) => (
                            <Form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstname">Prénoms</Label>
                                    <Input
                                        id="firstname"
                                        name="firstname"
                                        value={values.firstname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.firstname && errors.firstname && (
                                        <p className="text-sm text-red-500">{errors.firstname as ReactNode}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="lastname">Nom</Label>
                                    <Input
                                        id="lastname"
                                        name="lastname"
                                        value={values.lastname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.lastname && errors.lastname && (
                                        <p className="text-sm text-red-500">{errors.lastname as ReactNode}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.email && errors.email && (
                                        <p className="text-sm text-red-500">{errors.email as ReactNode}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone_number">Numéro de téléphone</Label>
                                    <Input
                                        id="phone_number"
                                        name="phone_number"
                                        type="tel"
                                        value={values.phone_number}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.phone_number && errors.phone_number && (
                                        <p className="text-sm text-red-500">{errors.phone_number as ReactNode}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={updateProfileMutation.isPending}
                                >
                                    {updateProfileMutation.isPending
                                        ? "Saving..."
                                        : "Save Changes"}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Mot de passe</CardTitle>
                </CardHeader>
                <CardContent>
                    <Dialog
                        open={isPasswordModalOpen}
                        onOpenChange={setIsPasswordModalOpen}
                    >
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-full sm:w-auto">
                                <Lock className="w-4 h-4 mr-2" />
                                Modifier le mot de passe
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Modifier le mot de passe</DialogTitle>
                            </DialogHeader>
                            <Formik
                                initialValues={{
                                    current_password: "",
                                    password: "",
                                    password_confirmation: "",
                                }}
                                validationSchema={passwordValidationSchema}
                                onSubmit={(values) => {
                                    updatePasswordMutation.mutate(values);
                                }}
                            >
                                {({ values, errors, touched, handleChange, handleBlur }) => (
                                    <Form className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="current_password">Mot de passe actuelle </Label>
                                            <Input
                                                id="current_password"
                                                name="current_password"
                                                type="password"
                                                value={values.current_password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {touched.current_password && errors.current_password && (
                                                <p className="text-sm text-red-500">
                                                    {errors.current_password}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="password">Nouveau mot de passe</Label>
                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {touched.password && errors.password && (
                                                <p className="text-sm text-red-500">{errors.password}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="password_confirmation">
                                                Confirmation de mot de passe
                                            </Label>
                                            <Input
                                                id="password_confirmation"
                                                name="password_confirmation"
                                                type="password"
                                                value={values.password_confirmation}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {touched.password_confirmation &&
                                                errors.password_confirmation && (
                                                    <p className="text-sm text-red-500">
                                                        {errors.password_confirmation}
                                                    </p>
                                                )}
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={updatePasswordMutation.isPending}
                                        >
                                            {updatePasswordMutation.isPending
                                                ? "Updating..."
                                                : "Update Password"}
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
        </div>
    );
}