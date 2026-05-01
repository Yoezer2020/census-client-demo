"use client";

import { useState, useEffect } from "react";
import { useSessionContext } from "@/app/context/SessionContext";
import { toast } from "sonner";
import { BirthRegistrationData } from "@/lib/validations/birth-registration.schema";
import CitizensDetailService from "@/lib/services/citizen_main_registry_service/citizens-detail/citizens-detail";
import { Input } from "../ui/FormFields";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";

interface StepProps {
  data: Partial<BirthRegistrationData>;
  updateData: (data: Partial<BirthRegistrationData>) => void;
  errors: Record<string, string>;
}

export default function Step6ParentsDetails({
  data,
  updateData,
  errors,
}: StepProps) {
  const { session } = useSessionContext();
  const [isSearchingMc, setIsSearchingMc] = useState(false);
  const [mcSearchAttempted, setMcSearchAttempted] = useState(false);
  const [hasAutoPopulated, setHasAutoPopulated] = useState(false);

  const shouldShowMcSearch = data.is_mc_valid === true;

  // Auto-populate parent CID if applicant is FATHER or MOTHER
  useEffect(() => {
    const autoPopulateParentInfo = async () => {
      if (!data.applicant_cid || hasAutoPopulated) return;

      const applicantIs = data.applicant_is?.toUpperCase();
      if (applicantIs !== "FATHER" && applicantIs !== "MOTHER") return;

      try {
        // Simulate API call with dummy data
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Return dummy citizen info
        const citizenInfo = {
          cid_no: data.applicant_cid,
          citizen_details: {
            full_name: "Dummy Parent Name",
            contact_no: data.applicant_contact_no || "17123456",
          },
        };

        if (citizenInfo?.citizen_details) {
          const updates: Partial<BirthRegistrationData> = {};

          if (applicantIs === "FATHER") {
            updates.father_cid = citizenInfo.cid_no || data.applicant_cid;
            updates.fathers_contact_no = data.applicant_contact_no || "";
          } else if (applicantIs === "MOTHER") {
            updates.mother_cid = citizenInfo.cid_no || data.applicant_cid;
            updates.mothers_contact_no = data.applicant_contact_no || "";
          }

          if (Object.keys(updates).length > 0) {
            updateData(updates);
            setHasAutoPopulated(true);
          }
        }
      } catch (error) {
        console.error("Failed to auto-populate parent info:", error);
      }
    };

    autoPopulateParentInfo();
  }, [
    data.applicant_cid,
    data.applicant_is,
    data.applicant_contact_no,
    hasAutoPopulated,
    updateData,
  ]);

  useEffect(() => {
    const defaultAliveState: Partial<BirthRegistrationData> = {};

    if (typeof data.is_father_alive !== "boolean") {
      defaultAliveState.is_father_alive = true;
    }

    if (typeof data.is_mother_alive !== "boolean") {
      defaultAliveState.is_mother_alive = true;
    }

    if (Object.keys(defaultAliveState).length > 0) {
      updateData(defaultAliveState);
    }
  }, [data.is_father_alive, data.is_mother_alive, updateData]);

  const handleSearchByMcNumber = async () => {
    setIsSearchingMc(true);
    setMcSearchAttempted(true);

    try {
      const simulatedResponse = await new Promise<{ success: boolean }>(
        (resolve) => {
          setTimeout(() => resolve({ success: false }), 700);
        },
      );

      if (!simulatedResponse.success) {
        updateData({
          is_mc_valid: false,
        });
        toast.error(
          "Marriage certificate lookup failed. Please enter parent details manually.",
        );
        return;
      }

      toast.success("Marriage certificate verified");
    } catch (error) {
      console.error("MC lookup failed", error);
      updateData({
        is_mc_valid: false,
      });
      toast.error(
        "Marriage certificate lookup failed. Please enter parent details manually.",
      );
    } finally {
      setIsSearchingMc(false);
    }
  };

  // If either parent is alive, guarantor approval is not needed
  useEffect(() => {
    const eitherParentAlive =
      data.is_father_alive === true || data.is_mother_alive === true;
    if (eitherParentAlive && data.guarantor_approval !== false) {
      updateData({ guarantor_approval: false });
    }
  }, [
    data.is_father_alive,
    data.is_mother_alive,
    data.guarantor_approval,
    updateData,
  ]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-1 sm:space-y-2">
        <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
          Parents Info
        </h3>
        <p className="text-sm sm:text-base text-gray-500">
          Mother and father's identity verification
        </p>
      </div>

      {shouldShowMcSearch && (
        <Card className="p-4 sm:p-6">
          <CardContent className="p-0 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
              <div className="flex-1">
                <Input
                  label="Marriage Certificate Number"
                  required
                  value={data.mc_no || ""}
                  onChange={(e) => updateData({ mc_no: e.target.value })}
                  placeholder="Enter marriage certificate number"
                />
              </div>
              <Button
                type="button"
                onClick={handleSearchByMcNumber}
                disabled={isSearchingMc || !data.mc_no}
                className="h-10 px-6 bg-primary text-white rounded-lg font-bold shadow-sm hover:opacity-90 transition-all text-sm whitespace-nowrap disabled:opacity-50"
              >
                {isSearchingMc ? "Searching..." : "Search"}
              </Button>
            </div>
            {mcSearchAttempted && (
              <p className="text-xs text-gray-500">
                If no matching record is found, manual entry will be enabled.
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <Card className="p-4 sm:p-6">
        <CardContent className="p-0 divide-y divide-gray-100 space-y-8 divide-none">
          <div className="space-y-6 pt-6 first:pt-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b border-gray-100 pb-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/70">
                Father&apos;s Details
              </h4>
              <div className="flex items-center gap-2 pr-1">
                <Checkbox
                  id="deceased-father"
                  checked={data.is_father_alive === false}
                  onCheckedChange={(checked) =>
                    updateData({
                      is_father_alive: checked !== true,
                    })
                  }
                />
                <Label
                  htmlFor="deceased-father"
                  className={cn(
                    "text-sm font-medium transition-colors text-gray-700",
                  )}
                >
                  Deceased?
                </Label>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Father CID"
                required
                value={data.father_cid || ""}
                onChange={(e) => updateData({ father_cid: e.target.value })}
                placeholder="Father CID"
                error={errors.father_cid}
              />
              <Input
                label="Father Contact Number"
                required
                value={data.fathers_contact_no || ""}
                onChange={(e) =>
                  updateData({ fathers_contact_no: e.target.value })
                }
                placeholder="Father Contact Number"
                error={errors.fathers_contact_no}
              />
            </div>
            {errors.is_father_alive && (
              <p className="text-destructive text-sm">
                {errors.is_father_alive}
              </p>
            )}
          </div>

          <div className="space-y-6 pt-6 first:pt-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b border-gray-100 pb-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/70">
                Mother&apos;s Details
              </h4>
              <div className="flex items-center gap-2 pr-1">
                <Checkbox
                  id="deceased-mother"
                  checked={data.is_mother_alive === false}
                  onCheckedChange={(checked) =>
                    updateData({
                      is_mother_alive: checked !== true,
                    })
                  }
                />
                <Label
                  htmlFor="deceased-mother"
                  className={cn(
                    "text-sm font-medium transition-colors text-gray-700",
                  )}
                >
                  Deceased?
                </Label>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Mother CID"
                required
                value={data.mother_cid || ""}
                onChange={(e) => updateData({ mother_cid: e.target.value })}
                placeholder="Mother CID"
                error={errors.mother_cid}
              />
              <Input
                label="Mother Contact Number"
                required
                value={data.mothers_contact_no || ""}
                onChange={(e) =>
                  updateData({ mothers_contact_no: e.target.value })
                }
                placeholder="Mother Contact Number"
                error={errors.mothers_contact_no}
              />
            </div>
            {errors.is_mother_alive && (
              <p className="text-destructive text-sm">
                {errors.is_mother_alive}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {errors.parents && (
        <p className="text-destructive text-center text-sm font-medium animate-bounce">
          {errors.parents}
        </p>
      )}
    </div>
  );
}
