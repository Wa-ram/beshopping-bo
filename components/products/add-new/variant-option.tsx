"use client";

import { useState } from "react";
import { Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface VariantOptionProps {
  name: string;
  values: string[];
  isEditing: boolean;
  onSetEditing: (editing: boolean) => void;
  onNameChange: (name: string) => void;
  onAddValue: (value: string) => void;
  onRemoveValue: (index: number) => void;
  onRemoveOption: () => void;
}

export function VariantOption({
  name,
  values,
  isEditing,
  onSetEditing,
  onNameChange,
  onAddValue,
  onRemoveValue,
  onRemoveOption,
}: VariantOptionProps) {
  const [newValue, setNewValue] = useState("");

  const handleAddValue = () => {
    if (!newValue.trim()) return;
    onAddValue(newValue);
    setNewValue("");
  };

  return (
    <div className="space-y-4 border-b pb-4">
      <div className="flex items-center justify-between">
        {isEditing ? (
          <div className="flex items-center gap-4">
            <Input
              placeholder="Option Name (e.g., Color, Size)"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className="max-w-xs"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSetEditing(false)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemoveOption}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <span className="font-medium">{name || "Unnamed Option"}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSetEditing(true)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {isEditing && (
        <div className="flex gap-2">
          <Input
            placeholder="Add value (e.g., Red, XL)"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleAddValue();
              }
            }}
            className="max-w-xs"
          />
          <Button
            variant="secondary"
            onClick={handleAddValue}
          >
            Add
          </Button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {values.map((value, valueIndex) => (
          <Badge
            key={valueIndex}
            variant="secondary"
            className="flex items-center gap-2"
          >
            {value}
            {isEditing && (
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0"
                onClick={() => onRemoveValue(valueIndex)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </Badge>
        ))}
      </div>
    </div>
  );
}