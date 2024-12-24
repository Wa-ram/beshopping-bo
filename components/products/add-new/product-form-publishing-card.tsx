"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useRef, useState } from "react";

const ProductFormPublishingCard = () => {
  const [publishingPeriod, setPublishingPeriod] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Crée une ref pour l'input de type date
  const dateInputRef = useRef<HTMLInputElement | null>(null);

  // Fonction pour gérer la sélection de la période de publication
  const handleSelectChange = (value: string) => {
    if (value === "instant") {
      setSelectedDate("");
    }
    setPublishingPeriod(value);
  };

  // Fonction pour gérer la mise à jour de la date
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Publication</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="">
          <div className="flex gap-4 items-center">
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="SelectTrigger">
                <SelectValue placeholder="Publication" />
              </SelectTrigger>
              <SelectContent className="SelectTrigger">
                <SelectItem value="instant">Publication instantanée</SelectItem>
                <SelectItem value="programmed">
                  Publication programmée
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            {publishingPeriod === "programmed" && (
              <div className="space-y-1 mt-4">
                <Label htmlFor="title">Date de publication</Label>

                <Input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </div>
            )}

            {selectedDate !== "" && (
              <div className="mt-1">
                <span className="text-sm text-gray-600">
                  Date sélectionnée :{" "}
                  {new Date(selectedDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          {/* {errors.title?.message && (
          <span className="">{errors.title?.message as ReactNode}</span>
        )} */}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFormPublishingCard;
