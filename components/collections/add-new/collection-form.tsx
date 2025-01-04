import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import CollectionGeneralInfo from "./collection-general-info";
import CollectionOptions from "./collection-options";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { createFormData } from "@/lib/utils";
import { addCollection } from "@/lib/api/collections";
import { CollectionFormValues } from "@/lib/types/collection";

interface CollectionFormProps {
  // onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
  initialData?: any;
}

const CollectionForm = ({
  // onSubmit: handleSubmit,
  isLoading,
  initialData,
}: CollectionFormProps) => {
  const initialValues: CollectionFormValues = {
    name: "",
    description: "",
    is_published: 1,
    published_at: "",
    is_shown_in_store: 0,
    images: [],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Le titre est obligatoire"),
    description: Yup.string().required("La description est obligatoire"),
    is_published: Yup.number().oneOf([1, 0]),
    published_at: Yup.date().when("is_published", {
      is: "true",
      then: (schema) =>
        schema.required(
          "La date est obligatoire pour une publication programmée"
        ),
    }),
    images: Yup.mixed().required("Au moins une image est requise"),
  });

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return addCollection(formData);
    },
    // mutationFn: ,
    onSuccess: (data) => {
      toast({
        variant: "default",
        title: "Succes",
        description: "Le produit a bien été ajouté",
      });
      // login(data.token, data.user);
      //router.push("/dashboard");
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Le produit n'a pas pu être ajouté",
      });
    },
  });

  const handleSubmit = (values: CollectionFormValues) => {
    console.log("Form Submitted:", values);

    const formData = createFormData(values);

    // for (let pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }
    // console.log(formData);

    // Submit the FormData via mutation
    mutation.mutate(formData);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-8">
        <div className="flex gap-6">
          <div className="lg:w-8/12 gap-6 flex flex-col order-2 lg:order-1">
            <CollectionGeneralInfo />
          </div>
          <div className="lg:w-4/12 gap-6 flex flex-col order-1 lg:order-2">
            <CollectionOptions />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          {/* <Button variant="outline" type="button">
      Save as Draft
    </Button> */}
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Ajouter la collection
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default CollectionForm;
