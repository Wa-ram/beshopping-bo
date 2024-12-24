"use client";
import { Input } from "@/components/ui/input";
import {
  InteractiveSelect,
  SelectList,
} from "@/components/ui/interactive-select";
import { Label } from "@/components/ui/label";
import { TagInputOOTB } from "@/components/ui/tag-input-ootb";
import Link from "next/link";
import React, { useState } from "react";    
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProductFormOrganisation = () => {
  const [tags, setTags] = useState<{ label: string; value: string }[]>([]);

  const suggestions = [
    { label: "React", value: "react" },
    { label: "TypeScript", value: "typescript" },
    { label: "JavaScript", value: "javascript" },
    { label: "TailwindCSS", value: "tailwindcss" },
    { label: "CSS", value: "css" },
  ];
  const [selectedItem, setSelectedItem] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Option 4", value: "option4" },
  ];

  const handleChange = (item: { value: string; label: string }) => {
    setSelectedItem(item);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Organisation du produit</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="title">Catégorie</Label>
          <InteractiveSelect value={selectedItem} onChange={handleChange}>
            <SelectList
              list={options}
              onSelect={(item: { value: string; label: string }) => {
                setSelectedItem({ value: item.value, label: item.label });
              }}
            />
          </InteractiveSelect>
        </div>

        <div className="space-y-1">
          <Label htmlFor="title">Type de produit</Label>
          <Input
            id="title"
            placeholder="Publication instantanée"
            // {...register("title")}
            // error={errors.title?.message}
          />
          {/* {errors.title?.message && (
                <span className="">{errors.title?.message as ReactNode}</span>
              )} */}
          <p className="text-[#9C9CAB]">
            Définir les{" "}
            <Link
              href="/dashboard/products/add-new"
              className="text-[#3574F2] underline"
            >
              taux d'imposition
            </Link>
          </p>
        </div>

        <div className="space-y-1">
          <Label htmlFor="title">Collection</Label>
          <TagInputOOTB
            suggestions={suggestions}
            selectedTags={tags}
            onTagsChange={setTags}
            isAddPossible={false}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="title">Tags</Label>
          <TagInputOOTB
            suggestions={suggestions}
            selectedTags={tags}
            onTagsChange={setTags}
            isAddPossible={true}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFormOrganisation;
