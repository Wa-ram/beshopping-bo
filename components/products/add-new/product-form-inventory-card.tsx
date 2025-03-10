"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormikCheckbox } from "@/components/ui/formik-checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductFormValues } from "@/lib/types/product";
import { useField, useFormikContext } from "formik";
import React, { ReactNode } from "react";

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
    useFormikContext<ProductFormValues>();

  const [field] = useField("is_tracking_quantity");
  const [fieldSku] = useField("has_sku");

  // const handleTrackQuantityChange = (checked: boolean) => {
  //   setFieldValue("is_tracking_quantity", checked); // Met à jour Formik avec la nouvelle valeur
  // };

  // const handlehasSKUChange = (checked: boolean) => {
  //   setFieldValue("has_sku", checked); // Met à jour Formik avec la nouvelle valeur
  // };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventaire</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>
            <FormikCheckbox
              name="is_tracking_quantity"
              checked={values.is_tracking_quantity === 1}
            />{" "}
            <span>Suivi des quantités</span>
          </Label>
        </div>
        {!!field.value && (
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="stock_quantity">Quantité</Label>
              <Input
                id="stock_quantity"
                type="text"
                name="stock_quantity"
                placeholder="0"
                value={values.stock_quantity}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const numericValue = inputValue.replace(/[^0-9]/g, ""); // Supprime tout sauf les chiffres

                  setFieldValue("stock_quantity", numericValue);
                }}
                onBlur={handleBlur}
                className="w-80"
              />
              {errors.stock_quantity && touched.stock_quantity && (
                <span className="text-red-500">
                  {errors.stock_quantity as ReactNode}
                </span>
              )}
            </div>
            <div>
              <Label>
                <FormikCheckbox name="has_sku" checked={values.has_sku === 1} />{" "}
                <span>Ce produit à un SKU ou un code bar</span>
              </Label>
            </div>
            {!!fieldSku.value && (
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
