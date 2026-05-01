"use client";

import { useMemo, useState, useEffect } from "react";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import CidApplicationReasonsService from "@/lib/services/common-service/cid-application-reasons/cid-application-reasons";

interface ReasonOption {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CidApplicationReasonAutocompleteProps {
  value: string;
  onSelect: (value: string, selected?: ReasonOption) => void;
  error?: string;
}

export default function CidApplicationReasonAutocomplete({
  value,
  onSelect,
  error,
}: CidApplicationReasonAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<ReasonOption[]>([]);

  // Fetch reasons when component mounts or when search value changes
  useEffect(() => {
    const fetchReasons = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Dummy reasons data
        const result = {
          data: [
            { id: "1", name: "First Time Issuance", reasons_id: "uuid-1" },
            { id: "2", name: "Lost", reasons_id: "uuid-2" },
            { id: "3", name: "Damaged", reasons_id: "uuid-3" },
            { id: "4", name: "Stolen", reasons_id: "uuid-4" },
            { id: "5", name: "Renewal", reasons_id: "uuid-5" },
          ],
        };

        // Handle both paginated and non-paginated responses
        if (result.data) {
          setOptions(result.data);
        } else if (Array.isArray(result)) {
          setOptions(result);
        } else {
          setOptions([]);
        }
      } catch (error) {
        console.error("Error fetching CID application reasons:", error);
        setOptions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchReasons();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [value]);

  const filteredOptions = useMemo(() => {
    return options.slice(0, 20);
  }, [options]);

  return (
    <div className="relative space-y-2">
      <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
        Reason for Application <span className="text-destructive">*</span>
      </Label>
      <div className="relative">
        <Input
          value={value}
          placeholder="Type to search reason (e.g. Lost, Damaged)"
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
            No reasons found
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
