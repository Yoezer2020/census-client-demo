"use client";

import { Checkbox } from "@/app/components/ui/checkbox";
import { Label } from "@/app/components/ui/label";
import { Card } from "@/app/components/ui/card";
import { Home, Info } from "lucide-react";
import { HouseholdInfoData } from "@/lib/validations/change-of-hoh.schema";

interface HI1DisclaimerProps {
  data: Partial<HouseholdInfoData>;
  updateData: (data: Partial<HouseholdInfoData>) => void;
  errors: Record<string, string>;
}

const TERMS = [
  "I confirm that I am a registered member of the household I am requesting information for.",
  "I understand that household information is confidential and shall be used for official purposes only.",
  "I agree not to share or misuse the downloaded household details.",
  "I acknowledge that the information is extracted from the civil registry and may be subject to verification.",
];

export default function HI1Disclaimer({
  data,
  updateData,
  errors,
}: HI1DisclaimerProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2 mb-8">
        <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Home className="size-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Terms & Conditions</h3>
        <p className="text-gray-500 max-w-md mx-auto text-sm">
          Please read and accept the terms before requesting your household
          information.
        </p>
      </div>

      <Card className="p-6 border-gray-100 bg-gray-50/30 space-y-4">
        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100 mb-2">
          <Info className="size-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700 leading-relaxed font-medium">
            Household information will be available for download in your
            preferred language after submission.
          </p>
        </div>
        <ul className="space-y-3">
          {TERMS.map((term, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm text-gray-600 leading-relaxed"
            >
              <div className="size-5 bg-white rounded-full border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-400 shrink-0 mt-0.5">
                {i + 1}
              </div>
              {term}
            </li>
          ))}
        </ul>
      </Card>

      <div
        className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer hover:bg-gray-50 group ${
          errors.i_agree_to_terms
            ? "border-red-300 bg-red-50/30"
            : "border-gray-200"
        }`}
        onClick={() => updateData({ i_agree_to_terms: !data.i_agree_to_terms })}
      >
        <Checkbox
          id="hi-disclaimer"
          checked={!!data.i_agree_to_terms}
          onCheckedChange={(checked) =>
            updateData({ i_agree_to_terms: checked === true })
          }
          className="size-6 rounded-lg border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        <Label
          htmlFor="hi-disclaimer"
          className="text-base font-semibold text-gray-900 cursor-pointer select-none group-hover:text-primary transition-colors"
        >
          I agree to the terms and conditions
        </Label>
      </div>
      {errors.i_agree_to_terms && (
        <p className="text-red-500 text-xs font-semibold">
          {errors.i_agree_to_terms}
        </p>
      )}
    </div>
  );
}
