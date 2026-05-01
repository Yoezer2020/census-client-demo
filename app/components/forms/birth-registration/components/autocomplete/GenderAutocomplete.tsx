"use client";

import BaseAutocompleteField from "./BaseAutocompleteField";

interface Gender {
  id: string;
  name: string;
}

interface GenderAutocompleteProps {
  value: string;
  options: Gender[];
  error?: string;
  onSelect: (value: string, selected?: Gender) => void;
}

export default function GenderAutocomplete({
  value,
  options,
  error,
  onSelect,
}: GenderAutocompleteProps) {
  return (
    <BaseAutocompleteField
      label="Gender"
      required
      value={value}
      options={options}
      placeholder="Start typing gender"
      error={error}
      listId="gender-options"
      onSelect={onSelect}
    />
  );
}
