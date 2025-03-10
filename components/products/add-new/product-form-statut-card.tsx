import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormikContext } from "formik";
import { ProductFormValues } from "@/lib/types/product";

const ProductformStatutCard = () => {
  const { values, setFieldValue } = useFormikContext<ProductFormValues>();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statut</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Select
            value={values.status}
            onValueChange={(value) => setFieldValue("status", value)}
          >
            <SelectTrigger className="SelectTrigger">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent className="SelectTrigger">
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="archived">Archivé</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          {/* {errors.title?.message && (
          <span className="">{errors.title?.message as ReactNode}</span>
        )} */}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductformStatutCard;
