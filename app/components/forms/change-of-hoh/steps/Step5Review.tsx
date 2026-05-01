"use client";

import { Card } from "@/app/components/ui/card";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Label } from "@/app/components/ui/label";
import { ClipboardCheck, User, AlertCircle } from "lucide-react";
import { ChangeOfHoHData } from "@/lib/validations/change-of-hoh.schema";

interface Step5ReviewProps {
  data: Partial<ChangeOfHoHData>;
  updateData: (data: Partial<ChangeOfHoHData>) => void;
  errors: Record<string, string>;
}

function ReviewField({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div className="flex justify-between items-start gap-4 pb-2 border-b border-gray-50 last:border-0 last:pb-0">
      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0">
        {label}
      </span>
      <span className="text-sm font-semibold text-gray-700 text-right">
        {value || <span className="text-gray-300 italic font-normal">N/A</span>}
      </span>
    </div>
  );
}

export default function Step5Review({
  data,
  updateData,
  errors,
}: Step5ReviewProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 flex items-start gap-4">
        <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
          <ClipboardCheck className="size-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Final Review</h3>
          <p className="text-sm text-gray-600">
            Please verify all information before official submission.
          </p>
        </div>
      </div>

      {/* Applicant Details */}
      <Card className="p-5 border-gray-100 shadow-sm space-y-4">
        <h4 className="font-bold text-gray-900 flex items-center gap-2">
          <User className="size-4 text-primary" /> Applicant Details
        </h4>
        <div className="space-y-3">
          <ReviewField label="Applicant CID" value={data.applicantCidNo} />
          <ReviewField label="Contact No" value={data.applicantContactNo} />
          <ReviewField label="Applicant Is" value={data.applicantIs} />
          <ReviewField label="Household No" value={data.householdNo} />
          <ReviewField label="HoH CID" value={data.hohCidNo} />
          <ReviewField label="House No" value={data.houseNo} />
          <ReviewField label="Tharm No" value={data.tharmNo} />
          <ReviewField label="Nationality" value={data.nationality} />
        </div>
      </Card>

      {/* New HoH Details */}
      <Card className="p-5 border-gray-100 shadow-sm space-y-4">
        <h4 className="font-bold text-gray-900 flex items-center gap-2">
          <User className="size-4 text-blue-600" /> New Head of Household
        </h4>
        <div className="space-y-3">
          <ReviewField label="New HoH CID" value={data.newHohCidNo} />
          <ReviewField label="First Name" value={data.firstName} />
          <ReviewField label="Middle Name" value={data.middleName} />
          <ReviewField label="Last Name" value={data.lastName} />
          <ReviewField label="Change Reason" value={data.hohChangeReasonId} />
        </div>
      </Card>

      {/* Declaration / Agreement */}
      <div
        className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all hover:bg-gray-50 group ${
          errors.i_agree_to_terms
            ? "border-red-300 bg-red-50/30"
            : "border-gray-200"
        }`}
        onClick={() => updateData({ i_agree_to_terms: !data.i_agree_to_terms })}
      >
        <Checkbox
          id="review-agree"
          checked={!!data.i_agree_to_terms}
          onCheckedChange={(checked) =>
            updateData({ i_agree_to_terms: checked === true })
          }
          className="size-5 mt-0.5 rounded border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary shrink-0"
        />
        <div>
          <Label
            htmlFor="review-agree"
            className="text-sm font-semibold text-gray-900 cursor-pointer select-none group-hover:text-primary transition-colors"
          >
            I confirm all information is accurate and agree to submit
          </Label>
          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
            I certify that the details above are true and correct. I understand
            that submitting false information may result in rejection or legal
            consequences.
          </p>
        </div>
      </div>
      {errors.i_agree_to_terms && (
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle className="size-4 shrink-0" />
          <p className="text-xs font-semibold">{errors.i_agree_to_terms}</p>
        </div>
      )}
    </div>
  );
}
