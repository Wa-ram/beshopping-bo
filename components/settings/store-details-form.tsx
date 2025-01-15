"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function StoreDetailsForm() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="storeName">Nom de la boutique</Label>
            <Input id="storeName" placeholder="Enter store name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="storeEmail">Email de la boutique</Label>
            <Input
              id="storeEmail"
              type="email"
              placeholder="contact@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="storePhone">Numéro de téléphone de la boutique</Label>
            <Input id="storePhone" type="tel" placeholder="+1 (555) 000-0000" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="storeAddress">Store address</Label>
            <Textarea id="storeAddress" placeholder="Enter store address" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Store Currency</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Input id="currency" value="USD" disabled />
          </div>
          <Button variant="outline">Change Currency</Button>
        </CardContent>
      </Card>
    </div>
  );
}
