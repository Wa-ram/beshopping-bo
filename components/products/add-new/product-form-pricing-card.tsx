import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const ProductFormPricingCard = () => {
    
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tarification</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="title">Prix</Label>
            <Input
              id="title"
              placeholder="0.00"
              //   {...register("title")}
              // error={errors.title?.message}
            />
            {/* {errors.title?.message && (
              <span className="">{errors.title?.message as ReactNode}</span>
            )} */}
          </div>
          <div className="space-y-1">
            <Label htmlFor="title">Prix de comparaison</Label>
            <Input
              id="title"
              placeholder="0.00"
              //   {...register("title")}
              // error={errors.title?.message}
            />
            {/* {errors.title?.message && (
              <span className="">{errors.title?.message as ReactNode}</span>
            )} */}
          </div>
        </div>
        <div>
          <Checkbox /> <span>Prélever la taxe sur ce produit</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="title">Coût par article</Label>
            <Input
              id="title"
              placeholder="0.00"
              //   {...register("title")}
              // error={errors.title?.message}
            />
            {/* {errors.title?.message && (
              <span className="">{errors.title?.message as ReactNode}</span>
            )} */}
          </div>
          <div className="space-y-1">
            <Label htmlFor="title">Profit</Label>
            <Input
              id="title"
              placeholder="0.00"
              //   {...register("title")}
              // error={errors.title?.message}
            />
            {/* {errors.title?.message && (
              <span className="">{errors.title?.message as ReactNode}</span>
            )} */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFormPricingCard;
