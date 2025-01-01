"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useField, useFormikContext } from "formik";
import React, { useState } from "react";

const ProductFormShippingCard = () => {
  // État pour gérer la visibilité de l'input
  const { errors, values, handleBlur, handleChange, setFieldValue } =
    useFormikContext<any>();
  const [fieldisPhysicalProduct, metaIsPhysicalProduct] =
    useField("isPhysicalProduct");

  // Gérer le changement d'état de la checkbox
  const handleCheckboxChange = (checked: boolean) => {
    setFieldValue("isPhysicalProduct", checked);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Livraison</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>
            <Checkbox
              checked={fieldisPhysicalProduct.value}
              onCheckedChange={handleCheckboxChange}
            />{" "}
            <span>Ceci est un produit physique</span>
          </Label>
        </div>
        {fieldisPhysicalProduct.value && (
          <div className="space-y-1">
            <Label htmlFor="title">Poids</Label>
            <div className="flex gap-4">
              <Input
                id="title"
                placeholder="0.0"
                type="number"
                value={values.weight}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-60"
              />
              <Select
                value={values.weightUnit}
                onValueChange={(value) => setFieldValue("weightUnit", value)}
              >
                <SelectTrigger className="SelectTrigger w-32" aria-label="weight-unit">
                  <SelectValue placeholder="Unités de mesure" />
                </SelectTrigger>
                <SelectContent className="SelectTrigger" aria-label="weight-unit">
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="lb">lb</SelectItem>
                  <SelectItem value="oz">oz</SelectItem>
                  <SelectItem value="g">G</SelectItem>
                </SelectContent>
              </Select>
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
