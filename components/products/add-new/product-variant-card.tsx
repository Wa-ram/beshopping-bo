"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VariantOption } from "./variant-option";
import { VariantTable } from "./variant-table";
import type {
  VariantOption as VariantOptionType,
  VariantCombination,
} from "@/lib/types/product";

export function ProductVariantCard() {
  const [options, setOptions] = useState<VariantOptionType[]>([]);
  const [variants, setVariants] = useState<VariantCombination[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addOption = () => {
    const newIndex = options.length;
    setOptions([...options, { name: "", values: [] }]);
    setEditingIndex(newIndex);
  };

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    generateVariants(newOptions);
    setEditingIndex(null);
  };

  const updateOptionName = (index: number, name: string) => {
    const newOptions = [...options];
    newOptions[index].name = name;
    setOptions(newOptions);
  };

  const addValueToOption = (index: number, value: string) => {
    const newOptions = [...options];
    if (!newOptions[index].values.includes(value)) {
      newOptions[index].values.push(value);
      setOptions(newOptions);
      generateVariants(newOptions);
    }
  };

  const removeValue = (optionIndex: number, valueIndex: number) => {
    const newOptions = [...options];
    newOptions[optionIndex].values.splice(valueIndex, 1);
    setOptions(newOptions);
    generateVariants(newOptions);
  };

  const generateVariants = (currentOptions: VariantOptionType[]) => {
    const generateCombinations = (
      options: VariantOptionType[],
      current: Record<string, string> = {},
      index: number = 0
    ): Record<string, string>[] => {
      if (index === options.length) {
        return [current];
      }

      const combinations: Record<string, string>[] = [];
      const option = options[index];

      for (const value of option.values) {
        combinations.push(
          ...generateCombinations(
            options,
            { ...current, [option.name]: value },
            index + 1
          )
        );
      }

      return combinations;
    };

    const combinations = generateCombinations(currentOptions);
    const newVariants = combinations.map((combination) => ({
      id: Object.values(combination).join("-"),
      combination,
      price: "",
      available: "",
      onHand: "",
      sku: "",
    }));

    setVariants(newVariants);
  };

  const updateVariant = (
    id: string,
    field: "price" | "available" | "onHand" | "sku",
    value: string
  ) => {
    const newVariants = variants.map((variant) =>
      variant.id === id ? { ...variant, [field]: value } : variant
    );
    setVariants(newVariants);
  };

  const handleSetEditing = (index: number | null) => {
    setEditingIndex(index);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Product Variants</span>
          <Button
            onClick={addOption}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Option
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {options.map((option, index) => (
          <VariantOption
            key={index}
            name={option.name}
            values={option.values}
            isEditing={editingIndex === index}
            onSetEditing={(editing) => handleSetEditing(editing ? index : null)}
            onNameChange={(name) => updateOptionName(index, name)}
            onAddValue={(value) => addValueToOption(index, value)}
            onRemoveValue={(valueIndex) => removeValue(index, valueIndex)}
            onRemoveOption={() => removeOption(index)}
          />
        ))}

        {variants.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Variant Combinations</h3>
            <VariantTable
              options={options}
              variants={variants}
              onVariantUpdate={updateVariant}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
