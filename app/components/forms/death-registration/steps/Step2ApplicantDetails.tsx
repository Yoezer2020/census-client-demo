"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { User, CheckCircle, Loader2, XCircle } from "lucide-react";
import { Input } from "../ui/FormFields";
import { Card, CardContent } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { DeathRegistrationData } from "@/lib/validations/death-registration.schema";

interface Step2ApplicantDetailsProps {
  data: Partial<DeathRegistrationData>;
  updateData: (data: Partial<DeathRegistrationData>) => void;
  errors: Record<string, string>;
  onProceedToManualEntry?: () => void;
}

export default function Step2ApplicantDetails({
  data,
  updateData,
  errors,
  onProceedToManualEntry,
}: Step2ApplicantDetailsProps) {
  // DEMO: Use dummy data
  const dummyCID = "11234567890"; // Mother's CID
  const dummyName = "Demo Mother";

  const [isCheckingOperator, setIsCheckingOperator] = useState(false);
  const [operatorStatus, setOperatorStatus] = useState<boolean | null>(null);

  useEffect(() => {
    const updates: Partial<DeathRegistrationData> = {};

    if (!data.applicantCID) {
      updates.applicantCID = dummyCID;
    }

    if (!data.applicant_cid) {
      updates.applicant_cid = dummyCID;
    }

    if (Object.keys(updates).length > 0) {
      updateData(updates);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.applicantCID, data.applicant_cid]);

  // Check operator status when applicant type changes to "OPERATOR"
  useEffect(() => {
    const checkOperator = async () => {
      if (data.applicant_is !== "OPERATOR") {
        setOperatorStatus(null);
        updateData({ isOperatorVerified: undefined });
        return;
      }

      setIsCheckingOperator(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Demo: Always return true for demo CID
        const isOperator =
          dummyCID === "11234567890" || dummyCID === "11105001234";
        setOperatorStatus(isOperator);
        updateData({ isOperatorVerified: isOperator });
      } catch (error) {
        console.error("Operator check failed:", error);
        setOperatorStatus(false);
        updateData({ isOperatorVerified: false });
      } finally {
        setIsCheckingOperator(false);
      }
    };

    checkOperator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.applicant_is]);

  const handleEpisVerify = async () => {
    if (!data.deceased_cid) {
      toast.error("Please enter deceased CID number first");
      return;
    }

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Demo: CID not in ePIS, but fetch from citizen registry
      const citizenData = {
        citizen_details: {
          first_name: "Tashi",
          middle_name: "Namgyal",
          last_name: "Wangchuk",
          date_of_birth: "1950-06-15",
          gender: "male",
        },
        household_information: {
          dzongkhag_id: "1",
          gewog_id: "1",
          chiwog_id: "1",
          village_id: "1",
          household_no: "HH-11305",
          house_no: "205",
        },
      };

      // Not registered in ePIS but found in citizen registry
      updateData({
        is_health_registered: false,
        deceasedCID: data.deceased_cid,
        deceased_cid: data.deceased_cid,
        first_name: citizenData.citizen_details.first_name,
        middle_name: citizenData.citizen_details.middle_name,
        last_name: citizenData.citizen_details.last_name,
        date_of_birth: citizenData.citizen_details.date_of_birth,
        gender: (citizenData.citizen_details.gender || "").toLowerCase() as
          | "male"
          | "female"
          | "other",
        dzongkhag_id: citizenData.household_information.dzongkhag_id,
        gewog_id: citizenData.household_information.gewog_id,
        chiwog_id: citizenData.household_information.chiwog_id,
        village_id: citizenData.household_information.village_id,
        house_hold_no: citizenData.household_information.household_no,
        house_no: citizenData.household_information.house_no,
      });
      toast.success("Deceased details fetched from Citizen Registry");
    } catch (error) {
      console.error("Failed to fetch deceased details", error);
      updateData({ is_health_registered: false });
      toast.error("Failed to fetch deceased details. Please try again.");
    }
  };

  const CustomRadioGroup = ({
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
  }) => (
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

  return (
    <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-2">
        <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
          Applicant Information
        </h3>
        <p className="text-sm sm:text-base text-gray-500">
          Verify your identity and check if deceased was registered in ePIS
        </p>
      </div>

      {/* Demo Credentials */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <h5 className="text-sm font-bold text-blue-900 mb-2">
                Demo Test Data
              </h5>
              <div className="space-y-1">
                <p className="text-xs text-blue-700">
                  <span className="font-semibold">Deceased CID:</span>{" "}
                  <code className="bg-blue-100 px-2 py-0.5 rounded font-mono">
                    11305004567
                  </code>
                </p>
                <p className="text-xs text-blue-600 italic">
                  (Not in ePIS, but will fetch from Citizen Registry with full
                  address)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
                {dummyName}
              </h4>
            </div>
            <div className="hidden sm:block h-8 w-[1px] bg-gray-200" />
            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                CID Number
              </p>
              <h4 className="text-sm font-bold text-gray-900">
                {data.applicantCID || dummyCID}
              </h4>
            </div>
          </div>
        </CardContent>
      </Card>

      <Input
        label="Applicant Contact Number"
        required
        id="applicant_contact_no"
        type="text"
        placeholder="Enter applicant contact number"
        value={data.applicant_contact_no || ""}
        onChange={(e) => updateData({ applicant_contact_no: e.target.value })}
        error={errors.applicant_contact_no}
      />

      {/* Applicant Type */}
      <CustomRadioGroup
        label="You are applying as?"
        value={data.applicant_is}
        options={[
          { label: "Family Member", value: "FAMILY" },
          { label: "Operator", value: "OPERATOR" },
        ]}
        onChange={(val) =>
          updateData({ applicant_is: val as "FAMILY" | "OPERATOR" })
        }
        error={errors.applicant_is}
      />

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

      {/* ePIS Registration Check */}
      <CustomRadioGroup
        label="Is the deceased registered in ePIS (Health System)?"
        value={
          data.is_health_registered === true
            ? "yes"
            : data.is_health_registered === false
              ? "no"
              : undefined
        }
        options={[
          { label: "Yes, registered in ePIS", value: "yes" },
          { label: "No, fetch from Citizen Registry", value: "no" },
        ]}
        onChange={(val) =>
          updateData({
            is_health_registered: val === "yes",
          })
        }
        error={errors.is_health_registered}
      />

      {/* CID Input and Verify (always show when option selected) */}
      {data.is_health_registered !== undefined && (
        <Card className="border-blue-200 bg-blue-50/30">
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4">
              <div className="flex-1">
                <Input
                  label="Deceased CID Number"
                  required
                  id="deceased_cid"
                  type="text"
                  placeholder="Enter deceased CID No"
                  value={data.deceased_cid || ""}
                  onChange={(e) => updateData({ deceased_cid: e.target.value })}
                  error={errors.deceased_cid}
                />
              </div>
              <Button
                type="button"
                onClick={handleEpisVerify}
                className="h-10 px-6 bg-primary text-white rounded-lg font-bold shadow-sm hover:opacity-90 transition-all text-sm whitespace-nowrap"
              >
                Verify & Fetch Data
              </Button>
            </div>

            {/* Display fetched data */}
            {data.deceased_cid && data.first_name && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h5 className="text-sm font-bold text-green-900">
                    Data Retrieved Successfully
                  </h5>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-green-700 uppercase tracking-wider">
                      Full Name:
                    </span>
                    <span className="text-sm font-bold text-green-900">
                      {[data.first_name, data.middle_name, data.last_name]
                        .filter(Boolean)
                        .join(" ")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-green-700 uppercase tracking-wider">
                      CID Number:
                    </span>
                    <span className="text-sm font-bold text-green-900">
                      {data.deceased_cid || data.deceasedCID}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <p className="text-xs text-blue-700 bg-blue-100 p-3 rounded-lg">
              <strong>Note:</strong>{" "}
              {data.is_health_registered
                ? "Entering the deceased CID will fetch information from the ePIS/Health system."
                : "Entering the deceased CID will fetch information from the Citizen Registry, including personal details and permanent address."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
