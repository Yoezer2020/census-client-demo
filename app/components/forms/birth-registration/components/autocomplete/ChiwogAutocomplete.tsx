"use client";

import BaseAutocompleteField from "./BaseAutocompleteField";

interface Chiwog {
  id: string;
  name: string;
}

interface ChiwogAutocompleteProps {
  value: string;
  options: Chiwog[];
  onSelect: (value: string, selected?: Chiwog) => void;
  error?: string;
}

export default function ChiwogAutocomplete({
  value,
  options,
  onSelect,
  error,
}: ChiwogAutocompleteProps) {
  return (
    <BaseAutocompleteField
      label="Chiwog"
      value={value}
      options={options}
      placeholder="Type to search chiwog"
      listId="chiwog-options"
      error={error}
      onSelect={onSelect}
    />
  );
}
