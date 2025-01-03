import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormikCheckbox } from "@/components/ui/formik-checkbox";
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
              name="price"
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
            <Label htmlFor="compare_at_price">Prix de comparaison</Label>
            <Input
              id="compare_at_price"
              placeholder="0.00"
              type="number"
              name="compare_at_price"
              value={values.compare_at_price}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.compare_at_price && touched.compare_at_price && (
              <span className="text-red-500">
                {errors.compare_at_price as ReactNode}
              </span>
            )}
          </div>
        </div>
        <div>
          <Label>
            <FormikCheckbox
              name="tax_applicable"
              checked={values.tax_applicable}
            />{" "}
            <span>Prélever la taxe sur ce produit</span>
          </Label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="cost_per_item">Coût par article</Label>
            <Input
              type="number"
              name="cost_per_item"
              placeholder="0.00"
              value={values.cost_per_item}
              onChange={handleChange}
            />
            {errors.cost_per_item && touched.cost_per_item && (
              <span className="text-red-500">
                {errors.cost_per_item as ReactNode}
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
