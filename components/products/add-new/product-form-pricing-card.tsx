import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormikContext } from "formik";
import React, { ReactNode } from "react";

const ProductFormPricingCard = () => {
  const { handleBlur, handleChange, values, errors, touched } =
    useFormikContext<any>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tarification</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="price">Prix</Label>
            <Input
              id="price"
              placeholder="0.00"
              type="number"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.price && touched.price && (
              <span className="text-red-500">{errors.price as ReactNode}</span>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="compareAt">Prix de comparaison</Label>
            <Input
              id="compareAt"
              placeholder="0.00"
              type="number"
              value={values.compareAtPrice}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.compareAtPrice && touched.compareAtPrice && (
              <span className="text-red-500">
                {errors.compareAtPrice as ReactNode}
              </span>
            )}
          </div>
        </div>
        <div>
          <Label>
            <Checkbox
              checked={values.taxApplicable}
              onCheckedChange={handleChange}
            />{" "}
            <span>Prélever la taxe sur ce produit</span>
          </Label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="costPerArticle">Coût par article</Label>
            <Input
              id="costPerArticle"
              placeholder="0.00"
              type="number"
              onChange={handleChange}
              value={values.costPerItem}
              onBlur={handleBlur}
            />
            {errors.costPerItem && touched.costPerItem && (
              <span className="text-red-500">
                {errors.costPerItem as ReactNode}
              </span>
            )}
          </div>
          {/* <div className="space-y-1"> */}
          {/* <Label htmlFor="title">Profit</Label> */}
          {/* <Input */}
          {/* id="title" */}
          {/* placeholder="0.00" */}
          {/* //   {...register("title")} */}
          {/* // error={errors.title?.message} */}
          {/* /> */}
          {/* {errors.title?.message && (
              <span className="">{errors.title?.message as ReactNode}</span>
            )} */}
          {/* </div> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFormPricingCard;
