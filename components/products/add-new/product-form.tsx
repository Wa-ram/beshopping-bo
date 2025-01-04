"use client";
import { Form, Formik, FormikHelpers, useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import ProductGeneralInfo from "./product-general-info";
import ProductPricingAndOptions from "./product-pricing-and-options";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { addProduct } from "@/lib/api/products";
import { ProductFormValues } from "@/lib/types/product";

{
  /*interface ProductFormProps {
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
  initialData?: any;
}*/
}

export function ProductForm(
  {
    /*{
  onSubmit,
  isLoading,
  initialData,
}*/
  }
) {
  //: ProductFormProps
  const initialValues: ProductFormValues = {
    name: "",
    description: "",
    price: "",
    comparison_price: "",
    item_price: "",
    is_taxed: false,
    is_tracking_quantity: false,
    stock_quantity: 0,
    has_sku: false,
    sku: "",
    is_physical: false,
    weight: "",
    weight_unit: "kg",
    status: "active",
    is_published: true,
    published_at: "",
    category: "",
    //product_type: "",
    collections: [],
    tags: [],
    images: [],
    //profit: 0;
    variants: [],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Le titre est obligatoire"),
    description: Yup.string().required("La description est obligatoire"),
    price: Yup.number()
      .positive("Le prix doit être un nombre positif")
      .required("Le prix est obligatoire"),
    comparison_price: Yup.mixed().test(
      "compare-at-price-validation",
      "Le prix de comparaison doit être supérieur au prix",
      function (value) {
        const { price } = this.parent; // Accéder à la valeur de price
        // Valider seulement si `compare_at_price` n'est pas vide
        if (value !== "" && value !== undefined) {
          return value > price;
        }
        return true; // Ne pas valider si compare_at_price est vide
      }
    ),
    item_price: Yup.mixed().test(
      "cost-per-item-validation",
      "Ce montant doit être inférieur au prix du produit",
      function (value) {
        const { price } = this.parent; // Accéder à la valeur de price
        // Valider seulement si `cost_per_item` n'est pas vide
        if (value !== "" && value !== undefined) {
          return value < price;
        }
        return true; // Ne pas valider si cost_per_item est vide
      }
    ),
    is_taxed: Yup.boolean(),
    is_tracking_quantity: Yup.boolean(),
    stock_quantity: Yup.number().when("is_tracking_quantity", {
      is: true,
      then: (schema) =>
        schema.min(1, "La quantité doit être au moins 1").required(),
    }),
    has_sku: Yup.boolean(),
    sku: Yup.string().when("has_sku", {
      is: true,
      then: (schema) => schema.required("Le SKU est obligatoire"),
    }),
    is_physical: Yup.boolean(),
    weight: Yup.number().when("is_physical", {
      is: true,
      then: (schema) =>
        schema
          .positive("Le poids doit être positif")
          .required("Le poids est obligatoire"),
    }),
    weight_unit: Yup.string().when("is_physical", {
      is: true,
      then: (schema) => schema.required("L'unité de mesure est obligatoire"),
    }),
    is_published: Yup.boolean(),
    published_at: Yup.date().when("is_published", {
      is: "true",
      then: (schema) =>
        schema.required(
          "La date est obligatoire pour une publication programmée"
        ),
    }),
    category: Yup.string().required("La catégorie est obligatoire"),
    collections: Yup.array().of(Yup.string()),
    tags: Yup.array().of(Yup.string()),
    images: Yup.mixed().required("Au moins une image est requise"),
  });

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return addProduct(formData);
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

  const handleSubmit = (values: ProductFormValues) => {
    console.log("Form Submitted:", values);

    // Function to create FormData
    const createFormData = (values: ProductFormValues): FormData => {
      const formData = new FormData();

      // Iterate over each key in the values object
      (Object.keys(values) as (keyof ProductFormValues)[]).forEach((key) => {
        const value = values[key] as unknown;

        if (key === "images" && Array.isArray(value)) {
          // Handle images array
          value.forEach((file, index) => {
            formData.append(`images[${index}]`, file as Blob); // Cast to Blob or File
          });
        } else if (Array.isArray(value)) {
          // Handle other arrays (e.g., tags, collections)
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, String(item)); // Convert items to string
          });
        } else if (typeof value === "object" && value !== null) {
          if (value instanceof File || value instanceof Blob) {
            formData.append(key, value);
          }
        } else {
          // Handle primitive values or undefined/null
          formData.append(
            key,
            value !== null && value !== undefined ? String(value) : ""
          );
        }
      });

      return formData;
    };

    // Create FormData from the form values
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
            <ProductPricingAndOptions />
          </div>
          <div className="lg:w-4/12 gap-6 flex flex-col order-1 lg:order-2">
            <ProductGeneralInfo />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          {/* <Button variant="outline" type="button">
          Save as Draft
        </Button> */}
          <Button type="submit">
            {/*isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />*/}
            Ajouter le produit
          </Button>
        </div>
      </Form>
    </Formik>
  );
}
