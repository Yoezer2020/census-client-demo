"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { Users, Loader2, CheckCircle, Search, AlertCircle } from "lucide-react";
import { ChangeOfHoHData } from "@/lib/validations/change-of-hoh.schema";
import HohChangeReasonAutocomplete from "../components/HohChangeReasonAutocomplete";

interface Step3NewHoHProps {
  data: Partial<ChangeOfHoHData>;
  updateData: (data: Partial<ChangeOfHoHData>) => void;
  errors: Record<string, string>;
}

interface ReasonOption {
  id: string;
  name: string;
  [key: string]: unknown;
}

interface CitizenSummary {
  cid_no: string;
  household_no: string;
  tharm_no: string;
  household_information: {
    id: string;
    hoh_cid_no: string;
    household_no: string;
    house_no: string;
    tharm_no: string;
    dzongkhag_id: string;
    gewog_id: string;
    chiwog_id: string;
    village_id: string;
    nationality: string;
  };
  citizen_details: {
    id: string;
    cid_no: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    name_in_dzongkha: string;
    gender: string;
    date_of_birth: string;
    blood_group: string;
    remarks: string;
  };
}

export default function Step3NewHoH({
  data,
  updateData,
  errors,
}: Step3NewHoHProps) {
  const [lookingUp, setLookingUp] = useState(false);
  const [citizenSummary, setCitizenSummary] = useState<CitizenSummary | null>(
    null,
  );
  const [householdMismatch, setHouseholdMismatch] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Reason options
  const [reasons, setReasons] = useState<ReasonOption[]>([]);
  const [reasonDisplayValue, setReasonDisplayValue] = useState("");

  const cidValue = data.newHohCidNo ?? "";
  const isValidCid = /^\d{11}$/.test(cidValue);

  const handleCidChange = (val: string) => {
    const numeric = val.replace(/\D/g, "").slice(0, 11);
    updateData({
      newHohCidNo: numeric,
      firstName: "",
      middleName: "",
      lastName: "",
      newHohHouseholdMismatch: false,
    });
    setCitizenSummary(null);
    setHouseholdMismatch(false);
    setHasSearched(false);
  };

  // Fetch reasons on mount (Mock)
  const fetchReasons = useCallback(async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock reasons
    const mockReasons = [
      {
        id: "1",
        name: "Death of Head of Household",
      },
      {
        id: "2",
        name: "Resignation of Head of Household",
      },
      {
        id: "3",
        name: "Incapacitation of Head of Household",
      },
      { id: "4", name: "Other" },
    ];
    setReasons(mockReasons);
  }, []);

  useEffect(() => {
    fetchReasons();
  }, [fetchReasons]);

  const handleReasonSelect = (value: string, selected?: ReasonOption) => {
    setReasonDisplayValue(value);
    updateData({ hohChangeReasonId: selected?.id ?? "" });
  };

  const handleSearch = async () => {
    if (!isValidCid) return;

    setLookingUp(true);
    setCitizenSummary(null);
    setHouseholdMismatch(false);
    setHasSearched(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock citizen data - Father CID: 11105001234
    if (cidValue === "11105001234") {
      const mockCitizen = {
        cid_no: "11105001234",
        household_no: "HH-2024-001",
        tharm_no: "T-456",
        household_information: {
          id: "hh1",
          hoh_cid_no: "11234567890", // Mother is current HoH
          household_no: "HH-2024-001",
          house_no: "H-123",
          tharm_no: "T-456",
          dzongkhag_id: "1",
          gewog_id: "1",
          chiwog_id: "1",
          village_id: "1",
          nationality: "Bhutanese",
        },
        citizen_details: {
          id: "c1",
          cid_no: "11105001234",
          first_name: "Karma",
          middle_name: "Tenzin",
          last_name: "Dorji",
          name_in_dzongkha: "ཀརྨ་ བསྟན་འཛིན་ རྡོ་རྗེ།",
          gender: "Male",
          date_of_birth: "1985-03-15",
          blood_group: "B+",
          remarks: "",
        },
      };

      setCitizenSummary(mockCitizen);

      // Check household match
      if (data.householdNo && mockCitizen.household_no !== data.householdNo) {
        setHouseholdMismatch(true);
        updateData({
          newHohCidNo: cidValue,
          firstName: "",
          middleName: "",
          lastName: "",
          newHohHouseholdMismatch: true,
        });
        toast.error("Household mismatch");
      } else {
        setHouseholdMismatch(false);
        updateData({
          newHohCidNo: mockCitizen.cid_no || cidValue,
          firstName: mockCitizen.citizen_details?.first_name || "",
          middleName: mockCitizen.citizen_details?.middle_name || "",
          lastName: mockCitizen.citizen_details?.last_name || "",
          hohCidNo: mockCitizen.household_information?.hoh_cid_no || "",
          houseNo: mockCitizen.household_information?.house_no || "",
          tharmNo: mockCitizen.household_information?.tharm_no || "",
          newHohHouseholdMismatch: false,
        });
        toast.success("Citizen found");
      }
    } else {
      // No record found
      updateData({ firstName: "", middleName: "", lastName: "" });
      toast.error(
        `No record found for CID ${cidValue}. Try 11105001234 (Father)`,
      );
    }

    setLookingUp(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2 mb-8">
        <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Users className="size-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">
          New Head of Household
        </h3>
        <p className="text-gray-500 max-w-md mx-auto text-sm">
          Enter the CID of the person to be designated as the new Head of
          Household.
        </p>
      </div>

      {/* New HoH CID */}
      <div className="space-y-2">
        <Label
          htmlFor="new_hoh_cid"
          className="text-sm font-semibold text-gray-700"
        >
          New HoH CID <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Input
            id="new_hoh_cid"
            inputMode="numeric"
            placeholder="Enter 11-digit CID number"
            value={cidValue}
            onChange={(e) => handleCidChange(e.target.value)}
            maxLength={11}
            className={`rounded-xl border-2 transition-all font-mono ${
              errors.newHohCidNo
                ? "border-red-300 bg-red-50/30"
                : isValidCid && data.firstName
                  ? "border-green-300"
                  : "border-gray-200"
            } focus:border-primary pr-24`}
          />
          <Button
            type="button"
            size="sm"
            onClick={handleSearch}
            disabled={lookingUp || !isValidCid}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 px-3 rounded-lg text-xs font-semibold gap-1.5"
          >
            {lookingUp ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Search className="size-3.5" />
            )}
            Search
          </Button>
        </div>
        <div className="flex justify-between">
          {errors.newHohCidNo ? (
            <p className="text-red-500 text-xs font-semibold">
              {errors.newHohCidNo}
            </p>
          ) : (
            <p className="text-xs text-gray-400">Must be exactly 11 digits</p>
          )}
          <p
            className={`text-xs ${cidValue.length === 11 ? "text-green-600" : "text-gray-400"}`}
          >
            {cidValue.length}/11
          </p>
        </div>
      </div>

      {/* Household mismatch error */}
      {householdMismatch && citizenSummary && (
        <Card className="p-4 border-red-200 bg-red-50/50">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-700">
                New hoh can be proposed only if they share the same household.
              </p>
              <p className="text-xs text-red-500 mt-1">
                The citizen belongs to household{" "}
                <strong>{citizenSummary.household_no}</strong>, but the current
                household is <strong>{data.householdNo}</strong>.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Citizen details (shown when match) */}
      {!householdMismatch && citizenSummary && data.firstName && (
        <Card className="p-5 border-green-100 bg-green-50/30 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="size-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700">
              Citizen Found — Same Household
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-gray-500 uppercase tracking-wide">
                Current HoH CID
              </Label>
              <Input
                value={citizenSummary.household_information?.hoh_cid_no || ""}
                readOnly
                className="bg-white/80 text-gray-600 cursor-not-allowed rounded-xl border-gray-200 font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-gray-500 uppercase tracking-wide">
                Household No
              </Label>
              <Input
                value={citizenSummary.household_information?.household_no || ""}
                readOnly
                className="bg-white/80 text-gray-600 cursor-not-allowed rounded-xl border-gray-200 font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-gray-500 uppercase tracking-wide">
                House No
              </Label>
              <Input
                value={citizenSummary.household_information?.house_no || ""}
                readOnly
                className="bg-white/80 text-gray-600 cursor-not-allowed rounded-xl border-gray-200"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-gray-500 uppercase tracking-wide">
                Tharm No
              </Label>
              <Input
                value={citizenSummary.household_information?.tharm_no || ""}
                readOnly
                className="bg-white/80 text-gray-600 cursor-not-allowed rounded-xl border-gray-200 font-mono"
              />
            </div>
          </div>
        </Card>
      )}

      {/* No record found */}
      {hasSearched && !lookingUp && !citizenSummary && !data.firstName && (
        <Card className="p-4 border-amber-100 bg-amber-50/30">
          <p className="text-sm text-amber-700 font-medium text-center">
            No record found for CID &ldquo;{cidValue}&rdquo;. Please verify the
            CID number.
          </p>
        </Card>
      )}

      {/* HoH Change Reason autocomplete — shown when citizen matches */}
      {!householdMismatch && citizenSummary && data.firstName && (
        <HohChangeReasonAutocomplete
          value={reasonDisplayValue}
          options={reasons}
          onSelect={handleReasonSelect}
          error={errors.hohChangeReasonId}
        />
      )}
    </div>
  );
}
