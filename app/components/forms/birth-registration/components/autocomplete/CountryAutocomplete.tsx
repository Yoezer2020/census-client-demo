"use client";

import BaseAutocompleteField from "./BaseAutocompleteField";

interface Country {
  id: string;
  name: string;
}

interface CountryAutocompleteProps {
  value: string;
  options: Country[];
  error?: string;
  onSelect: (value: string, selected?: Country) => void;
}

export default function CountryAutocomplete({
  value,
  options,
  error,
  onSelect,
}: CountryAutocompleteProps) {
  return (
    <BaseAutocompleteField
      label="Country of Birth"
      required
      value={value}
      options={options}
      placeholder="Start typing country"
      error={error}
      listId="country-options"
      onSelect={onSelect}
    />
  );
}
