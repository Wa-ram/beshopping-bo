"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "./input";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  id: number;
  name: string;
  parent_id: number | null;
  children: Category[];
}

interface SelectListProps {
  categories: Category[];
  onSelect: (category: Category) => void;
  onBack?: () => void;
  showBack?: boolean;
  filter?: string;
}

export const SelectList: React.FC<SelectListProps> = ({
  categories,
  onSelect,
  onBack,
  showBack = false,
  filter = "",
}) => {
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-md mt-2 absolute w-full bg-white z-50">
      {showBack && (
        <div
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-sm text-gray-600"
          onClick={onBack}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Retour
        </div>
      )}
      {filteredCategories.length > 0 ? (
        filteredCategories.map((category) => (
          <div
            key={category.id}
            className={cn(
              "px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between",
              category.children?.length > 0 && "font-medium"
            )}
            onClick={() => onSelect(category)}
          >
            <span>{category.name}</span>
            {category.children?.length > 0 && (
              <span className="text-xs text-gray-500">
                ({category.children.length})
              </span>
            )}
          </div>
        ))
      ) : (
        <div className="px-4 py-2 text-gray-500">Aucun résultat trouvé.</div>
      )}
    </div>
  );
};

interface InteractiveSelectProps {
  categories: Category[];
  value: { id: number; name: string } | null;
  onChange: (category: { id: number; name: string }) => void;
}

export const InteractiveSelect: React.FC<InteractiveSelectProps> = ({
  categories,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [currentCategories, setCurrentCategories] =
    useState<Category[]>(categories);
  const [navigationStack, setNavigationStack] = useState<Category[][]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset to initial categories when component mounts or categories prop changes
    setCurrentCategories(categories);
    setNavigationStack([]);
  }, [categories]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    if (!isOpen) setIsOpen(true);
  };

  const handleSelect = (category: Category) => {
    if (category.children?.length > 0) {
      // Navigate to subcategories
      setNavigationStack([...navigationStack, currentCategories]);
      setCurrentCategories(category.children);
      setFilter("");
    } else {
      // Select the category
      onChange({ id: category.id, name: category.name });
      setFilter(category.name);
      setIsOpen(false);
      // Reset navigation
      setCurrentCategories(categories);
      setNavigationStack([]);
    }
  };

  const handleBack = () => {
    if (navigationStack.length > 0) {
      const previousCategories = navigationStack[navigationStack.length - 1];
      setCurrentCategories(previousCategories);
      setNavigationStack(navigationStack.slice(0, -1));
      setFilter("");
    }
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        // Reset navigation when closing
        setCurrentCategories(categories);
        setNavigationStack([]);
        // Restore selected value in input if exists
        if (value) {
          setFilter(value.name);
        } else {
          setFilter("");
        }
      }
    },
    [categories, value]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [value, handleClickOutside]);

  // Initialize input value with selected category name
  useEffect(() => {
    if (value) {
      setFilter(value.name);
    }
  }, [value]);

  return (
    <div className="relative" ref={containerRef}>
      <Input
        value={filter}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder="Sélectionnez une catégorie"
      />
      {isOpen && (
        <SelectList
          categories={currentCategories}
          onSelect={handleSelect}
          onBack={navigationStack.length > 0 ? handleBack : undefined}
          showBack={navigationStack.length > 0}
          filter={filter}
        />
      )}
    </div>
  );
};
