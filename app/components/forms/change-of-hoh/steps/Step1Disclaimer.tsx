"use client";

import { Checkbox } from "@/app/components/ui/checkbox";
import { Label } from "@/app/components/ui/label";
import { Card } from "@/app/components/ui/card";
import { Shield, Info } from "lucide-react";
import { ChangeOfHoHData } from "@/lib/validations/change-of-hoh.schema";

interface Step1DisclaimerProps {
  data: Partial<ChangeOfHoHData>;
  updateData: (data: Partial<ChangeOfHoHData>) => void;
  errors: Record<string, string>;
}

const TERMS = [
  "I certify that the information provided in this application is true, correct, and complete.",
  "I understand that submitting false information may result in rejection of the application or legal consequences.",
  "I confirm that the proposed new Head of Household is an adult member of the household and is not a minor.",
  "I acknowledge that the change is subject to verification by the Department of Civil Registration and Census.",
];

export default function Step1Disclaimer({
  data,
  updateData,
  errors,
}: Step1DisclaimerProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2 mb-8">
        <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Shield className="size-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Terms & Conditions</h3>
        <p className="text-gray-500 max-w-md mx-auto text-sm">
          Please read and accept the following before proceeding with your
          Change of Head of Household application.
        </p>
      </div>

      <Card className="p-6 border-gray-100 bg-gray-50/30 space-y-4">
        <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100 mb-2">
          <Info className="size-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700 leading-relaxed font-medium">
            Changing the Head of Household is a significant administrative
            action. Please ensure all details are accurate before proceeding.
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
          id="disclaimer"
          checked={!!data.i_agree_to_terms}
          onCheckedChange={(checked) =>
            updateData({ i_agree_to_terms: checked === true })
          }
          className="size-6 rounded-lg border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        <Label
          htmlFor="disclaimer"
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
