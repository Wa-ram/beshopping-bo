import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { FormikCheckbox } from "@/components/ui/formik-checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductFormValues } from "@/lib/types/product";
import { useFormikContext } from "formik";
import React, { ReactNode } from "react";

const ProductFormPricingCard = () => {
  const { handleBlur, values, errors, touched, setFieldValue } =
    useFormikContext<ProductFormValues>();

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
              type="test"
              value={values.price}
              onChange={(e) => {
                const inputValue = e.target.value;
                const numericValue = inputValue.replace(/[^0-9]/g, ""); // Supprime tout sauf les chiffres

                setFieldValue("price", numericValue);
              }}
              onBlur={handleBlur}
            />
            {errors.price && touched.price && (
              <span className="text-red-500">{errors.price as ReactNode}</span>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="comparison_price">Prix de comparaison</Label>
            <Input
              id="comparison_price"
              placeholder="0.00"
              type="text"
              name="comparison_price"
              value={values.comparison_price}
              onChange={(e) => {
                const inputValue = e.target.value;
                const numericValue = inputValue.replace(/[^0-9]/g, ""); // Supprime tout sauf les chiffres

                setFieldValue("comparison_price", numericValue);
              }}
              onBlur={handleBlur}
            />
            {errors.comparison_price && touched.comparison_price && (
              <span className="text-red-500">
                {errors.comparison_price as ReactNode}
              </span>
            )}
          </div>
        </div>
        {/* <div>
          <Label>
            <FormikCheckbox
              name="is_taxed"
              checked={values.is_taxed === 1}
            />{" "}
            <span>Prélever la taxe sur ce produit</span>
          </Label>
        </div> */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="item_price">Coût par article</Label>
            <Input
              type="text"
              name="item_price"
              placeholder="0.00"
              value={values.item_price}
              onChange={(e) => {
                const inputValue = e.target.value;
                const numericValue = inputValue.replace(/[^0-9]/g, ""); // Supprime tout sauf les chiffres

                setFieldValue("item_price", numericValue);
              }}
              onBlur={handleBlur}
            />
            {errors.item_price && touched.item_price && (
              <span className="text-red-500">
                {errors.item_price as ReactNode}
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
