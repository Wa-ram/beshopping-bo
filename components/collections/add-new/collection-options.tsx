import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import CollectionFormPublishingCard from "./collection-form-publishing-card";
import { Checkbox } from "@/components/ui/checkbox";

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
              <Checkbox /> Ma boutique
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
