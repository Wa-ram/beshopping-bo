"use client";
import { Label } from "@/components/ui/label";
import { TagInputOOTB } from "@/components/ui/tag-input-ootb";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/lib/api/categories";
import { fetchCollections } from "@/lib/api/collections";
import { InteractiveSelect } from "@/components/ui/category-select";
import { useFormikContext } from "formik";
import { ProductFormValues } from "@/lib/types/product";
import { APICollection } from "@/lib/types/collection";
import { APICategory } from "@/lib/types/category";

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

  const { setFieldValue, errors } = useFormikContext<ProductFormValues>();

  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery<APICategory[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const {
    data: collections,
    isLoading: isLoadingCollections,
    isError: isErrorCollections,
  } = useQuery<APICollection[]>({
    queryKey: ["collections"],
    queryFn: fetchCollections,
  });

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
          {!isLoadingCategories && !isErrorCategories && categories && (
            <InteractiveSelect
              categories={categories}
              value={selectedCategory}
              onChange={(category) => {
                setSelectedCategory(category);
                setFieldValue("category", category.id);
              }}
            />
          )}
          {errors.category && (
            <div className="text-red-500">{errors.category as ReactNode}</div>
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
              taux d&apos;imposition
            </Link>
          </p>
        </div>

        <div className="space-y-1">
          <Label htmlFor="title">Collection</Label>
          {!isLoadingCollections && !isErrorCollections && collections && (
            <TagInputOOTB
              suggestions={collections.map((coll) => ({
                label: coll.name,
                value: String(coll.id),
              }))}
              selectedTags={collectionsTags}
              onTagsChange={handleCollectionsChange}
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
