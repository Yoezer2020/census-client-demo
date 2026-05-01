"use client";

import { Checkbox } from "@/app/components/ui/checkbox";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent } from "@/app/components/ui/card";
import { DeathRegistrationData } from "@/lib/validations/death-registration.schema";

interface Step1DisclaimerProps {
  data: Partial<DeathRegistrationData>;
  updateData: (data: Partial<DeathRegistrationData>) => void;
  errors: Record<string, string>;
}

export default function Step1Disclaimer({
  data,
  updateData,
  errors,
}: Step1DisclaimerProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-2">
        <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
          Terms & Conditions
        </h3>
        <p className="text-sm sm:text-base text-gray-500">
          Please read carefully before proceeding
        </p>
      </div>

      <Card className="bg-primary/5">
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
            <p className="font-semibold text-base text-gray-900">
              Before proceeding with the death registration:
            </p>

            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="font-bold shrink-0">•</span>
                <span>
                  All information provided must be accurate and truthful
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold shrink-0">•</span>
                <span>
                  You will need the deceased's personal details and
                  documentation
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold shrink-0">•</span>
                <span>
                  A death certificate or medical certificate may be required
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold shrink-0">•</span>
                <span>False information may result in legal consequences</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold shrink-0">•</span>
                <span>
                  The registration process may take up to 5-7 business days
                </span>
              </li>
            </ul>

            <p className="font-semibold text-base text-gray-900 pt-2">
              Required Documents (if applicable):
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="font-bold shrink-0">•</span>
                <span>Death certificate from hospital/medical facility</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold shrink-0">•</span>
                <span>Deceased's CID (if available)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold shrink-0">•</span>
                <span>Applicant's CID</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold shrink-0">•</span>
                <span>Any supporting medical documents</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3 p-4 rounded-2xl hover:bg-gray-50 transition-all border border-gray-100 cursor-pointer group shadow-sm active:scale-[0.98]">
        <Checkbox
          id="disclaimer"
          checked={data.disclaimerAgreed === true}
          onCheckedChange={(checked) => {
            updateData({ disclaimerAgreed: checked as true });
          }}
          className="size-5"
        />
        <Label
          htmlFor="disclaimer"
          className="text-sm font-normal text-gray-900 cursor-pointer select-none flex-1"
        >
          I have read and understood the above information. I certify that all
          information I will provide is true and accurate to the best of my
          knowledge.
        </Label>
      </div>

      {errors.disclaimerAgreed && (
        <p className="text-destructive text-sm font-bold text-center bg-destructive/10 p-3 rounded-xl animate-in zoom-in duration-300">
          {errors.disclaimerAgreed}
        </p>
      )}
    </div>
  );
}
