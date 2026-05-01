"use client";

import { useMemo, useState, useEffect } from "react";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// Mock delay helper
const simulateApiDelay = (ms: number = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

interface PurposeOption {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

interface RelationshipPurposeAutocompleteProps {
  value: string;
  onSelect: (value: string, selected?: PurposeOption) => void;
  error?: string;
}

export default function RelationshipPurposeAutocomplete({
  value,
  onSelect,
  error,
}: RelationshipPurposeAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<PurposeOption[]>([]);

  // Mock purposes data
  const mockPurposes: PurposeOption[] = [
    { id: "1", name: "Marriage" },
    { id: "2", name: "Divorce" },
    { id: "3", name: "Legal Proceedings" },
    { id: "4", name: "Property Transfer" },
    { id: "5", name: "Immigration" },
    { id: "6", name: "Education" },
    { id: "7", name: "Employment" },
    { id: "8", name: "Other" },
  ];

  // Fetch purposes when component mounts or when search value changes
  useEffect(() => {
    const fetchPurposes = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await simulateApiDelay(300);

        const searchQuery = value.trim().toLowerCase();

        // Filter mock purposes based on search
        const filtered = searchQuery
          ? mockPurposes.filter((p) =>
              p.name.toLowerCase().includes(searchQuery),
            )
          : mockPurposes;

        setOptions(filtered);
      } catch (error) {
        console.error(
          "Error fetching relationship certificate purposes:",
          error,
        );
        setOptions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchPurposes();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [value]);

  const filteredOptions = useMemo(() => {
    return options.slice(0, 20);
  }, [options]);

  return (
    <div className="relative space-y-2">
      <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
        Certificate Purpose <span className="text-destructive">*</span>
      </Label>
      <div className="relative">
        <Input
          value={value}
          placeholder="Type to search purpose (e.g. Marriage Registration)"
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
          className={cn(
            "h-11 rounded-lg transition-all",
            error
              ? "border-red-300 bg-red-50/30"
              : value && options.some((o) => o.name === value)
                ? "border-green-300"
                : "border-gray-200",
          )}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="size-4 animate-spin text-gray-400" />
          </div>
        )}
      </div>

      {isOpen && filteredOptions.length > 0 && !isLoading && (
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

      {isOpen &&
        !isLoading &&
        value.trim().length > 0 &&
        filteredOptions.length === 0 && (
          <div className="absolute z-20 mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-400 text-center shadow-lg">
            No purposes found
          </div>
        )}

      {error && (
        <p className="text-destructive text-[11px] font-semibold pl-0.5">
          {error}
        </p>
      )}
    </div>
  );
}
