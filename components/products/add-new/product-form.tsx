"use client";
import { Form, Formik, FormikHelpers, useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import ProductGeneralInfo from "./product-general-info";
import ProductPricingAndOptions from "./product-pricing-and-options";
import * as Yup from "yup";

interface ProductFormValues {
  title: string;
  description: string;
  price: string;
  compare_at_price?: string;
  cost_per_item?: string;
  tax_applicable?: boolean;
  track_quantity?: boolean;
  quantity?: number;
  has_sku?: boolean;
  sku?: string;
  is_physical?: boolean;
  weight?: string;
  weight_unit?: string;
  status: "active" | "archived" | "draft";
  is_published: boolean;
  published_at?: string;
  category: string;
  //product_type: string;
  collections: string[];
  tags: string[];
  images: File[];
  //profit: number;
  variants: Array<{
    option: string;
    value: string;
    price: number;
    quantity: number;
  }>;
}

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
    title: "",
    description: "",
    price: "",
    compare_at_price: "",
    cost_per_item: "",
    tax_applicable: false,
    track_quantity: false,
    quantity: 0,
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
    title: Yup.string().required("Le titre est obligatoire"),
    description: Yup.string().required("La description est obligatoire"),
    price: Yup.number()
      .positive("Le prix doit être un nombre positif")
      .required("Le prix est obligatoire"),
    compare_at_price: Yup.mixed().test(
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
    cost_per_item: Yup.mixed().test(
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
    tax_applicable: Yup.boolean(),
    track_quantity: Yup.boolean(),
    quantity: Yup.number().when("track_quantity", {
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
  });

  const handleSubmit = (values: any) => {
    console.log("Form Submitted:", values);
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
