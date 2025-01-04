import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import CollectionFormPublishingCard from "./collection-form-publishing-card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormikCheckbox } from "@/components/ui/formik-checkbox";
import { useFormikContext } from "formik";

const CollectionOptions = () => {
  return (
    <>
      <CollectionFormPublishingCard />
      <CollectionSalesChannel />
    </>
  );
};

export default CollectionOptions;

const CollectionSalesChannel = () => {
  const { values } = useFormikContext<any>();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chaîne de vente</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h2 className="SubTitle">Votre collection sera affiché ici</h2>
          <div>
            <Label>
              <FormikCheckbox
                name="is_shown_in_store"
                checked={values.is_shown_in_store === 1}
              />{" "}
              <span>Ma boutique</span>
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
