"use client";

import BaseAutocompleteField from "./BaseAutocompleteField";

interface Village {
  id: string;
  name: string;
}

interface VillageAutocompleteProps {
  value: string;
  options: Village[];
  onSelect: (value: string, selected?: Village) => void;
  error?: string;
}

export default function VillageAutocomplete({
  value,
  options,
  onSelect,
  error,
}: VillageAutocompleteProps) {
  return (
    <BaseAutocompleteField
      label="Village"
      value={value}
      options={options}
      placeholder="Type to search village"
      listId="village-options"
      error={error}
      onSelect={onSelect}
    />
  );
}
