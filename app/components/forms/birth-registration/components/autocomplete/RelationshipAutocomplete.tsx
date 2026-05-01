"use client";

import { useEffect, useState } from "react";
import BaseAutocompleteField from "./BaseAutocompleteField";

interface Relationship {
  id: string;
  name: string;
}

interface RelationshipAutocompleteProps {
  value: string;
  options: Relationship[];
  onSelect: (value: string, selected?: Relationship) => void;
  error?: string;
}

export default function RelationshipAutocomplete({
  value,
  options,
  onSelect,
  error,
}: RelationshipAutocompleteProps) {
  const [filteredOptions, setFilteredOptions] =
    useState<Relationship[]>(options);

  useEffect(() => {
    if (!value) {
      setFilteredOptions(options);
      return;
    }

    const filtered = options.filter((option) =>
      option.name.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredOptions(filtered);
  }, [value, options]);

  return (
    <BaseAutocompleteField
      label="Relationship to Child"
      required
      value={value}
      options={filteredOptions}
      onSelect={(selectedValue, selected) =>
        onSelect(selectedValue, selected as Relationship)
      }
      placeholder="Select relationship"
      listId="relationship-list"
      error={error}
    />
  );
}
