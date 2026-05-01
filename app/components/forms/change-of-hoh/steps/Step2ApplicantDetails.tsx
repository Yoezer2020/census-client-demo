"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import {
  UserCircle,
  Home,
  Search,
  Loader2,
  Phone,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { ChangeOfHoHData } from "@/lib/validations/change-of-hoh.schema";

const APPLICANT_IS_OPTIONS = ["Operator", "Family"];

interface Step2ApplicantDetailsProps {
  data: Partial<ChangeOfHoHData>;
  updateData: (data: Partial<ChangeOfHoHData>) => void;
  errors: Record<string, string>;
}

export default function Step2ApplicantDetails({
  data,
  updateData,
  errors,
}: Step2ApplicantDetailsProps) {
  const [lookingUp, setLookingUp] = useState(false);
  const [isCheckingOperator, setIsCheckingOperator] = useState(false);
  const [operatorStatus, setOperatorStatus] = useState<boolean | null>(null);

  // Mock user data - Mother
  const mockUserCid = "11234567890";
  const mockUserName = "Pema Deki Wangmo";

  // Auto-populate applicant CID on mount
  useEffect(() => {
    if (mockUserCid && mockUserCid !== data.applicantCidNo) {
      updateData({ applicantCidNo: mockUserCid });
    }
  }, []);

  // Check operator status when applicant type changes to "Operator" (Mock)
  useEffect(() => {
    const checkOperator = async () => {
      if (data.applicantIs !== "Operator") {
        setOperatorStatus(null);
        updateData({ isOperatorVerified: undefined });
        return;
      }

      setIsCheckingOperator(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Mock: Only CID 11234567890 (mother) is not an operator
      const isOperator = mockUserCid !== "11234567890";
      setOperatorStatus(isOperator);
      updateData({ isOperatorVerified: isOperator });
      setIsCheckingOperator(false);
    };

    checkOperator();
  }, [data.applicantIs]);

  const handleHouseholdNoChange = (val: string) => {
    updateData({
      householdNo: val,
      hohCidNo: "",
      houseNo: "",
      tharmNo: "",
      dzongkhagId: "",
      gewogId: "",
      chiwogId: "",
      villageId: "",
      nationality: "",
    });
  };

  const handleHouseholdSearch = async () => {
    const householdNo = data.householdNo?.trim();
    if (!householdNo) return;

    setLookingUp(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock household data
    if (householdNo === "HH-2024-001") {
      updateData({
        householdNo: "HH-2024-001",
        hohCidNo: "11234567890", // Mother is current HoH
        houseNo: "H-123",
        tharmNo: "T-456",
        dzongkhagId: "1",
        gewogId: "1",
        chiwogId: "1",
        villageId: "1",
        nationality: "Bhutanese",
      });
      toast.success("Household details loaded successfully");
    } else {
      updateData({
        hohCidNo: "",
        houseNo: "",
        tharmNo: "",
        dzongkhagId: "",
        gewogId: "",
        chiwogId: "",
        villageId: "",
        nationality: "",
      });
      toast.error("Household not found. Try HH-2024-001");
    }

    setLookingUp(false);
  };

  const displayCid = mockUserCid || data.applicantCidNo || "";
  const displayName = mockUserName;
  const isVerified = !!displayCid;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2 mb-8">
        <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <UserCircle className="size-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Applicant Details</h3>
        <p className="text-gray-500 max-w-md mx-auto text-sm">
          Logged in as Mother (Pema Deki Wangmo). Enter your household number to
          look up the current HoH.
        </p>
      </div>

      {/* NDI Identity Card */}
      <Card className="bg-white border-gray-100">
        <div className="py-2 px-2 sm:px-3 flex items-center gap-2 sm:gap-4">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
            <UserCircle className="w-5 h-5" />
          </div>
          <div className="flex-1 flex items-center gap-6 min-w-0">
            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Logged in as
              </p>
              <h4 className="text-sm font-bold text-gray-900 truncate uppercase">
                {displayName}
              </h4>
            </div>
            <div className="h-8 w-px bg-gray-100 hidden sm:block" />
            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">
                Identity Number
              </p>
              <p className="text-sm text-gray-900 font-bold truncate uppercase font-mono">
                {displayCid}
              </p>
            </div>
          </div>
          {isVerified && (
            <div className="px-3 py-1 rounded-full bg-green-500 text-white text-[10px] font-bold uppercase shrink-0 shadow-lg shadow-green-500/20">
              Verified
            </div>
          )}
        </div>
      </Card>

      {/* CID of Applicant (read-only) */}
      <div className="space-y-2">
        <Label
          htmlFor="cid_of_applicant"
          className="text-sm font-semibold text-gray-700"
        >
          CID of Applicant
        </Label>
        <Input
          id="cid_of_applicant"
          value={displayCid}
          readOnly
          placeholder="Enter CID"
          className="bg-gray-50 text-gray-600 cursor-not-allowed rounded-xl border-gray-200 font-mono"
        />
        <p className="text-xs text-gray-400">
          Auto-filled from mock user data (Mother)
        </p>
      </div>

      {/* Applicant Contact No */}
      <div className="space-y-2">
        <Label
          htmlFor="applicant_contact_no"
          className="text-sm font-semibold text-gray-700"
        >
          Applicant Contact No <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <Phone className="size-4" />
          </div>
          <Input
            id="applicant_contact_no"
            placeholder="e.g. +97517916017"
            value={data.applicantContactNo ?? ""}
            onChange={(e) => updateData({ applicantContactNo: e.target.value })}
            className={`pl-10 rounded-xl border-2 transition-all focus:border-primary ${
              errors.applicantContactNo
                ? "border-red-300 bg-red-50/30"
                : "border-gray-200"
            }`}
          />
        </div>
        {errors.applicantContactNo && (
          <p className="text-red-500 text-xs font-semibold">
            {errors.applicantContactNo}
          </p>
        )}
      </div>

      {/* Applicant Is */}
      <div className="space-y-2">
        <Label
          htmlFor="applicant_is"
          className="text-sm font-semibold text-gray-700"
        >
          Applicant Is <span className="text-red-500">*</span>
        </Label>
        <Select
          value={data.applicantIs ?? ""}
          onValueChange={(val) => updateData({ applicantIs: val })}
        >
          <SelectTrigger
            id="applicant_is"
            className={`rounded-xl border-2 transition-all ${
              errors.applicantIs
                ? "border-red-300 bg-red-50/30"
                : "border-gray-200"
            }`}
          >
            <SelectValue placeholder="Select applicant type" />
          </SelectTrigger>
          <SelectContent>
            {APPLICANT_IS_OPTIONS.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.applicantIs && (
          <p className="text-red-500 text-xs font-semibold">
            {errors.applicantIs}
          </p>
        )}
      </div>

      {/* Operator Verification Status */}
      {data.applicantIs === "Operator" && (
        <Card
          className={
            operatorStatus
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }
        >
          <div className="p-4 flex items-center gap-3">
            {isCheckingOperator ? (
              <>
                <Loader2 className="size-5 animate-spin text-gray-500" />
                <p className="text-sm font-semibold text-gray-700">
                  Verifying operator status...
                </p>
              </>
            ) : operatorStatus ? (
              <>
                <CheckCircle className="size-5 text-green-600" />
                <p className="text-sm font-semibold text-green-700">
                  Authorized operator of BCRS
                </p>
              </>
            ) : (
              <>
                <XCircle className="size-5 text-red-600" />
                <p className="text-sm font-semibold text-red-700">
                  Not a official Operator of BCRS
                </p>
              </>
            )}
          </div>
        </Card>
      )}

      {/* Household Number */}
      <div className="space-y-2">
        <Label
          htmlFor="household_no"
          className="text-sm font-semibold text-gray-700"
        >
          Household Number <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            {lookingUp ? (
              <Loader2 className="size-4 animate-spin text-primary" />
            ) : (
              <Home className="size-4" />
            )}
          </div>
          <Input
            id="household_no"
            placeholder="e.g. HH-001"
            value={data.householdNo ?? ""}
            onChange={(e) => handleHouseholdNoChange(e.target.value)}
            className={`pl-10 pr-20 rounded-xl border-2 transition-all focus:border-primary ${
              errors.householdNo
                ? "border-red-300 bg-red-50/30"
                : "border-gray-200"
            }`}
          />
          <Button
            type="button"
            size="sm"
            onClick={handleHouseholdSearch}
            disabled={lookingUp || !data.householdNo?.trim()}
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
        {errors.householdNo && (
          <p className="text-red-500 text-xs font-semibold">
            {errors.householdNo}
          </p>
        )}
        <p className="text-xs text-gray-400">
          Enter household number HH-2024-001 to load household details
        </p>
      </div>

      {/* Household Lookup Result (read-only) */}
      {data.hohCidNo || data.houseNo || data.tharmNo ? (
        <Card className="p-5 border-blue-100 bg-blue-50/30 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Search className="size-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              Household Details (Auto-filled)
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-gray-500 uppercase tracking-wide">
                HoH CID
              </Label>
              <Input
                value={data.hohCidNo ?? ""}
                readOnly
                className="bg-white/80 text-gray-600 cursor-not-allowed rounded-xl border-gray-200 font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-gray-500 uppercase tracking-wide">
                Household No
              </Label>
              <Input
                value={data.householdNo ?? ""}
                readOnly
                className="bg-white/80 text-gray-600 cursor-not-allowed rounded-xl border-gray-200 font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-gray-500 uppercase tracking-wide">
                House No
              </Label>
              <Input
                value={data.houseNo ?? ""}
                readOnly
                className="bg-white/80 text-gray-600 cursor-not-allowed rounded-xl border-gray-200"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-gray-500 uppercase tracking-wide">
                Tharm No
              </Label>
              <Input
                value={data.tharmNo ?? ""}
                readOnly
                className="bg-white/80 text-gray-600 cursor-not-allowed rounded-xl border-gray-200 font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-gray-500 uppercase tracking-wide">
                Nationality
              </Label>
              <Input
                value={data.nationality ?? ""}
                readOnly
                className="bg-white/80 text-gray-600 cursor-not-allowed rounded-xl border-gray-200"
              />
            </div>
          </div>
        </Card>
      ) : null}
    </div>
  );
}
