import React, { ReactNode, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import ProductFormShippingCard from "./product-form-shipping-card";
import ProductFormInventoryCard from "./product-form-inventory-card";
import ProductFormPricingCard from "./product-form-pricing-card";
import { ImageUpload } from "@/components/ui/image-upload";
import { ProductVariantCard } from "./product-variant-card";
import { useFormikContext } from "formik";

const ProductPricingAndOptions = () => {
  return (
    <>
      <ProductBasicsInfoCard />
      <ProductMediaCard />
      <ProductFormPricingCard />
      <ProductFormInventoryCard />
      <ProductFormShippingCard />
      <ProductVariantCard />
      {/*<ProductSEOCard />*/}
    </>
  );
};

export default ProductPricingAndOptions;

const ProductBasicsInfoCard = () => {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<any>();
  return (
    <Card>
      <CardContent className="space-y-4 mt-4">
        <div className="space-y-1">
          <Label htmlFor="title">Titre</Label>
          <Input
            id="title"
            name="title"
            placeholder="Titre du produit"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.title && touched.title && (
            <div className="text-red-500">{errors.title as ReactNode}</div>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Description du produit"
          />
          {errors.description && touched.description && (
            <div className="text-red-500">{errors.description as ReactNode}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ProductMediaCard = () => {
  const [images, setImages] = useState<string[]>([]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Media</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ImageUpload values={images} onChange={setImages} maxFiles={5} />
      </CardContent>
    </Card>
  );
};

const ProductSEOCard = () => {
  const product = {
    title: "custum-mug",
    description:
      "Créez des collections de mug pour organiser fetes et boire à votre soif. Vous pouvez choisir des collections en fonction de conditions comme vos couleurs préférés ou le thème de vos chill.",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Référencement sur les moteurs de recherche</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h2 className="productTitle">Custum mug</h2>
          <p className="productLink">
            {`${process.env.DOMAIN_NAME}/products/${
              product?.title || "custum-mug "
            }`}{" "}
          </p>
          <p>{product.description} </p>
        </div>
      </CardContent>
    </Card>
  );
};
