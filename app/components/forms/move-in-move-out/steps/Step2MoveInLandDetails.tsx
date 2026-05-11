"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MoveInMoveOutData } from "@/lib/validations/move-in-move-out.schema";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Loader2, Search, Info } from "lucide-react";
import DzongkhagAutocomplete from "@/app/components/forms/birth-registration/components/autocomplete/DzongkhagAutocomplete";
import GewogAutocomplete from "@/app/components/forms/birth-registration/components/autocomplete/GewogAutocomplete";
import ChiwogAutocomplete from "@/app/components/forms/birth-registration/components/autocomplete/ChiwogAutocomplete";
import VillageAutocomplete from "@/app/components/forms/birth-registration/components/autocomplete/VillageAutocomplete";

interface Step2Props {
  data: Partial<MoveInMoveOutData>;
  updateData: (data: Partial<MoveInMoveOutData>) => void;
  errors: Record<string, string>;
}

export default function Step2MoveInLandDetails({
  data,
  updateData,
  errors,
}: Step2Props) {
  const [isSearchingHousehold, setIsSearchingHousehold] = useState(false);
  const [householdSearchInput, setHouseholdSearchInput] = useState("");
  const [isVerifyingPlotOwner, setIsVerifyingPlotOwner] = useState(false);
  const [plotOwnerCidInput, setPlotOwnerCidInput] = useState("");
  const [isPlotOwnerVerified, setIsPlotOwnerVerified] = useState(false);
  const [isSearchingPlotDetails, setIsSearchingPlotDetails] = useState(false);

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
  const [moveInDzongkhagName, setMoveInDzongkhagName] = useState("");
  const [moveInGewogName, setMoveInGewogName] = useState("");
  const [moveInChiwogName, setMoveInChiwogName] = useState("");
  const [moveInVillageName, setMoveInVillageName] = useState("");

  // Filter location options based on hierarchy
  const filteredGewogs = gewogs.filter(
    (g: any) =>
      !data.moveInDzongkhagId || g.dzongkhag_id === data.moveInDzongkhagId,
  );
  const filteredChiwogs = chiwogs.filter(
    (c: any) =>
      (!data.moveInDzongkhagId || c.dzongkhag_id === data.moveInDzongkhagId) &&
      (!data.moveInGewogId || c.gewog_id === data.moveInGewogId),
  );
  const filteredVillages = villages.filter(
    (v: any) =>
      (!data.moveInDzongkhagId || v.dzongkhag_id === data.moveInDzongkhagId) &&
      (!data.moveInGewogId || v.gewog_id === data.moveInGewogId) &&
      (!data.moveInChiwogId || v.chiwog_id === data.moveInChiwogId),
  );

  // Clear location data when move type changes
  useEffect(() => {
    if (data.moveType === "new_household") {
      setHouseholdSearchInput("");
      updateData({
        moveInHouseholdNo: "",
        moveInHouseNo: "",
        moveInTharmNo: "",
        moveInDzongkhagId: "",
        moveInGewogId: "",
        moveInChiwogId: "",
        moveInVillageId: "",
      });
      setMoveInDzongkhagName("");
      setMoveInGewogName("");
      setMoveInChiwogName("");
      setMoveInVillageName("");
    } else if (data.moveType === "join_household") {
      setPlotOwnerCidInput("");
      setIsPlotOwnerVerified(false);
      updateData({
        plotOwnerCid: "",
        areaType: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.moveType]);

  // Mock search for household details
  const handleSearchHousehold = async () => {
    if (!householdSearchInput) return;

    setIsSearchingHousehold(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock populate with default data
    updateData({
      moveInHouseholdNo: householdSearchInput,
      moveInHouseNo: "H-789",
      moveInTharmNo: "T-012",
      moveInDzongkhagId: "1",
      moveInGewogId: "1",
      moveInChiwogId: "1",
      moveInVillageId: "1",
    });

    setMoveInDzongkhagName("Thimphu");
    setMoveInGewogName("Thimphu Thromde");
    setMoveInChiwogName("Chiwog 1");
    setMoveInVillageName("Village 1");

    toast.success("Household details loaded successfully");
    setIsSearchingHousehold(false);
  };

  // Mock verify plot owner
  const handleVerifyPlotOwner = async () => {
    if (!plotOwnerCidInput || !data.applicantCidNo) return;

    setIsVerifyingPlotOwner(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsPlotOwnerVerified(true);
    updateData({ plotOwnerCid: plotOwnerCidInput });
    toast.success("Plot owner verified successfully");
    setIsVerifyingPlotOwner(false);
  };

  // Mock search for plot details
  const handleSearchPlotDetails = async () => {
    if (!data.areaType || !plotOwnerCidInput) {
      toast.error("Please select area type first");
      return;
    }

    setIsSearchingPlotDetails(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Plot details fetched successfully from NLC");
    setIsSearchingPlotDetails(false);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Move In Location Details
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Please provide details of the location you are moving to
        </p>

        <div className="space-y-4">
          {/* Move Type */}
          <div className="space-y-3">
            <Label>
              Move Type <span className="text-red-500">*</span>
            </Label>
            <RadioGroup
              value={data.moveType || "new_household"}
              onValueChange={(value) =>
                updateData({
                  moveType: value as "new_household" | "join_household",
                })
              }
            >
              <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="new_household" id="new_household" />
                <Label
                  htmlFor="new_household"
                  className="cursor-pointer flex-1"
                >
                  <div className="font-semibold">New Household</div>
                  <div className="text-sm text-gray-500">
                    I will be establishing a new household at the move-in
                    location
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="join_household" id="join_household" />
                <Label
                  htmlFor="join_household"
                  className="cursor-pointer flex-1"
                >
                  <div className="font-semibold">Join Existing Household</div>
                  <div className="text-sm text-gray-500">
                    I will be joining an existing household at the move-in
                    location
                  </div>
                </Label>
              </div>
            </RadioGroup>
            {errors.moveType && (
              <p className="text-sm text-red-500">{errors.moveType}</p>
            )}
          </div>

          {/* Head of Household Information for New Household */}
          {data.moveType === "new_household" && (
            <div className="flex gap-3 p-4 rounded-lg border border-blue-200 bg-blue-50">
              <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <strong>Important:</strong> When creating a new household, the
                applicant will be designated as the Head of Household by
                default. If you need to change the Head of Household later,
                please use the <strong>Change of Head of Household</strong>{" "}
                service.
              </div>
            </div>
          )}

          {/* Plot Owner CID (only for new_household) */}
          {data.moveType === "new_household" && (
            <div className="space-y-2 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="space-y-1 mb-3">
                <p className="text-sm font-medium text-gray-700">
                  Plot Ownership Verification
                </p>
                <p className="text-xs text-gray-600">
                  In order to move in, the applicant must be the owner of the
                  plot or must have a 1st step relation to the owner of the
                  plot.
                </p>
              </div>
              <Label htmlFor="plotOwnerCid">
                Plot Owner CID Number <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2">
                <Input
                  id="plotOwnerCid"
                  value={plotOwnerCidInput}
                  onChange={(e) => setPlotOwnerCidInput(e.target.value.trim())}
                  placeholder="Enter plot owner CID number"
                  maxLength={11}
                  disabled={isPlotOwnerVerified}
                  className={
                    isPlotOwnerVerified ? "bg-green-50 border-green-500" : ""
                  }
                />
                <Button
                  type="button"
                  onClick={handleVerifyPlotOwner}
                  disabled={
                    isVerifyingPlotOwner ||
                    !plotOwnerCidInput ||
                    isPlotOwnerVerified
                  }
                  className="h-11 px-4 rounded-lg"
                >
                  {isVerifyingPlotOwner ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : isPlotOwnerVerified ? (
                    "Verified"
                  ) : (
                    <Search className="size-4" />
                  )}
                </Button>
              </div>
              {isPlotOwnerVerified && (
                <p className="text-xs text-green-600 font-medium">
                  ✓ Plot owner relationship verified successfully
                </p>
              )}
            </div>
          )}

          {/* Area Type and Plot ID (only shown after plot owner verification for new_household) */}
          {data.moveType === "new_household" && isPlotOwnerVerified && (
            <>
              <div className="space-y-2">
                <Label htmlFor="areaType">
                  Area Type <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <Select
                    value={data.areaType || ""}
                    onValueChange={(value) => updateData({ areaType: value })}
                  >
                    <SelectTrigger
                      className={errors.areaType ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select area type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RURAL">Rural</SelectItem>
                      <SelectItem value="URBAN">Urban</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    onClick={handleSearchPlotDetails}
                    disabled={isSearchingPlotDetails || !data.areaType}
                    className="h-11 px-4 rounded-lg whitespace-nowrap"
                  >
                    {isSearchingPlotDetails ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <>
                        <Search className="size-4 mr-2" />
                        Search Plot
                      </>
                    )}
                  </Button>
                </div>
                {errors.areaType && (
                  <p className="text-sm text-red-500">{errors.areaType}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="plotId">Plot ID</Label>
                <Input
                  id="plotId"
                  value={data.plotId || ""}
                  onChange={(e) =>
                    updateData({ plotId: e.target.value.trim() })
                  }
                  placeholder="Enter plot ID (optional)"
                />
              </div>
            </>
          )}

          {/* Household Number (only for join_household) */}
          {data.moveType === "join_household" && (
            <div className="space-y-2">
              <Label htmlFor="moveInHouseholdNo">
                Existing Household Number{" "}
                <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2">
                <Input
                  id="moveInHouseholdNo"
                  value={householdSearchInput}
                  onChange={(e) =>
                    setHouseholdSearchInput(e.target.value.trim())
                  }
                  placeholder="Enter household number to search"
                  className={errors.moveInHouseholdNo ? "border-red-500" : ""}
                />
                <Button
                  type="button"
                  onClick={handleSearchHousehold}
                  disabled={isSearchingHousehold || !householdSearchInput}
                  className="h-11 px-4 rounded-lg"
                >
                  {isSearchingHousehold ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Search className="size-4" />
                  )}
                </Button>
              </div>
              {errors.moveInHouseholdNo && (
                <p className="text-sm text-red-500">
                  {errors.moveInHouseholdNo}
                </p>
              )}
            </div>
          )}

          {/* House and Tharm Numbers */}
          {(data.moveType === "join_household" ||
            (data.moveType === "new_household" && isPlotOwnerVerified)) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="moveInHouseNo">
                  House Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="moveInHouseNo"
                  value={data.moveInHouseNo || ""}
                  onChange={(e) =>
                    updateData({ moveInHouseNo: e.target.value })
                  }
                  placeholder="Enter house number"
                  className={errors.moveInHouseNo ? "border-red-500" : ""}
                  disabled={data.moveType === "join_household"}
                />
                {errors.moveInHouseNo && (
                  <p className="text-sm text-red-500">{errors.moveInHouseNo}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="moveInTharmNo">Tharm Number</Label>
                <Input
                  id="moveInTharmNo"
                  value={data.moveInTharmNo || ""}
                  onChange={(e) =>
                    updateData({ moveInTharmNo: e.target.value })
                  }
                  placeholder="Enter tharm number"
                  disabled={data.moveType === "join_household"}
                />
              </div>
            </div>
          )}

          {/* Location Details */}
          {(data.moveType === "join_household" ||
            (data.moveType === "new_household" && isPlotOwnerVerified)) && (
            <div className="space-y-4 pt-4 border-t">
              <h4 className="font-semibold text-gray-900">Move-In Location</h4>

              {/* Dzongkhag */}
              <DzongkhagAutocomplete
                value={moveInDzongkhagName}
                options={dzongkhags}
                onSelect={(value, selected) => {
                  setMoveInDzongkhagName(value);
                  updateData({
                    moveInDzongkhagId: selected?.id || "",
                    moveInGewogId: "",
                    moveInChiwogId: "",
                    moveInVillageId: "",
                  });
                  setMoveInGewogName("");
                  setMoveInChiwogName("");
                  setMoveInVillageName("");
                }}
                error={errors.moveInDzongkhagId}
              />

              {/* Gewog */}
              <GewogAutocomplete
                value={moveInGewogName}
                options={filteredGewogs}
                onSelect={(value, selected) => {
                  setMoveInGewogName(value);
                  updateData({
                    moveInGewogId: (selected as any)?.id || "",
                    moveInChiwogId: "",
                    moveInVillageId: "",
                  });
                  setMoveInChiwogName("");
                  setMoveInVillageName("");
                }}
                error={errors.moveInGewogId}
              />

              {/* Chiwog */}
              <ChiwogAutocomplete
                value={moveInChiwogName}
                options={filteredChiwogs}
                onSelect={(value, selected) => {
                  setMoveInChiwogName(value);
                  updateData({
                    moveInChiwogId: (selected as any)?.id || "",
                    moveInVillageId: "",
                  });
                  setMoveInVillageName("");
                }}
                error={errors.moveInChiwogId}
              />

              {/* Village */}
              <VillageAutocomplete
                value={moveInVillageName}
                options={filteredVillages}
                onSelect={(value, selected) => {
                  setMoveInVillageName(value);
                  updateData({ moveInVillageId: (selected as any)?.id || "" });
                }}
                error={errors.moveInVillageId}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
