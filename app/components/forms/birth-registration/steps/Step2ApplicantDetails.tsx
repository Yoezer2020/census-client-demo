"use client";

import { useEffect, useRef, useState } from "react";
import { User, CheckCircle, Phone, Loader2, XCircle } from "lucide-react";
import { useSessionContext } from "@/app/context/SessionContext";
import OperatorService from "@/lib/services/common-service/operator/operator";
import { BirthRegistrationData } from "@/lib/validations/birth-registration.schema";
import { Card, CardContent } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { cn } from "@/lib/utils";

interface StepProps {
  data: Partial<BirthRegistrationData>;
  updateData: (data: Partial<BirthRegistrationData>) => void;
  errors: Record<string, string>;
}

// Defined outside component to prevent Radix remount-on-every-render
function CustomRadioGroup({
  label,
  value,
  options,
  onChange,
  error,
}: {
  label: string;
  value: string | undefined;
  options: { label: string; value: string }[];
  onChange: (val: string) => void;
  error?: string;
}) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
        {label} <span className="text-destructive">*</span>
      </Label>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {options.map((opt) => (
          <Label
            key={opt.value}
            htmlFor={`${label}-${opt.value}`}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-all cursor-pointer hover:bg-gray-50",
              value === opt.value
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-gray-100",
            )}
          >
            <RadioGroupItem value={opt.value} id={`${label}-${opt.value}`} />
            <span className="text-sm font-semibold text-gray-900 flex-1">
              {opt.label}
            </span>
            {value === opt.value && (
              <CheckCircle className="w-4 h-4 text-primary animate-in zoom-in duration-300" />
            )}
          </Label>
        ))}
      </RadioGroup>
      {error && (
        <p className="text-destructive text-[11px] font-semibold pl-0.5">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Step2ApplicantDetails({
  data,
  updateData,
  errors,
}: StepProps) {
  const { session } = useSessionContext();
  const [ndiUser, setNdiUser] = useState<any>(null);
  const [isCheckingOperator, setIsCheckingOperator] = useState(false);
  const [operatorStatus, setOperatorStatus] = useState<boolean | null>(null);

  // Keep a stable ref to updateData so effects don't re-run when the parent
  // recreates the function on every render
  const updateDataRef = useRef(updateData);
  useEffect(() => {
    updateDataRef.current = updateData;
  });

  // Auto-fill CID from session — runs only when cidNo changes
  useEffect(() => {
    if (!session?.user) return;
    const { fullName, cidNo } = session.user;
    setNdiUser({ fullName, cidNo });
    if (!data.applicant_cid) {
      updateDataRef.current({
        applicant_cid: cidNo,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.cidNo]);

  // Calculate spouse approval — runs only when the relevant values change
  useEffect(() => {
    if (!data.applicant_is) return;

    let requiresApproval = false;
    const epis = data.is_epis_registered;
    const mc = data.is_mc_valid;
    const fatherApproval =
      data.applicant_is === "FATHER" ? "APPROVED" : "PENDING";
    const motherApproval = epis === true ? "APPROVED" : "PENDING";

    if (data.applicant_is === "FATHER") {
      if (epis === false && mc === true) requiresApproval = true;
    } else if (data.applicant_is === "MOTHER") {
      if (epis === true && mc === true) requiresApproval = true;
      else if (epis === false && mc === false) requiresApproval = true;
    }

    updateDataRef.current({
      requiresSpouseApproval: requiresApproval,
      father_approval: fatherApproval,
      mother_approval: motherApproval,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.applicant_is, data.is_epis_registered, data.is_mc_valid]);

  // Check operator status when applicant type changes to "OPERATOR"
  useEffect(() => {
    const checkOperator = async () => {
      if (data.applicant_is !== "OPERATOR") {
        setOperatorStatus(null);
        updateDataRef.current({ isOperatorVerified: undefined });
        return;
      }

      const cidNo = session?.user?.cidNo;

      if (!cidNo) {
        setOperatorStatus(false);
        updateDataRef.current({ isOperatorVerified: false });
        return;
      }

      setIsCheckingOperator(true);
      try {
        // DEMO: Simulate operator check - always return true for demo CID
        await new Promise((resolve) => setTimeout(resolve, 500));
        const isOperator = cidNo === "11234567890" || cidNo === "11105001234";
        setOperatorStatus(isOperator);
        updateDataRef.current({ isOperatorVerified: isOperator });
      } catch (error) {
        console.error("Operator check failed:", error);
        setOperatorStatus(false);
        updateDataRef.current({ isOperatorVerified: false });
      } finally {
        setIsCheckingOperator(false);
      }
    };

    checkOperator();
  }, [data.applicant_is, session?.user?.cidNo]);

  return (
    <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-1 sm:space-y-2">
        <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
          Applicant Details
        </h3>
        <p className="text-sm sm:text-base text-gray-500">
          Verify your identity and eligibility
        </p>
      </div>

      {/* Auto-filled CID Card */}
      <Card className="bg-white border-gray-100 max-w-2xl w-full">
        <CardContent className="py-2 px-2 sm:px-3 flex items-center gap-2 sm:gap-4">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div className="flex-1 flex items-center gap-6 min-w-0">
            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Logged in as
              </p>
              <h4 className="text-sm font-bold text-gray-900 truncate">
                {ndiUser?.fullName || ndiUser?.cidNo || "Guest User"}
              </h4>
            </div>
            <div className="h-8 w-px bg-gray-100 hidden sm:block" />
            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">
                Identity Number
              </p>
              <p className="text-sm text-gray-900 font-bold truncate uppercase">
                {data.applicant_cid || "Not detected"}
              </p>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-green-500 text-white text-[10px] font-bold uppercase shrink-0 shadow-lg shadow-green-500/20">
            Verified
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6 sm:space-y-8">
        {/* Contact Number */}
        <div className="space-y-3">
          <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
            Contact Number <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="tel"
              placeholder="e.g. 17916017"
              value={data.applicant_contact_no || ""}
              onChange={(e) =>
                updateData({ applicant_contact_no: e.target.value })
              }
              className="pl-9 h-10 rounded-lg"
            />
          </div>
          {errors.applicant_contact_no && (
            <p className="text-destructive text-[11px] font-semibold pl-0.5">
              {errors.applicant_contact_no}
            </p>
          )}
        </div>

        {/* Applying as */}
        <div className="space-y-3">
          <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
            You are applying as? <span className="text-destructive">*</span>
          </Label>
          <Select
            value={data.applicant_is || ""}
            onValueChange={(val) => {
              const v = val as "FATHER" | "MOTHER" | "HOH";
              updateData({
                applicant_is: v,
              });
            }}
          >
            <SelectTrigger className="h-10 rounded-lg">
              <SelectValue placeholder="Select applicant type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FATHER">Father</SelectItem>
              <SelectItem value="MOTHER">Mother</SelectItem>
              <SelectItem value="HOH">Head of Household</SelectItem>
              <SelectItem value="OPERATOR">Operator</SelectItem>
            </SelectContent>
          </Select>
          {errors.applicant_is && (
            <p className="text-destructive text-[11px] font-semibold pl-0.5">
              {errors.applicant_is}
            </p>
          )}
        </div>

        {/* Operator Verification Status */}
        {data.applicant_is === "OPERATOR" && (
          <Card
            className={
              operatorStatus
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }
          >
            <CardContent className="p-4 flex items-center gap-3">
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
            </CardContent>
          </Card>
        )}

        <CustomRadioGroup
          label="Was the child born in Bhutan?"
          value={
            data.is_born_in_bhutan === true
              ? "yes"
              : data.is_born_in_bhutan === false
                ? "no"
                : undefined
          }
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
          onChange={(val) =>
            updateData({
              is_born_in_bhutan: val === "yes",
            })
          }
          error={errors.is_born_in_bhutan}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
              Registered in ePIS/MCH?{" "}
              <span className="text-destructive">*</span>
            </Label>
            <Select
              value={
                data.is_epis_registered === true
                  ? "yes"
                  : data.is_epis_registered === false
                    ? "no"
                    : ""
              }
              onValueChange={(val) =>
                updateData({
                  is_epis_registered: val === "yes",
                })
              }
            >
              <SelectTrigger className="h-10 rounded-lg">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
            {errors.is_epis_registered && (
              <p className="text-destructive text-[11px] font-semibold pl-0.5">
                {errors.is_epis_registered}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
              Marriage Certificate? <span className="text-destructive">*</span>
            </Label>
            <Select
              value={
                data.is_mc_valid === true
                  ? "yes"
                  : data.is_mc_valid === false
                    ? "no"
                    : ""
              }
              onValueChange={(val) =>
                updateData({
                  is_mc_valid: val === "yes",
                })
              }
            >
              <SelectTrigger className="h-10 rounded-lg">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
            {errors.is_mc_valid && (
              <p className="text-destructive text-[11px] font-semibold pl-0.5">
                {errors.is_mc_valid}
              </p>
            )}
          </div>
        </div>

        {/* Spouse Approval Requirement Notice */}
        {data.requiresSpouseApproval &&
          (data.applicant_is === "FATHER" ||
            data.applicant_is === "MOTHER") && (
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="py-4 px-4 sm:px-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-amber-900 mb-1">
                      Spouse Approval Required
                    </h4>
                    <p className="text-sm text-amber-800">
                      Based on your selections, approval from the{" "}
                      <span className="font-semibold">
                        {data.applicant_is === "FATHER" ? "Mother" : "Father"}
                      </span>{" "}
                      is required to proceed with this birth registration. You
                      will need to provide the spouse's consent in the following
                      steps.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

        {/* No Approval Required Notice */}
        {data.applicant_is === "FATHER" &&
          data.is_epis_registered === true &&
          data.is_mc_valid === true &&
          !data.requiresSpouseApproval && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="py-4 px-4 sm:px-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0 mt-0.5">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-green-900 mb-1">
                      No Additional Approval Required
                    </h4>
                    <p className="text-sm text-green-800">
                      Since you are registered in EPIS/MCH and have a valid
                      Marriage Certificate, you can proceed without the mother's
                      approval.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
      </div>
    </div>
  );
}
