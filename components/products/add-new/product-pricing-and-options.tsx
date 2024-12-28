import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import ProductFormShippingCard from "./product-form-shipping-card";
import ProductFormInventoryCard from "./product-form-inventory-card";
import ProductFormPricingCard from "./product-form-pricing-card";
import { ImageUpload } from "@/components/ui/image-upload";

const ProductPricingAndOptions = (formik: any) => {
  return (
    <>
      <ProductBasicsInfoCard />
      <ProductMediaCard />
      <ProductFormPricingCard />
      <ProductFormInventoryCard />
      <ProductFormShippingCard />
      <ProductVariantCard />
      <ProductSEOCard />
    </>
  );
};

export default ProductPricingAndOptions;

const ProductBasicsInfoCard = () => {
  return (
    <Card>
      <CardContent className="space-y-4 mt-4">
        <div className="space-y-1">
          <Label htmlFor="title">Titre</Label>
          <Input
            id="title"
            placeholder="Titre du produit"
            // {...register("title")}
            // error={errors.title?.message}
          />
          {/* {errors.title?.message && (
              <span className="">{errors.title?.message as ReactNode}</span>
            )} */}
        </div>
        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            // {...register("description")}
          />
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

const ProductVariantCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Variantes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <span className="text-[#3574F2]">
            <span>+</span> Ajouter des options comme la taille et la couleur
          </span>
        </div>
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
