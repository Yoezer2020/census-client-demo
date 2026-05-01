"use client";

import BaseAutocompleteField from "./BaseAutocompleteField";

interface Dzongkhag {
  id: string;
  name: string;
}

interface DzongkhagAutocompleteProps {
  value: string;
  options: Dzongkhag[];
  onSelect: (value: string, selected?: Dzongkhag) => void;
  error?: string;
}

export default function DzongkhagAutocomplete({
  value,
  options,
  onSelect,
  error,
}: DzongkhagAutocompleteProps) {
  return (
    <BaseAutocompleteField
      label="Dzongkhag"
      value={value}
      options={options}
      placeholder="Type to search dzongkhag"
      listId="dzongkhag-options"
      error={error}
      onSelect={onSelect}
    />
  );
}
