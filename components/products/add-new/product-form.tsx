"use client";
import { useFormik } from "formik";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import ProductGeneralInfo from "./product-general-info";
import ProductPricingAndOptions from "./product-pricing-and-options";
import * as Yup from "yup";

interface ProductFormValues {
  status: "Actif" | "Archivé" | "Draft";
  publication: {
    type: "instant" | "scheduled";
    date?: string; // Optionnel pour la publication programmée
  };
  category: string;
  productType: string;
  collections: string[];
  tags: string[];
  title: string;
  description: string;
  images: File[];
  price: number;
  compareAtPrice?: number;
  taxApplicable: boolean;
  costPerItem: number;
  profit: number;
  trackQuantity: boolean;
  quantity: number;
  hasSKU: boolean;
  sku?: string;
  isPhysical: boolean;
  weight?: number;
  weightUnit?: string;
  variants: Array<{
    option: string;
    value: string;
    price: number;
    quantity: number;
  }>;
}

const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  status: z.enum(["draft", "active", "archived"]),
  price: z.number().min(0),
});

interface ProductFormProps {
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
  initialData?: any;
}

export function ProductForm({
  onSubmit,
  isLoading,
  initialData,
}: ProductFormProps) {
  const initialValues: ProductFormValues = {
    status: "Actif",
    publication: {
      type: "instant",
      date: "",
    },
    category: "",
    productType: "",
    collections: [],
    tags: [],
    title: "",
    description: "",
    images: [],
    price: 0,
    compareAtPrice: undefined,
    taxApplicable: false,
    costPerItem: 0,
    profit: 0,
    trackQuantity: false,
    quantity: 0,
    hasSKU: false,
    sku: "",
    isPhysical: true,
    weight: undefined,
    weightUnit: "kg",
    variants: [],
  };

  const validationSchema = Yup.object({
    status: Yup.string()
      .oneOf(["Actif", "Archivé", "Draft"])
      .required("Statut requis"),
    publication: Yup.object({
      type: Yup.string().oneOf(["instant", "scheduled"]).required(),
      date: Yup.string().when("type", {
        is: "scheduled",
        then: (schema) =>
          schema.required(
            "La date est obligatoire pour une publication programmée"
          ),
      }),
    }),
    category: Yup.string().required("La catégorie est obligatoire"),
    productType: Yup.string().required("Le type de produit est obligatoire"),
    collections: Yup.array().of(Yup.string()),
    tags: Yup.array().of(Yup.string()),
    title: Yup.string().required("Le titre est obligatoire"),
    description: Yup.string().required("La description est obligatoire"),
    price: Yup.number()
      .positive("Le prix doit être un nombre positif")
      .required("Le prix est obligatoire"),
    compareAtPrice: Yup.number().positive(
      "Le prix de comparaison doit être un nombre positif"
    ),
    taxApplicable: Yup.boolean(),
    costPerItem: Yup.number().positive("Le coût par article doit être positif"),
    profit: Yup.number(),
    trackQuantity: Yup.boolean(),
    quantity: Yup.number().when("trackQuantity", {
      is: true,
      then: (schema) =>
        schema.min(0, "La quantité doit être au moins 0").required(),
    }),
    hasSKU: Yup.boolean(),
    sku: Yup.string().when("hasSKU", {
      is: true,
      then: (schema) => schema.required("Le SKU est obligatoire"),
    }),
    isPhysical: Yup.boolean(),
    weight: Yup.number().when("isPhysical", {
      is: true,
      then: (schema) =>
        schema
          .positive("Le poids doit être positif")
          .required("Le poids est obligatoire"),
    }),
    weightUnit: Yup.string().when("isPhysical", {
      is: true,
      then: (schema) => schema.required("L'unité de mesure est obligatoire"),
    }),
    variants: Yup.array().of(
      Yup.object({
        option: Yup.string().required("L'option est obligatoire"),
        value: Yup.string().required("La valeur est obligatoire"),
        price: Yup.number()
          .positive("Le prix doit être positif")
          .required("Le prix est obligatoire"),
        quantity: Yup.number()
          .min(0, "La quantité doit être au moins 0")
          .required(),
      })
    ),
  });

  const formik = useFormik<ProductFormValues>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-8">
      <div className="flex gap-6">
        <div className="lg:w-8/12 gap-6 flex flex-col order-2 lg:order-1">
          <ProductPricingAndOptions formik={formik} />
        </div>
        <div className="lg:w-4/12 gap-6 flex flex-col order-1 lg:order-2">
          <ProductGeneralInfo formik={formik} />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        {/* <Button variant="outline" type="button">
          Save as Draft
        </Button> */}
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Publish Product
        </Button>
      </div>
    </form>
  );
}
