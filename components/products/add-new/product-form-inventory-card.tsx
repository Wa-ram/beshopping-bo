"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormikCheckbox } from "@/components/ui/formik-checkbox";
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

  const [field, meta] = useField("track_quantity");
  const [fieldSku, metaSku] = useField("has_sku");

  const handleTrackQuantityChange = (checked: boolean) => {
    setFieldValue("track_quantity", checked); // Met à jour Formik avec la nouvelle valeur
  };

  const handlehasSKUChange = (checked: boolean) => {
    setFieldValue("has_sku", checked); // Met à jour Formik avec la nouvelle valeur
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventaire</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>
            <FormikCheckbox
              name="track_quantity"
              checked={values.track_quantity}
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
                name="quantity"
                placeholder="0"
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
                <FormikCheckbox
                name="has_sku"
                  checked={values.has_sku}
                />{" "}
                <span>Ce produit à un SKU ou un code bar</span>
              </Label>
            </div>
            {fieldSku.value && (
              <div className="space-y-1">
                <Label htmlFor="sku">Numéro SKU</Label>
                <Input
                  id="sku"
                  type="text"
                  value={values.sku}
                  name="sku"
                  placeholder="SKU"
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
