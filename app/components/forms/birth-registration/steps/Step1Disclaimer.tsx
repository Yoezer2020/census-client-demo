"use client";

import { BirthRegistrationData } from "@/lib/validations/birth-registration.schema";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent } from "@/app/components/ui/card";
import { cn } from "@/lib/utils";

interface StepProps {
  data: Partial<BirthRegistrationData>;
  updateData: (data: Partial<BirthRegistrationData>) => void;
  errors: Record<string, string>;
}

export default function Step1Disclaimer({
  data,
  updateData,
  errors,
}: StepProps) {
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
        <CardContent className="p-6">
          <ul className="space-y-4 text-sm text-gray-700 leading-relaxed">
            <li className="flex gap-3">
              <span className="font-bold shrink-0">•</span>
              <span>
                I hereby declare that the information provided in this form is
                true and correct to the best of my knowledge.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold shrink-0">•</span>
              <span>
                I understand that providing false information is a punishable
                offense under the laws of the Kingdom of Bhutan.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold shrink-0">•</span>
              <span>
                I agree to the processing of my personal data for the purpose of
                birth registration.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3 p-4 rounded-2xl hover:bg-gray-50 transition-all border border-gray-100 cursor-pointer group shadow-sm active:scale-[0.98]">
        <Checkbox
          id="disclaimer-agree"
          checked={!!data.disclaimerAgreed}
          onCheckedChange={(checked) =>
            updateData({
              disclaimerAgreed: checked === true ? true : undefined,
            })
          }
          className="size-5"
        />
        <Label
          htmlFor="disclaimer-agree"
          className="text-sm font-normal text-gray-900 cursor-pointer select-none flex-1"
        >
          I agree to the terms and conditions
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
