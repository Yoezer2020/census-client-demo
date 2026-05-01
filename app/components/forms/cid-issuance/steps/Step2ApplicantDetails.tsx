"use client";

import { useEffect, useState } from "react";
import { useSessionContext } from "@/app/context/SessionContext";
import {
  User,
  CheckCircle,
  CreditCard,
  MapPin,
  Phone,
  AlertCircle,
} from "lucide-react";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Card, CardContent } from "@/app/components/ui/card";
import { cn } from "@/lib/utils";
import { CIDIssuanceData } from "@/lib/validations/cid-issuance.schema";
import OperatorService from "@/lib/services/common-service/operator/operator";

interface Step2ApplicantDetailsProps {
  data: Partial<CIDIssuanceData>;
  updateData: (data: Partial<CIDIssuanceData>) => void;
  errors: Record<string, string>;
  onOperatorValidationChange?: (isValid: boolean | null) => void;
}

export default function Step2ApplicantDetails({
  data,
  updateData,
  errors,
  onOperatorValidationChange,
}: Step2ApplicantDetailsProps) {
  // Use session to get logged-in user's CID
  const { session } = useSessionContext();
  const dummyCID = session?.user?.cidNo || "11234567890";
  const dummyName = session?.user?.fullName || "Demo User";

  const [isOperatorVerifying, setIsOperatorVerifying] = useState(false);
  const [isValidOperator, setIsValidOperator] = useState<boolean | null>(null);

  // Auto-fill CID and Name from logged-in user
  useEffect(() => {
    const updates: Partial<CIDIssuanceData> = {};

    // Auto-fill from session
    if (!data.applicantCID) {
      updates.applicantCID = dummyCID;
    }

    if (!data.applicantName) {
      updates.applicantName = dummyName;
    }

    // Set cid_no based on applicant type
    if (data.applicantType === "self") {
      updates.cid_no = dummyCID;
    }

    if (Object.keys(updates).length > 0) {
      console.log("Auto-filling applicant details from session:", updates);
      updateData(updates);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.applicantCID, data.applicantName, data.applicantType, dummyCID]);

  // Check operator status when applicantType is "operator"
  useEffect(() => {
    const checkOperator = async () => {
      if (data.applicantType === "operator") {
        setIsOperatorVerifying(true);
        try {
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 500));

          // Demo: Always return true for demo CID
          const isValid =
            dummyCID === "11234567890" || dummyCID === "11105001234";
          setIsValidOperator(isValid);
          onOperatorValidationChange?.(isValid);
        } catch (error) {
          console.error("Error checking operator status:", error);
          setIsValidOperator(false);
          onOperatorValidationChange?.(false);
        } finally {
          setIsOperatorVerifying(false);
        }
      } else if (data.applicantType !== "operator") {
        // Reset operator validation when not operator
        setIsValidOperator(null);
        onOperatorValidationChange?.(null);
      }
    };
    checkOperator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.applicantType]);

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

      {/* Demo Credentials Card */}
      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-purple-900 mb-2">
                CID Issuance Test Scenarios
              </h4>
              <div className="space-y-2">
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-700 mb-1">
                    <span className="font-semibold text-purple-800">
                      Mother (11234567890):
                    </span>
                  </p>
                  <p className="text-xs text-gray-600">
                    \u2192 No CID card found in system
                  </p>
                  <p className="text-xs text-gray-600">
                    \u2192 New CID application (Nu. 100)
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-700 mb-1">
                    <span className="font-semibold text-purple-800">
                      Father (11105001234):
                    </span>
                  </p>
                  <p className="text-xs text-gray-600">
                    \u2192 CID validity not within 6 months
                  </p>
                  <p className="text-xs text-gray-600">
                    \u2192 Replacement card required (Nu. 300)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verified NDI Card Pattern */}
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
              <h4 className="text-sm font-bold text-gray-900 truncate uppercase">
                {data.applicantName || dummyName}
              </h4>
            </div>
            <div className="h-8 w-px bg-gray-100 hidden sm:block" />
            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">
                Identity Number
              </p>
              <p className="text-sm text-gray-900 font-bold truncate uppercase">
                {data.applicantCID || dummyCID}
              </p>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-green-500 text-white text-[10px] font-bold uppercase shrink-0 shadow-lg shadow-green-500/20">
            {status === "loading" ? "Verifying..." : "Verified"}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6 sm:space-y-8 pt-4">
        <div className="space-y-4">
          <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
            Applicant Type <span className="text-destructive">*</span>
          </Label>
          <Select
            value={data.applicantType || ""}
            onValueChange={(val) => {
              updateData({
                applicantType: val as "parent" | "self" | "operator",
              });
              setIsValidOperator(null); // Reset operator validation
            }}
          >
            <SelectTrigger className="h-10 rounded-lg">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="self">Self</SelectItem>
              <SelectItem value="parent">Parent/Guardian</SelectItem>
              <SelectItem value="operator">Official Operator</SelectItem>
            </SelectContent>
          </Select>
          {errors.applicantType && (
            <p className="text-destructive text-[11px] font-semibold pl-0.5">
              {errors.applicantType}
            </p>
          )}
        </div>

        {/* Operator Verification Status */}
        {data.applicantType === "operator" && (
          <div className="animate-in slide-in-from-top-2 duration-300">
            {isOperatorVerifying ? (
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="size-5 border-2 border-blue-600 border-t-transparent animate-spin rounded-full" />
                <p className="text-sm text-blue-800 font-medium">
                  Verifying operator credentials...
                </p>
              </div>
            ) : isValidOperator === true ? (
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                <CheckCircle className="size-5 text-green-600 mt-0.5 shrink-0" />
                <p className="text-sm text-green-800 leading-relaxed font-medium">
                  Authentic operator verified by the Department of Civil
                  Registration.
                </p>
              </div>
            ) : isValidOperator === false ? (
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
                <AlertCircle className="size-5 text-red-600 mt-0.5 shrink-0" />
                <p className="text-sm text-red-800 leading-relaxed font-medium">
                  Not an official operator recognized by the Department of Civil
                  Registration.
                </p>
              </div>
            ) : null}
          </div>
        )}

        {/* Phone Number Field */}
        {data.applicantType && (
          <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
            <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
              {data.applicantType === "parent"
                ? "Parent/Guardian Contact Number"
                : "Applicant Phone Number"}{" "}
              <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                type="tel"
                value={data.applicantPhoneNumber || ""}
                onChange={(e) =>
                  updateData({ applicantPhoneNumber: e.target.value })
                }
                placeholder="Enter phone number"
                className="h-11 pl-10 rounded-lg font-bold"
              />
            </div>
            {errors.applicantPhoneNumber && (
              <p className="text-destructive text-[11px] font-semibold pl-0.5">
                {errors.applicantPhoneNumber}
              </p>
            )}
          </div>
        )}

        {/* CID Number Field for non-self applicants */}
        {data.applicantType && data.applicantType !== "self" && (
          <div className="space-y-4 animate-in slide-in-from-top-2 duration-300 border-t border-gray-50 pt-6">
            <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
              {data.applicantType === "parent"
                ? "Child/Dependent CID Number"
                : "Applicant CID Number"}{" "}
              <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                type="text"
                value={data.recipientCID || ""}
                onChange={(e) => {
                  const cidValue = e.target.value;
                  updateData({
                    recipientCID: cidValue,
                    cid_no: cidValue, // Set cid_no for non-self applicants
                  });
                }}
                placeholder="Enter 11-digit CID"
                maxLength={11}
                className="h-11 pl-10 rounded-lg font-bold"
              />
            </div>
            {errors.recipientCID && (
              <p className="text-destructive text-[11px] font-semibold pl-0.5">
                {errors.recipientCID}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
