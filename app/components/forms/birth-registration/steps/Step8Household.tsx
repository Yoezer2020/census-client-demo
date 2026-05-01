"use client";

import { useEffect, useRef, useState } from "react";
import { useSessionContext } from "@/app/context/SessionContext";
import { toast } from "sonner";
import { BirthRegistrationData } from "@/lib/validations/birth-registration.schema";
import { Card, CardContent } from "@/app/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Label } from "@/app/components/ui/label";
import { Input } from "../ui/FormFields";
import { Button } from "@/app/components/ui/button";
import CitizensDetailService from "@/lib/services/citizen_main_registry_service/citizens-detail/citizens-detail";
import HouseHoldInformationService from "@/lib/services/citizen_main_registry_service/house-hold-information/house-hold-information";
import { cn } from "@/lib/utils";

interface StepProps {
  data: Partial<BirthRegistrationData>;
  updateData: (data: Partial<BirthRegistrationData>) => void;
  errors: Record<string, string>;
}

export default function Step8Household({
  data,
  updateData,
  errors,
}: StepProps) {
  const { session } = useSessionContext();
  const updateDataRef = useRef(updateData);
  const [isLoadingParentHousehold, setIsLoadingParentHousehold] =
    useState(false);
  const [isSearchingOthers, setIsSearchingOthers] = useState(false);
  const [parentHousehold, setParentHousehold] = useState<{
    cid_no?: string;
    household_no?: string;
    tharm_no?: string;
    current_address?: string;
  } | null>(null);
  const [othersHousehold, setOthersHousehold] = useState<{
    hoh_cid_no?: string;
    household_no?: string;
    house_no?: string;
    tharm_no?: string;
    dzongkhag?: string;
    gewog?: string;
    village?: string;
  } | null>(null);
  const [parentHouseholdError, setParentHouseholdError] = useState("");
  const [othersHouseholdError, setOthersHouseholdError] = useState("");
  const parentHouseholdCache = useRef<
    Record<
      string,
      {
        cid_no?: string;
        household_no?: string;
        tharm_no?: string;
        current_address?: string;
      }
    >
  >({});
  const othersHouseholdCache = useRef<
    Record<
      string,
      {
        hoh_cid_no?: string;
        household_no?: string;
        house_no?: string;
        tharm_no?: string;
        dzongkhag?: string;
        gewog?: string;
        village?: string;
      }
    >
  >({});

  useEffect(() => {
    updateDataRef.current = updateData;
  }, [updateData]);

  // DEMO: Simulate household location IDs
  useEffect(() => {
    if (!data.child_hh_no) return;

    // Simulate fetching with dummy data
    setTimeout(() => {
      updateDataRef.current({
        dzongkhagId: "1",
        gewogId: "1",
        chiwogId: "1",
        villageId: "1",
      });
    }, 300);
  }, [data.child_hh_no]);

  useEffect(() => {
    const fetchParentHousehold = async () => {
      if (!session?.user?.cidNo) return;
      if (
        data.registerWithHousehold !== "Father" &&
        data.registerWithHousehold !== "Mother"
      ) {
        setParentHousehold(null);
        setParentHouseholdError("");
        return;
      }

      const selectedCid =
        data.registerWithHousehold === "Father"
          ? data.father_cid
          : data.mother_cid;

      if (!selectedCid) {
        setParentHousehold(null);
        setParentHouseholdError(
          "Parent CID is required to load household details.",
        );
        return;
      }

      const cachedHousehold = parentHouseholdCache.current[selectedCid];
      if (cachedHousehold) {
        setParentHousehold(cachedHousehold);
        setParentHouseholdError("");
        if (
          cachedHousehold.household_no &&
          data.child_hh_no !== cachedHousehold.household_no
        ) {
          updateDataRef.current({ child_hh_no: cachedHousehold.household_no });
        }
        return;
      }

      setIsLoadingParentHousehold(true);
      setParentHouseholdError("");
      try {
        // Simulate API call with dummy data
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Return dummy household details based on CID
        const details =
          selectedCid === "11234567890"
            ? {
                cid_no: selectedCid,
                household_no: "HH-11234",
                tharm_no: "T-112",
                current_address: "Motithang, Chang Gewog, Thimphu",
              }
            : selectedCid === "11105001234"
              ? {
                  cid_no: selectedCid,
                  household_no: "HH-11105",
                  tharm_no: "T-111",
                  current_address: "Satsam, Doteng Gewog, Paro",
                }
              : {
                  cid_no: selectedCid,
                  household_no: `HH-${selectedCid.slice(0, 5)}`,
                  tharm_no: `T-${selectedCid.slice(0, 3)}`,
                  current_address: "Unknown Location",
                };

        const normalizedHousehold = {
          cid_no: details.cid_no,
          household_no: details.household_no,
          tharm_no: details.tharm_no,
          current_address: details.current_address,
        };

        parentHouseholdCache.current[selectedCid] = normalizedHousehold;
        setParentHousehold(normalizedHousehold);

        if (details.household_no && data.child_hh_no !== details.household_no) {
          updateDataRef.current({ child_hh_no: details.household_no });
        }
      } catch (error) {
        console.error("Failed to fetch parent household details", error);
        setParentHousehold(null);
        setParentHouseholdError("Failed to fetch household details.");
      } finally {
        setIsLoadingParentHousehold(false);
      }
    };

    fetchParentHousehold();
  }, [
    data.registerWithHousehold,
    data.father_cid,
    data.mother_cid,
    data.child_hh_no,
    session?.user?.cidNo,
  ]);

  const handleSearchOthersHousehold = async () => {
    if (!session?.user?.cidNo || !data.otherHouseholdNo) return;

    const cachedHousehold = othersHouseholdCache.current[data.otherHouseholdNo];
    if (cachedHousehold) {
      setOthersHousehold(cachedHousehold);
      setOthersHouseholdError("");
      if (
        cachedHousehold.household_no &&
        data.child_hh_no !== cachedHousehold.household_no
      ) {
        updateData({ child_hh_no: cachedHousehold.household_no });
      }
      return;
    }

    setIsSearchingOthers(true);
    setOthersHouseholdError("");
    try {
      // Simulate API call with dummy data
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Return dummy household information for the searched HOH CID
      const details =
        data.otherHouseholdNo === "11105003456"
          ? {
              hoh_cid_no: data.otherHouseholdNo,
              household_no: "HH-11105",
              house_no: "003",
              tharm_no: "T-110",
              dzongkhag: "Punakha",
              gewog: "Guma",
              village: "Talo",
            }
          : {
              hoh_cid_no: data.otherHouseholdNo,
              household_no: `HH-${data.otherHouseholdNo.slice(0, 5)}`,
              house_no: "002",
              tharm_no: "T-002",
              dzongkhag: "Paro",
              gewog: "Doteng",
              village: "Satsam",
            };

      const normalizedHousehold = {
        hoh_cid_no: details.hoh_cid_no,
        household_no: details.household_no,
        house_no: details.house_no,
        tharm_no: details.tharm_no,
        dzongkhag: details.dzongkhag,
        gewog: details.gewog,
        village: details.village,
      };

      othersHouseholdCache.current[data.otherHouseholdNo] = normalizedHousehold;
      setOthersHousehold(normalizedHousehold);

      if (details.household_no && data.child_hh_no !== details.household_no) {
        updateData({ child_hh_no: details.household_no });
      }
    } catch (error) {
      console.error("Failed to fetch household information for HOH", error);
      setOthersHousehold(null);
      setOthersHouseholdError("Failed to fetch household information.");
    } finally {
      setIsSearchingOthers(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-1 sm:space-y-2">
        <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
          Proposed Household
        </h3>
        <p className="text-sm sm:text-base text-gray-500">
          Register child with which household?
        </p>
      </div>

      <RadioGroup
        value={data.registerWithHousehold}
        onValueChange={(val) => {
          updateData({ registerWithHousehold: val as any });
          if (val !== "Others") {
            setOthersHousehold(null);
            setOthersHouseholdError("");
          }
        }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {["Father", "Mother", "Others"].map((option) => (
          <Label
            key={option}
            htmlFor={`choice-${option}`}
            className={cn(
              "flex flex-col items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all gap-2 text-center",
              data.registerWithHousehold === option
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-gray-100 hover:border-gray-200",
            )}
          >
            <RadioGroupItem value={option} id={`choice-${option}`} />
            <span className="text-sm font-bold text-gray-900">{option}</span>
          </Label>
        ))}
      </RadioGroup>

      {errors.registerWithHousehold && (
        <p className="text-destructive text-center text-sm font-medium">
          {errors.registerWithHousehold}
        </p>
      )}

      {(data.registerWithHousehold === "Father" ||
        data.registerWithHousehold === "Mother") && (
        <Card className="bg-gray-50/50 border-dashed border-gray-200 animate-in fade-in slide-in-from-top-4 duration-300">
          <CardContent className="space-y-4 pt-6">
            {isLoadingParentHousehold ? (
              <p className="text-sm text-gray-500">
                Loading household details...
              </p>
            ) : parentHouseholdError ? (
              <p className="text-sm font-medium text-destructive">
                {parentHouseholdError}
              </p>
            ) : parentHousehold ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-xl bg-white border border-gray-100">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    CID No
                  </p>
                  <p className="font-bold text-gray-900">
                    {parentHousehold.cid_no || "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Household No
                  </p>
                  <p className="font-bold text-gray-900">
                    {parentHousehold.household_no || "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Tharm No
                  </p>
                  <p className="font-bold text-gray-900">
                    {parentHousehold.tharm_no || "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Current Address
                  </p>
                  <p className="font-bold text-gray-900">
                    {parentHousehold.current_address || "-"}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No household details available.
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {data.registerWithHousehold === "Others" && (
        <Card className="bg-gray-50/50 border-dashed border-gray-200 animate-in fade-in slide-in-from-top-4 duration-300">
          <CardContent className="space-y-6 pt-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
              <div className="flex-1">
                <Input
                  label="CID No of HOH"
                  required
                  value={data.otherHouseholdNo || ""}
                  onChange={(e) =>
                    updateData({ otherHouseholdNo: e.target.value })
                  }
                  placeholder="Enter CID Number"
                  error={errors.otherHouseholdNo}
                />
              </div>
              <Button
                type="button"
                onClick={handleSearchOthersHousehold}
                disabled={isSearchingOthers || !data.otherHouseholdNo}
                className="h-10 px-6 bg-primary text-white rounded-lg font-bold shadow-sm hover:opacity-90 transition-all text-sm whitespace-nowrap disabled:opacity-50"
              >
                {isSearchingOthers ? "Searching..." : "Search"}
              </Button>
            </div>

            {othersHouseholdError && (
              <p className="text-sm font-medium text-destructive">
                {othersHouseholdError}
              </p>
            )}

            {othersHousehold && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-xl bg-white border border-gray-100">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    HOH CID No
                  </p>
                  <p className="font-bold text-gray-900">
                    {othersHousehold.hoh_cid_no || "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Household No
                  </p>
                  <p className="font-bold text-gray-900">
                    {othersHousehold.household_no || "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    House No
                  </p>
                  <p className="font-bold text-gray-900">
                    {othersHousehold.house_no || "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Tharm No
                  </p>
                  <p className="font-bold text-gray-900">
                    {othersHousehold.tharm_no || "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Dzongkhag
                  </p>
                  <p className="font-bold text-gray-900">
                    {othersHousehold.dzongkhag || "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Gewog
                  </p>
                  <p className="font-bold text-gray-900">
                    {othersHousehold.gewog || "-"}
                  </p>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Village
                  </p>
                  <p className="font-bold text-gray-900">
                    {othersHousehold.village || "-"}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
