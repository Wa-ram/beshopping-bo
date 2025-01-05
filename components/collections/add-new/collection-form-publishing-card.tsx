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
import { useFormikContext } from "formik";
import React, { ReactNode, useRef, useState } from "react";

const CollectionFormPublishingCard = () => {
  // const [publishingPeriod, setPublishingPeriod] = useState("");
  // const [selectedDate, setSelectedDate] = useState("");

  // Crée une ref pour l'input de type date
  //const dateInputRef = useRef<HTMLInputElement | null>(null);

  // Fonction pour gérer la sélection de la période de publication
  // const handleSelectChange = (value: string) => {
  //   if (value === "instant") {
  //     setSelectedDate("");
  //   }
  //   setPublishingPeriod(value);
  // };

  // Fonction pour gérer la mise à jour de la date
  //const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //  setSelectedDate(e.target.value);
  //};

  const { values, setFieldValue, handleChange, handleBlur, touched, errors } =
    useFormikContext<any>();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Publication</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="">
          <div className="flex gap-4 items-center">
            <Select
              onValueChange={(value) => {
                if (value === "instant") {
                  setFieldValue("is_published", 1);
                  setFieldValue("published_at", undefined);
                } else {
                  setFieldValue("is_published", 0);
                }
              }}
              value={values.is_published ? "instant" : "scheduled"}
            >
              <SelectTrigger className="SelectTrigger">
                <SelectValue placeholder="Publication" />
              </SelectTrigger>
              <SelectContent className="SelectTrigger">
                <SelectItem value="instant">Publication instantanée</SelectItem>
                <SelectItem value="scheduled">
                  Publication programmée
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            {!values.is_published && (
              <div className="space-y-1 mt-4">
                <Label htmlFor="title">Date de publication</Label>

                <Input
                  type="date"
                  name="published_at"
                  value={values.published_at}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.published_at && touched.published_at && (
                  <div className="text-red-500">
                    {errors.published_at as ReactNode}
                  </div>
                )}
              </div>
            )}

            {values.published_at !== "" &&
              values.published_at !== undefined && (
                <div className="mt-1">
                  <span className="text-sm text-gray-600">
                    Date sélectionnée :{" "}
                    {new Date(values.published_at).toLocaleDateString()}
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

export default CollectionFormPublishingCard;
