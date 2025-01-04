"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TagInputOOTB } from "@/components/ui/tag-input-ootb";
import Link from "next/link";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/lib/api/categories";
import { fetchCollections } from "@/lib/api/collections";
import { InteractiveSelect } from "@/components/ui/category-select";
import { useFormikContext } from "formik";

const ProductFormOrganisation = () => {
  const [tags, setTags] = useState<{ label: string; value: string }[]>([]);
  const [collectionsTags, setCollectionsTags] = useState<
    { label: string; value: string }[]
  >([]);

  const suggestions = [
    { label: "React", value: "react" },
    { label: "TypeScript", value: "typescript" },
    { label: "JavaScript", value: "javascript" },
    { label: "TailwindCSS", value: "tailwindcss" },
    { label: "CSS", value: "css" },
  ];

  const { setFieldValue } = useFormikContext();

  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });

  const {
    data: collections,
    isLoading: isLoadingCollections,
    isError: isErrorCollections,
  } = useQuery({ queryKey: ["collections"], queryFn: fetchCollections });

  const handleTagsChange = (
    updatedTags: { label: string; value: string }[]
  ) => {
    setTags(updatedTags);
    setFieldValue(
      "tags",
      updatedTags.map((tag) => tag.value)
    );
  };

  const handleCollectionsChange = (
    updatedCollections: { label: string; value: string }[]
  ) => {
    setCollectionsTags(updatedCollections);
    setFieldValue(
      "collections",
      updatedCollections.map((coll) => coll.value)
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organisation du produit</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="title">Catégorie</Label>
          {isLoadingCategories ? (
            <p>Chargement des catégories...</p>
          ) : isErrorCategories ? (
            <p>Une erreur est survenue lors du chargement des catégories.</p>
          ) : (
            <InteractiveSelect
              categories={categories}
              value={selectedCategory}
              onChange={(category) => {
                setSelectedCategory(category);
                // Update Formik value
                setFieldValue("category", category.id);
              }}
            />
            // <InteractiveSelect value={selectedItem} onChange={handleChange}>
            //   <SelectList
            //     list={categories.map((cat: any) => ({
            //       label: cat.name,
            //       value: cat.id,
            //     }))}
            //     onSelect={(item: { value: string; label: string }) => {
            //       setSelectedItem({ value: item.value, label: item.label });
            //     }}
            //   />
            // </InteractiveSelect>
          )}
        </div>

        <div className="space-y-1">
          {/*<Label htmlFor="title">Type de produit</Label>
          <Input
            id="title"
            placeholder="Publication instantanée"
            // {...register("title")}
            // error={errors.title?.message}
          />*/}
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
          {isLoadingCollections ? (
            <p>Chargement des collections...</p>
          ) : isErrorCollections ? (
            <p>Une erreur est survenue lors du chargement des collections.</p>
          ) : (
            <TagInputOOTB
              suggestions={collections.map((coll: any) => ({
                label: coll.name,
                value: coll.id,
              }))}
              selectedTags={collectionsTags}
              onTagsChange={(updatedTags) => {
                handleCollectionsChange(updatedTags);
              }}
              isAddPossible={false}
            />
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="title">Tags</Label>
          <TagInputOOTB
            suggestions={suggestions}
            selectedTags={tags}
            onTagsChange={handleTagsChange}
            isAddPossible={true}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFormOrganisation;
