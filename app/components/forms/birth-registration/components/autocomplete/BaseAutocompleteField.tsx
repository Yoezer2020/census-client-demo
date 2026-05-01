"use client";

import { useMemo, useState } from "react";
import { Input } from "../../ui/FormFields";
import { cn } from "@/lib/utils";

interface AutocompleteOption {
  id: string;
  name: string;
}

interface BaseAutocompleteFieldProps {
  label: string;
  value: string;
  options: AutocompleteOption[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  listId: string;
  onSelect: (value: string, selected?: AutocompleteOption) => void;
}

export default function BaseAutocompleteField({
  label,
  value,
  options,
  placeholder,
  required,
  error,
  onSelect,
}: BaseAutocompleteFieldProps) {
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = useMemo(() => {
    const query = value.trim().toLowerCase();
    if (!query) return options.slice(0, 20);
    return options
      .filter((item) => item.name.toLowerCase().includes(query))
      .slice(0, 20);
  }, [options, value]);

  return (
    <div className="relative">
      <Input
        label={label}
        required={required}
        value={value}
        placeholder={placeholder}
        onFocus={() => setIsOpen(true)}
        onBlur={() => {
          setTimeout(() => setIsOpen(false), 120);
        }}
        onChange={(e) => {
          const nextValue = e.target.value;
          const selected = options.find((item) => item.name === nextValue);
          onSelect(nextValue, selected);
          setIsOpen(true);
        }}
        error={error}
      />

      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-20 mt-1 w-full max-h-56 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          {filteredOptions.map((item) => (
            <button
              key={item.id}
              type="button"
              className={cn(
                "w-full px-3 py-2 text-left text-sm hover:bg-gray-50",
                value === item.name && "bg-gray-50 font-medium",
              )}
              onMouseDown={(event) => {
                event.preventDefault();
                onSelect(item.name, item);
                setIsOpen(false);
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}

      {isOpen && value.trim().length > 0 && filteredOptions.length === 0 && (
        <div className="absolute z-20 mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 shadow-lg">
          No matches found
        </div>
      )}
    </div>
  );
}
