"use client";

import BaseAutocompleteField from "./BaseAutocompleteField";

interface Gewog {
  id: string;
  name: string;
}

interface GewogAutocompleteProps {
  value: string;
  options: Gewog[];
  onSelect: (value: string, selected?: Gewog) => void;
  error?: string;
}

export default function GewogAutocomplete({
  value,
  options,
  onSelect,
  error,
}: GewogAutocompleteProps) {
  return (
    <BaseAutocompleteField
      label="Gewog"
      value={value}
      options={options}
      placeholder="Type to search gewog"
      listId="gewog-options"
      error={error}
      onSelect={onSelect}
    />
  );
}
