"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormikCheckbox } from "@/components/ui/formik-checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductFormValues } from "@/lib/types/product";
import { useField, useFormikContext } from "formik";
import React, { ReactNode } from "react";

const ProductFormShippingCard = () => {
  // État pour gérer la visibilité de l'input
  const { errors, values, touched, handleBlur, setFieldValue } =
    useFormikContext<ProductFormValues>();

  const [fieldisPhysicalProduct] =
    useField("is_physical");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Livraison</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>
            <FormikCheckbox name="is_physical" checked={values.is_physical === 1} />{" "}
            <span>Ceci est un produit physique</span>
          </Label>
        </div>
        {!!fieldisPhysicalProduct.value && (
          <div className="space-y-1">
            <Label htmlFor="weight">Poids</Label>
            <div className="flex gap-4">
              <Input
                id="weight"
                placeholder="0.0"
                type="text"
                value={values.weight}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const numericValue = inputValue.replace(/[^0-9]/g, ""); // Supprime tout sauf les chiffres
  
                  setFieldValue("weight", numericValue);
                }}
                onBlur={handleBlur}
                className="w-60"
              />
              <Select
                value={values.weight_unit}
                onValueChange={(value) => setFieldValue("weight_unit", value)}
              >
                <SelectTrigger
                  className="SelectTrigger w-32"
                  aria-label="weight-unit"
                >
                  <SelectValue placeholder="Unités de mesure" />
                </SelectTrigger>
                <SelectContent
                  className="SelectTrigger"
                  aria-label="weight-unit"
                >
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="lb">lb</SelectItem>
                  <SelectItem value="oz">oz</SelectItem>
                  <SelectItem value="g">G</SelectItem>
                </SelectContent>
              </Select>
              {errors.weight && touched.weight && (
                <span className="text-red-500">
                  {errors.weight as ReactNode}
                </span>
              )}
            </div>
            {/* {errors.title?.message && (
                  <span className="">{errors.title?.message as ReactNode}</span>
                )} */}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductFormShippingCard;
