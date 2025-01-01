"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useField, useFormikContext } from "formik";
import React, { ReactNode, useState } from "react";

const ProductFormInventoryCard = () => {
  // // États pour gérer la visibilité des inputs
  // const [isQuantityChecked, setIsQuantityChecked] = useState(false);
  // const [isSKUChecked, setIsSKUChecked] = useState(false);

  // // Gérer le changement d'état du premier checkbox (suivi des quantités)
  // const handleQuantityChange = () => {
  //   setIsQuantityChecked((prevState) => !prevState);
  // };

  // // Gérer le changement d'état du deuxième checkbox (SKU ou code-barres)
  // const handleSKUChange = () => {
  //   setIsSKUChecked((prevState) => !prevState);
  // };
  const { handleBlur, handleChange, errors, values, touched, setFieldValue } =
    useFormikContext<any>();

  const [field, meta] = useField("trackQuantity");
  const [fieldSku, metaSku] = useField("hasSKU");

  const handleTrackQuantityChange = (checked: boolean) => {
    setFieldValue("trackQuantity", checked); // Met à jour Formik avec la nouvelle valeur
  };

  const handlehasSKUChange = (checked: boolean) => {
    setFieldValue("hasSKU", checked); // Met à jour Formik avec la nouvelle valeur
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventaire</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>
            <Checkbox
              checked={field.value}
              onCheckedChange={handleTrackQuantityChange}
            />{" "}
            <span>Suivi des quantités</span>
          </Label>
        </div>
        {field.value && (
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="quantity">Quantité</Label>
              <Input
                id="quantity"
                type="number"
                value={values.quantity}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-80"
              />
              {errors.quantity && touched.quantity && (
                <span className="text-red-500">
                  {errors.quantity as ReactNode}
                </span>
              )}
            </div>
            <div>
              <Label>
                <Checkbox
                  checked={fieldSku.value}
                  onCheckedChange={handlehasSKUChange}
                />{" "}
                <span>Ce produit à un SKU ou un code bar</span>
              </Label>
            </div>
            {fieldSku.value && (
              <div className="space-y-1">
                <Label htmlFor="title">Numéro SKU</Label>
                <Input
                  id="title"
                  value={values.sku}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.sku && touched.sku && (
                  <span className="text-red-500">
                    {errors.sku as ReactNode}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductFormInventoryCard;
