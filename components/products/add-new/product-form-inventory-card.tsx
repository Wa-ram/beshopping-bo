"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

const ProductFormInventoryCard = () => {
  // États pour gérer la visibilité des inputs
  const [isQuantityChecked, setIsQuantityChecked] = useState(false);
  const [isSKUChecked, setIsSKUChecked] = useState(false);

  // Gérer le changement d'état du premier checkbox (suivi des quantités)
  const handleQuantityChange = () => {
    setIsQuantityChecked((prevState) => !prevState);
  };

  // Gérer le changement d'état du deuxième checkbox (SKU ou code-barres)
  const handleSKUChange = () => {
    setIsSKUChecked((prevState) => !prevState);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventaire</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Checkbox
            checked={isQuantityChecked}
            onCheckedChange={handleQuantityChange}
          />{" "}
          <span>Suivi des quantités</span>
        </div>
        {isQuantityChecked && (
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="title">Quantité</Label>
              <Input
                id="title"
                type="number"
                className="w-80"
                // {...register("title")}
                // error={errors.title?.message}
              />
              {/* {errors.title?.message && (
          <span className="">{errors.title?.message as ReactNode}</span>
        )} */}
            </div>
            <div>
              <Checkbox
                checked={isSKUChecked}
                onCheckedChange={handleSKUChange}
              />{" "}
              <span>Ce produit à un SKU ou un code bar</span>
            </div>
            {isSKUChecked && (
              <div className="space-y-1">
                <Label htmlFor="title">Numéro SKU</Label>
                <Input
                  id="title"
                  // {...register("title")}
                  // error={errors.title?.message}
                />
                {/* {errors.title?.message && (
            <span className="">{errors.title?.message as ReactNode}</span>
          )} */}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductFormInventoryCard;
