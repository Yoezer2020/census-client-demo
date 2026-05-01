"use client";

import BaseAutocompleteField from "./BaseAutocompleteField";

interface City {
  id: string;
  name: string;
}

interface CityAutocompleteProps {
  value: string;
  options: City[];
  error?: string;
  onSelect: (value: string, selected?: City) => void;
}

export default function CityAutocomplete({
  value,
  options,
  error,
  onSelect,
}: CityAutocompleteProps) {
  return (
    <BaseAutocompleteField
      label="City"
      required
      value={value}
      options={options}
      placeholder="Start typing city"
      error={error}
      listId="city-options"
      onSelect={onSelect}
    />
  );
}
