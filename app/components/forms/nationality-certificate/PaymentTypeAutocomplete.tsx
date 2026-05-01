"use client";

import { useState, useEffect } from "react";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Loader2 } from "lucide-react";

// Mock delay helper
const simulateApiDelay = (ms: number = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock payment types
const mockPaymentTypes = [
  {
    id: "nat-payment-1",
    payment_type: "NATIONALITY_CERTIFICATE",
    amount: 100,
  },
  {
    id: "nat-payment-2",
    payment_type: "URGENT_PROCESSING",
    amount: 200,
  },
  {
    id: "nat-payment-3",
    payment_type: "INTERNATIONAL_USE",
    amount: 300,
  },
];

interface PaymentServiceType {
  id: string;
  payment_type: string;
  amount: number;
}

interface PaymentTypeAutocompleteProps {
  value: string;
  onSelect: (value: string, selected: PaymentServiceType | null) => void;
  error?: string;
}

export default function PaymentTypeAutocomplete({
  value,
  onSelect,
  error,
}: PaymentTypeAutocompleteProps) {
  const [paymentTypes, setPaymentTypes] = useState<PaymentServiceType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPaymentTypes = async () => {
      setIsLoading(true);
      try {
        await simulateApiDelay(300);
        setPaymentTypes(mockPaymentTypes);

        // Auto-select "NATIONALITY_CERTIFICATE" if not already selected
        const nationalityType = mockPaymentTypes.find(
          (type) => type.payment_type === "NATIONALITY_CERTIFICATE",
        );
        if (nationalityType && !value) {
          onSelect(nationalityType.id, nationalityType);
        }
      } catch (error) {
        console.error("Failed to fetch payment types:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentTypes();
  }, []);

  // Helper function to format payment type for display
  const formatPaymentType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
      <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
        Payment Type <span className="text-destructive">*</span>
      </Label>
      {isLoading ? (
        <div className="flex items-center justify-center h-11 border border-gray-200 rounded-lg bg-gray-50">
          <Loader2 className="size-4 animate-spin text-gray-400" />
          <span className="ml-2 text-sm text-gray-500">Loading...</span>
        </div>
      ) : (
        <Select
          value={value}
          disabled
          onValueChange={(selectedId) => {
            const selected =
              paymentTypes.find((type) => type.id === selectedId) || null;
            onSelect(selectedId, selected);
          }}
        >
          <SelectTrigger
            className={`h-11 rounded-lg bg-gray-50 cursor-not-allowed ${error ? "border-red-300 bg-red-50/30" : ""}`}
          >
            <SelectValue placeholder="Select payment type" />
          </SelectTrigger>
          <SelectContent>
            {paymentTypes.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                <div className="flex items-center justify-between gap-4">
                  <span>{formatPaymentType(type.payment_type)}</span>
                  <span className="text-xs text-gray-500">
                    {type.currency} {type.amount}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <p className="text-xs text-gray-500 pl-0.5">
        Auto-selected for nationality certificate applications
      </p>
      {error && (
        <p className="text-destructive text-[11px] font-semibold pl-0.5">
          {error}
        </p>
      )}
      {value && (
        <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-700">
            <span className="font-semibold">Service Fee:</span>{" "}
            {paymentTypes.find((t) => t.id === value)?.currency}{" "}
            {paymentTypes.find((t) => t.id === value)?.amount}
          </p>
        </div>
      )}
    </div>
  );
}
