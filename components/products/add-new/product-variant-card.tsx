import { ReactNode, useState } from "react";
import { Plus, AlertCircle } from "lucide-react";
import { useFormikContext } from "formik";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VariantOption } from "./variant-option";
import { VariantTable } from "./variant-table";
import type {
  VariantOption as VariantOptionType,
  VariantCombination,
  VariantCombinationItem,
} from "@/lib/types/product";

interface FormValues {
  variants: VariantCombination[];
  price?: string;
  quantity?: string;
}

export function ProductVariantCard() {
  const { errors, setFieldValue, values } = useFormikContext<FormValues>();
  const [options, setOptions] = useState<VariantOptionType[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Helper function to get variant errors
  const getVariantErrors = () => {
    if (!errors.variants) return null;
    if (typeof errors.variants === "string") return errors.variants;

    const variantErrors = (errors.variants as Array<Record<string, string>>)
      ?.map((error) => {
        if (typeof error === "string") return error;
        return Object.values(error || {}).filter(Boolean)[0];
      })
      .filter(Boolean);

    return variantErrors.length > 0 ? variantErrors : null;
  };

  const variantErrors = getVariantErrors();

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
    if (currentOptions.length === 0) {
      setFieldValue("variants", []);
      return;
    }

    const hasValidOptions = currentOptions.every(
      (option) => option.name && option.values.length > 0
    );

    if (!hasValidOptions) {
      setFieldValue("variants", []);
      return;
    }

    const generateCombinations = (
      options: VariantOptionType[],
      current: VariantCombinationItem[] = [],
      index: number = 0
    ): VariantCombinationItem[][] => {
      if (index === options.length) {
        return [current];
      }

      const combinations: VariantCombinationItem[][] = [];
      const option = options[index];

      for (const value of option.values) {
        combinations.push(
          ...generateCombinations(
            options,
            [...current, { name: option.name, value }],
            index + 1
          )
        );
      }

      return combinations;
    };

    const combinations = generateCombinations(currentOptions);
    const newVariants = combinations.map((combination) => {
      const variantId = combination
        .map((item) => `${item.name}-${item.value}`)
        .join("-");
      // Rechercher une variante existante avec le même ID
      const existingVariant = values.variants?.find((v) => v.id === variantId);

      return {
        id: variantId,
        combination,
        // Préserver les valeurs existantes ou utiliser les valeurs par défaut
        price: existingVariant?.price || values.price || "",
        stock_quantity:
          existingVariant?.stock_quantity || values.quantity || "",
        sku: existingVariant?.sku || "",
      };
    });

    setFieldValue("variants", newVariants);
  };

  const updateVariant = (
    id: string,
    field: "price" | "stock_quantity" | "sku",
    value: string
  ) => {
    const newVariants = values.variants.map((variant) =>
      variant.id === id ? { ...variant, [field]: value } : variant
    );
    setFieldValue("variants", newVariants);
  };

  const handleSetEditing = (index: number | null) => {
    setEditingIndex(index);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span>Product Variants</span>
            <Button
              onClick={addOption}
              variant="outline"
              className="flex items-center gap-2"
              type="button"
            >
              <Plus className="h-4 w-4" />
              Add Option
            </Button>
          </div>
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

        {values.variants?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Variant Combinations</h3>
            {variantErrors && (
              <div className="flex items-start gap-2 text-sm text-destructive font-normal">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  {Array.isArray(variantErrors) ? (
                    variantErrors.map((error, index) => (
                      <span key={index}>{error as ReactNode}</span>
                    ))
                  ) : (
                    <span>{variantErrors}</span>
                  )}
                </div>
              </div>
            )}
            <VariantTable
              variants={values.variants}
              onVariantUpdate={updateVariant}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
