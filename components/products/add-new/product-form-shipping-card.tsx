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
import React, { useState } from "react";

const ProductFormShippingCard = () => {
  // État pour gérer la visibilité de l'input
  const [isPhysicalProduct, setIsPhysicalProduct] = useState(false);

  // Gérer le changement d'état de la checkbox
  const handleCheckboxChange = () => {
    setIsPhysicalProduct((prevState) => !prevState);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Livraison</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Checkbox
            checked={isPhysicalProduct}
            onCheckedChange={handleCheckboxChange}
          />{" "}
          <span>Ceci est un produit physique</span>
        </div>
        {isPhysicalProduct && (
          <div className="space-y-1">
            <Label htmlFor="title">Poids</Label>
            <div className="flex gap-4">
              <Input
                id="title"
                placeholder="0.0"
                type="number"
                // {...register("title")}
                // error={errors.title?.message}
                className="w-60"
              />
              <Select>
                <SelectTrigger className="SelectTrigger w-32" aria-label="Food">
                  <SelectValue placeholder="Unités de mesure" />
                </SelectTrigger>
                <SelectContent className="SelectTrigger" aria-label="Food">
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
