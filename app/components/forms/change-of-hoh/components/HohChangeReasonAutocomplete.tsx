"use client";

import { useMemo, useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { cn } from "@/lib/utils";

interface ReasonOption {
  id: string;
  name: string;
  [key: string]: unknown;
}

interface HohChangeReasonAutocompleteProps {
  value: string;
  options: ReasonOption[];
  onSelect: (value: string, selected?: ReasonOption) => void;
  error?: string;
}

export default function HohChangeReasonAutocomplete({
  value,
  options,
  onSelect,
  error,
}: HohChangeReasonAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);

  const safeOptions = Array.isArray(options) ? options : [];

  const filteredOptions = useMemo(() => {
    const query = value.trim().toLowerCase();
    if (!query) return safeOptions.slice(0, 20);
    return safeOptions
      .filter((item) => item.name.toLowerCase().includes(query))
      .slice(0, 20);
  }, [safeOptions, value]);

  return (
    <div className="relative space-y-2">
      <Label className="text-sm font-semibold text-gray-700">
        Reason for Change <span className="text-red-500">*</span>
      </Label>
      <Input
        value={value}
        placeholder="Type to search reason (e.g. death, migration)"
        onFocus={() => setIsOpen(true)}
        onBlur={() => {
          setTimeout(() => setIsOpen(false), 120);
        }}
        onChange={(e) => {
          const nextValue = e.target.value;
          const selected = safeOptions.find((item) => item.name === nextValue);
          onSelect(nextValue, selected);
          setIsOpen(true);
        }}
        className={cn(
          "rounded-xl border-2 transition-all focus:border-primary",
          error
            ? "border-red-300 bg-red-50/30"
            : value && safeOptions.some((o) => o.name === value)
              ? "border-green-300"
              : "border-gray-200",
        )}
      />

      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-20 mt-1 w-full max-h-56 overflow-auto rounded-xl border border-gray-200 bg-white shadow-lg">
          {filteredOptions.map((item) => (
            <button
              key={item.id}
              type="button"
              className={cn(
                "w-full px-4 py-2.5 text-left text-sm hover:bg-primary/5 transition-colors first:rounded-t-xl last:rounded-b-xl",
                value === item.name && "bg-primary/5 font-medium",
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
        <div className="absolute z-20 mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-400 text-center shadow-lg">
          No reasons found
        </div>
      )}

      {error && <p className="text-red-500 text-xs font-semibold">{error}</p>}
    </div>
  );
}
