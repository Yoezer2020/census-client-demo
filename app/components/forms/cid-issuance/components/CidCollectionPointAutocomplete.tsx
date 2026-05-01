"use client";

import { useMemo, useState, useEffect } from "react";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2, MapPin } from "lucide-react";
import CidCollectionPointsService from "@/lib/services/common-service/cid-collection-points/cid-collection-points";

interface CollectionPointOption {
  id: string;
  name: string;
  sl_no: number;
  createdAt?: string;
  updatedAt?: string;
}

interface CidCollectionPointAutocompleteProps {
  value: string;
  onSelect: (value: string, selected?: CollectionPointOption) => void;
  error?: string;
}

export default function CidCollectionPointAutocomplete({
  value,
  onSelect,
  error,
}: CidCollectionPointAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<CollectionPointOption[]>([]);

  // Fetch collection points when component mounts
  useEffect(() => {
    const fetchCollectionPoints = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Dummy collection points
        const result = [
          {
            id: "1",
            name: "Thimphu Dzongkhag",
            place_of_collection: "uuid-1",
            sl_no: 1,
          },
          {
            id: "2",
            name: "Paro Dzongkhag",
            place_of_collection: "uuid-2",
            sl_no: 2,
          },
          {
            id: "3",
            name: "Punakha Dzongkhag",
            place_of_collection: "uuid-3",
            sl_no: 3,
          },
          {
            id: "4",
            name: "Bumthang Dzongkhag",
            place_of_collection: "uuid-4",
            sl_no: 4,
          },
          {
            id: "5",
            name: "Thimphu Thromde",
            place_of_collection: "uuid-5",
            sl_no: 5,
          },
          {
            id: "6",
            name: "DoCSS HQ",
            place_of_collection: "uuid-6",
            sl_no: 6,
          },
        ];

        setOptions(result);
      } catch (error) {
        console.error("Error fetching CID collection points:", error);
        setOptions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollectionPoints();
  }, []);

  const filteredOptions = useMemo(() => {
    if (!value.trim()) return options;

    return options.filter((option) =>
      option.name.toLowerCase().includes(value.toLowerCase()),
    );
  }, [options, value]);

  return (
    <div className="relative space-y-2">
      <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5 flex items-center gap-2">
        <MapPin className="size-4" />
        Collection Point <span className="text-destructive">*</span>
      </Label>
      <div className="relative">
        <Input
          value={value}
          placeholder="Type to search collection point"
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
            No collection points found
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
