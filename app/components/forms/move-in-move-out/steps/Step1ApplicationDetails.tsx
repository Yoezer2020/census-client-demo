"use client";

import { useEffect, useState } from "react";
import { useSessionContext } from "@/app/context/SessionContext";
import { MoveInMoveOutData } from "@/lib/validations/move-in-move-out.schema";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { XCircle } from "lucide-react";
import DzongkhagAutocomplete from "@/app/components/forms/birth-registration/components/autocomplete/DzongkhagAutocomplete";
import GewogAutocomplete from "@/app/components/forms/birth-registration/components/autocomplete/GewogAutocomplete";
import ChiwogAutocomplete from "@/app/components/forms/birth-registration/components/autocomplete/ChiwogAutocomplete";
import VillageAutocomplete from "@/app/components/forms/birth-registration/components/autocomplete/VillageAutocomplete";

interface Step1Props {
  data: Partial<MoveInMoveOutData>;
  updateData: (data: Partial<MoveInMoveOutData>) => void;
  errors: Record<string, string>;
  setIsHohError?: (value: boolean) => void;
  setIsResettlementError?: (value: boolean) => void;
}

export default function Step1ApplicationDetails({
  data,
  updateData,
  errors,
  setIsHohError,
  setIsResettlementError,
}: Step1Props) {
  const { session } = useSessionContext();

  // Mock location data
  const [dzongkhags] = useState([
    { id: "1", name: "Thimphu" },
    { id: "2", name: "Paro" },
    { id: "3", name: "Punakha" },
  ]);
  const [gewogs] = useState([
    { id: "1", name: "Thimphu Thromde", dzongkhag_id: "1" },
    { id: "2", name: "Paro Thromde", dzongkhag_id: "2" },
  ]);
  const [chiwogs] = useState([
    { id: "1", name: "Chiwog 1", dzongkhag_id: "1", gewog_id: "1" },
  ]);
  const [villages] = useState([
    {
      id: "1",
      name: "Village 1",
      dzongkhag_id: "1",
      gewog_id: "1",
      chiwog_id: "1",
    },
  ]);

  // Location names for display in autocompletes
  const [currentDzongkhagName, setCurrentDzongkhagName] = useState("");
  const [currentGewogName, setCurrentGewogName] = useState("");
  const [currentChiwogName, setCurrentChiwogName] = useState("");
  const [currentVillageName, setCurrentVillageName] = useState("");

  // Auto-populate all data when household member is selected
  useEffect(() => {
    if (data.applicant_is === "HOUSEHOLD_MEMBER" && session?.user?.cidNo) {
      // Auto-populate with mock/default data
      updateData({
        applicantCidNo: session.user.cidNo,
        applicantName: session.user.fullName || "",
        currentHouseholdNo: "HH-2024-001",
        currentHohCidNo: "11111111111",
        currentHouseNo: "H-123",
        currentTharmNo: "T-456",
        currentDzongkhagId: "1",
        currentGewogId: "1",
        currentChiwogId: "1",
        currentVillageId: "1",
      });

      // Set location names
      setCurrentDzongkhagName("Thimphu");
      setCurrentGewogName("Thimphu Thromde");
      setCurrentChiwogName("Chiwog 1");
      setCurrentVillageName("Village 1");
    } else if (data.applicant_is === "OPERATOR") {
      // Clear all fields for operator
      updateData({
        applicantCidNo: session?.user?.cidNo || "",
        applicantName: session?.user?.fullName || "",
        currentHouseholdNo: "",
        currentHohCidNo: "",
        currentHouseNo: "",
        currentTharmNo: "",
        currentDzongkhagId: "",
        currentGewogId: "",
        currentChiwogId: "",
        currentVillageId: "",
      });

      // Clear location names
      setCurrentDzongkhagName("");
      setCurrentGewogName("");
      setCurrentChiwogName("");
      setCurrentVillageName("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.applicant_is, session?.user?.cidNo]);

  // Filter location options based on hierarchy
  const filteredGewogs = gewogs.filter(
    (g: any) =>
      !data.currentDzongkhagId || g.dzongkhag_id === data.currentDzongkhagId,
  );
  const filteredChiwogs = chiwogs.filter(
    (c: any) =>
      (!data.currentDzongkhagId ||
        c.dzongkhag_id === data.currentDzongkhagId) &&
      (!data.currentGewogId || c.gewog_id === data.currentGewogId),
  );
  const filteredVillages = villages.filter(
    (v: any) =>
      (!data.currentDzongkhagId ||
        v.dzongkhag_id === data.currentDzongkhagId) &&
      (!data.currentGewogId || v.gewog_id === data.currentGewogId) &&
      (!data.currentChiwogId || v.chiwog_id === data.currentChiwogId),
  );

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Current Household Details
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Please provide your current household information
        </p>

        <div className="space-y-4">
          {/* Applicant Type */}
          <div className="space-y-2">
            <Label htmlFor="applicant_is">
              Applicant Type <span className="text-red-500">*</span>
            </Label>
            <Select
              value={data.applicant_is || ""}
              onValueChange={(value) => updateData({ applicant_is: value })}
            >
              <SelectTrigger
                className={errors.applicant_is ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select applicant type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OPERATOR">Operator</SelectItem>
                <SelectItem value="HOUSEHOLD_MEMBER">
                  Household Member
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.applicant_is && (
              <p className="text-sm text-red-500">{errors.applicant_is}</p>
            )}
          </div>

          {/* Operator Error Message */}
          {data.applicant_is === "OPERATOR" && (
            <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
              <XCircle className="size-4 text-red-600 shrink-0" />
              <span className="text-sm text-red-700 font-medium">
                You are not a valid operator
              </span>
            </div>
          )}

          {/* Show form fields only for Household Member */}
          {data.applicant_is === "HOUSEHOLD_MEMBER" && (
            <>
              {/* Applicant CID - Auto-filled from session */}
              <div className="space-y-2">
                <Label htmlFor="applicantCidNo">
                  Applicant CID Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="applicantCidNo"
                  value={data.applicantCidNo || ""}
                  disabled
                  className="bg-gray-50 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500">
                  Auto-filled from your login credentials
                </p>
                {errors.applicantCidNo && (
                  <p className="text-sm text-red-500">
                    {errors.applicantCidNo}
                  </p>
                )}
              </div>

              {/* Applicant Name */}
              <div className="space-y-2">
                <Label htmlFor="applicantName">Applicant Name</Label>
                <Input
                  id="applicantName"
                  value={data.applicantName || ""}
                  disabled
                  className="bg-gray-50 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500">
                  Auto-filled from your login credentials
                </p>
              </div>

              {/* Contact Number */}
              <div className="space-y-2">
                <Label htmlFor="applicantContactNo">
                  Contact Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="applicantContactNo"
                  value={data.applicantContactNo || ""}
                  onChange={(e) =>
                    updateData({ applicantContactNo: e.target.value.trim() })
                  }
                  placeholder="Enter contact number"
                  className={errors.applicantContactNo ? "border-red-500" : ""}
                />
                {errors.applicantContactNo && (
                  <p className="text-sm text-red-500">
                    {errors.applicantContactNo}
                  </p>
                )}
              </div>

              {/* Current Household Number */}
              <div className="space-y-2">
                <Label htmlFor="currentHouseholdNo">
                  Current Household Number{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="currentHouseholdNo"
                  value={data.currentHouseholdNo || ""}
                  onChange={(e) =>
                    updateData({ currentHouseholdNo: e.target.value.trim() })
                  }
                  placeholder="Enter current household number"
                  className={errors.currentHouseholdNo ? "border-red-500" : ""}
                />
                {errors.currentHouseholdNo && (
                  <p className="text-sm text-red-500">
                    {errors.currentHouseholdNo}
                  </p>
                )}
              </div>

              {/* Current Head of Household CID */}
              <div className="space-y-2">
                <Label htmlFor="currentHohCidNo">
                  Current Head of Household CID
                </Label>
                <Input
                  id="currentHohCidNo"
                  value={data.currentHohCidNo || ""}
                  onChange={(e) =>
                    updateData({ currentHohCidNo: e.target.value.trim() })
                  }
                  placeholder="Enter current HoH CID"
                />
              </div>

              {/* Current House and Tharm Numbers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentHouseNo">House Number</Label>
                  <Input
                    id="currentHouseNo"
                    value={data.currentHouseNo || ""}
                    onChange={(e) =>
                      updateData({ currentHouseNo: e.target.value })
                    }
                    placeholder="Enter house number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentTharmNo">Tharm Number</Label>
                  <Input
                    id="currentTharmNo"
                    value={data.currentTharmNo || ""}
                    onChange={(e) =>
                      updateData({ currentTharmNo: e.target.value })
                    }
                    placeholder="Enter tharm number"
                  />
                </div>
              </div>

              {/* Location Details */}
              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-semibold text-gray-900">
                  Current Location
                </h4>

                {/* Dzongkhag */}
                <DzongkhagAutocomplete
                  value={currentDzongkhagName}
                  options={dzongkhags}
                  onSelect={(value, selected) => {
                    setCurrentDzongkhagName(value);
                    updateData({
                      currentDzongkhagId: selected?.id || "",
                      currentGewogId: "",
                      currentChiwogId: "",
                      currentVillageId: "",
                    });
                    // Clear child location names
                    setCurrentGewogName("");
                    setCurrentChiwogName("");
                    setCurrentVillageName("");
                  }}
                  error={errors.currentDzongkhagId}
                />

                {/* Gewog */}
                <GewogAutocomplete
                  value={currentGewogName}
                  options={filteredGewogs}
                  onSelect={(value, selected) => {
                    setCurrentGewogName(value);
                    updateData({
                      currentGewogId: (selected as any)?.id || "",
                      currentChiwogId: "",
                      currentVillageId: "",
                    });
                    // Clear child location names
                    setCurrentChiwogName("");
                    setCurrentVillageName("");
                  }}
                  error={errors.currentGewogId}
                />

                {/* Chiwog */}
                <ChiwogAutocomplete
                  value={currentChiwogName}
                  options={filteredChiwogs}
                  onSelect={(value, selected) => {
                    setCurrentChiwogName(value);
                    updateData({
                      currentChiwogId: (selected as any)?.id || "",
                      currentVillageId: "",
                    });
                    // Clear child location names
                    setCurrentVillageName("");
                  }}
                  error={errors.currentChiwogId}
                />

                {/* Village */}
                <VillageAutocomplete
                  value={currentVillageName}
                  options={filteredVillages}
                  onSelect={(value, selected) => {
                    setCurrentVillageName(value);
                    updateData({
                      currentVillageId: (selected as any)?.id || "",
                    });
                  }}
                  error={errors.currentVillageId}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
