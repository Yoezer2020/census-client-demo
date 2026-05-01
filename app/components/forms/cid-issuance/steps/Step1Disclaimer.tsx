"use client";

import { Checkbox } from "@/app/components/ui/checkbox";
import { Label } from "@/app/components/ui/label";
import { Card } from "@/app/components/ui/card";
import { Shield, Info } from "lucide-react";
import { CIDIssuanceData } from "@/lib/validations/cid-issuance.schema";

interface Step1DisclaimerProps {
  data: Partial<CIDIssuanceData>;
  updateData: (data: Partial<CIDIssuanceData>) => void;
}

export default function Step1Disclaimer({
  data,
  updateData,
}: Step1DisclaimerProps) {
  const terms = [
    "I certify that the information provided in this application is true and correct.",
    "I understand that any false statement may lead to the rejection of my application or legal action.",
    "I agree to my biometric data being cross-checked against Department of Civil Registration and Census records.",
    "I acknowledge that CID issuance is subject to verification of nationality and other eligibility criteria.",
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2 mb-8">
        <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Shield className="size-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Terms & Conditions</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Please review the following terms before proceeding with your CID application.
        </p>
      </div>

      <Card className="p-6 border-gray-100 bg-gray-50/30 space-y-4">
        <div className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100 mb-2">
          <Info className="size-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700 leading-relaxed font-medium">
            Applying for a Citizenship Identity Card is a serious matter. Ensure all details provided are accurate.
          </p>
        </div>

        <ul className="space-y-3">
          {terms.map((term, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
              <div className="size-5 bg-white rounded-full border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-400 shrink-0 mt-0.5">
                {i + 1}
              </div>
              {term}
            </li>
          ))}
        </ul>
      </Card>

      <div
        className="flex items-center gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer hover:bg-gray-50 group"
        onClick={() => updateData({ disclaimerAgreed: !data.disclaimerAgreed })}
      >
        <Checkbox
          id="disclaimer"
          checked={!!data.disclaimerAgreed}
          onCheckedChange={(checked) =>
            updateData({ disclaimerAgreed: checked === true })
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
    </div>
  );
}
