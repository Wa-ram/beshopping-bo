import React, {
  useState,
  cloneElement,
  ReactElement,
  useRef,
  useEffect,
} from "react";
import { Input } from "./input";

interface SelectListProps {
  list: { label: string; value: string }[];
  onSelect: (item: { label: string; value: string }) => void;
  filter?: string; // Facultatif
}

export const SelectList: React.FC<SelectListProps> = ({
  list,
  onSelect,
  filter = "",
}) => {
  const filteredList = list.filter((item) =>
    item.label.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-md mt-2 absolute w-full bg-white">
      {filteredList.length > 0 ? (
        filteredList.map((item) => (
          <div
            key={item.value}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelect(item)}
          >
            {item.label}
          </div>
        ))
      ) : (
        <div className="px-4 py-2 text-gray-500">Aucun résultat trouvé.</div>
      )}
    </div>
  );
};

interface InteractiveSelectProps {
  value: { label: string; value: string } | null;
  onChange: (item: { label: string; value: string }) => void;
  children: ReactElement<SelectListProps>;
}

export const InteractiveSelect: React.FC<InteractiveSelectProps> = ({
  // value,
  onChange,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    if (!isOpen) setIsOpen(true);
  };

  const handleSelect = (item: { label: string; value: string }) => {
    onChange(item);
    setFilter(item.label);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative" ref={containerRef}>
      <Input
        value={filter}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder="Sélectionnez une option"
      />
      {isOpen &&
        cloneElement(children, {
          filter,
          onSelect: handleSelect,
        })}
    </div>
  );
};
