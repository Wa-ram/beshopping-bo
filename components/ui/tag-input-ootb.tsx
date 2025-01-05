import React, { useEffect, useRef, useState } from "react";
import { Input } from "./input";

interface TagInputOOTBProps {
  suggestions?: { label: string; value: string }[]; // Liste des suggestions.
  selectedTags: { label: string; value: string }[]; // Tags sélectionnés.
  onTagsChange: (tags: { label: string; value: string }[]) => void; // Callback pour mettre à jour les tags.
  isAddPossible: boolean; // Indique si l'utilisateur peut ajouter un nouveau tag.
}

export const TagInputOOTB: React.FC<TagInputOOTBProps> = ({
  suggestions,
  selectedTags,
  onTagsChange,
  isAddPossible,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState(
    suggestions || []
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Gère le changement de l'input.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsDropdownOpen(true);

    const filtered = suggestions?.filter(
      (s) =>
        s.label.toLowerCase().includes(value.toLowerCase()) &&
        !selectedTags.some((tag) => tag.value === s.value)
    );
    if (filtered) setFilteredSuggestions(filtered);
  };

  // Ajoute un tag.
  const addTag = (tag: { label: string; value: string }) => {
    if (selectedTags.includes(tag)) {
      return setIsDropdownOpen(false);
    }
    onTagsChange([...selectedTags, tag]);
    setInputValue("");
    setIsDropdownOpen(false);
  };

  // Supprime un tag.
  const removeTag = (value: string) => {
    const updatedTags = selectedTags.filter((tag) => tag.value !== value);
    onTagsChange(updatedTags);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col relative" ref={containerRef}>
      {/* Input */}
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsDropdownOpen(true)}
        placeholder="Ajoutez un tag..."
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Menu déroulant */}
      {isDropdownOpen && filteredSuggestions.length > 0 && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded-md mt-12 w-full shadow-lg max-h-40 overflow-y-auto">
          {filteredSuggestions?.map((suggestion) => (
            <div
              key={suggestion.value}
              onClick={() => addTag(suggestion)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              {suggestion.label}
            </div>
          ))}
        </div>
      )}

      {/* Aucun résultat */}
      {isDropdownOpen && filteredSuggestions?.length === 0 && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded-md mt-12 w-full shadow-lg">
          {isAddPossible && inputValue !== "" && (
            <div
              className="px-4 py-2 text-gray-500 cursor-pointer"
              onClick={() => {
                const newTag = {
                  label: inputValue,
                  value: inputValue.replace(" ", "-").toLowerCase(),
                };

                if (selectedTags.includes(newTag)) {
                  return setIsDropdownOpen(false);
                }

                addTag(newTag);
              }}
            >
              Ajouter &quot;{inputValue}&quot;
            </div>
          )}
          {!isAddPossible && (
            <div className="px-4 py-2 text-gray-500">
              Aucun résultat trouvé.
            </div>
          )}
        </div>
      )}
      {/* Tags affichés à l'extérieur */}
      <div className="flex flex-wrap gap-2 mt-2">
        {selectedTags.map((tag) => (
          <div
            key={tag.value}
            className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm"
          >
            {tag.label}
            <button
              onClick={() => removeTag(tag.value)}
              className="ml-2 text-blue-600 hover:text-blue-800"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
