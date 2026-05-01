"use client";

import { Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Home, Download, Globe, Info, AlertCircle } from "lucide-react";
import { HouseholdInfoData } from "@/lib/validations/change-of-hoh.schema";

interface HI3HouseholdDetailsProps {
  data: Partial<HouseholdInfoData>;
  updateData: (data: Partial<HouseholdInfoData>) => void;
  errors: Record<string, string>;
  submitted?: boolean;
}

const LANGUAGES: Array<{
  value: "English" | "Dzongkha";
  label: string;
  script?: string;
}> = [
  { value: "English", label: "English", script: "Download in English" },
  { value: "Dzongkha", label: "Dzongkha", script: "རྫོང་ཁར་ཕབས་ལེན" },
];

export default function HI3HouseholdDetails({
  data,
  updateData,
  errors,
  submitted,
}: HI3HouseholdDetailsProps) {
  const handleDownload = () => {
    // Mock PDF download
    const lang = data.language_preference ?? "English";
    const filename = `household-info-${lang.toLowerCase()}.pdf`;

    // Create a dummy PDF blob (in production this would be a real API call)
    const blob = new Blob(
      [
        `Household Information Document\nApplicant CID: ${data.cid_of_applicant}\nName: ${data.applicant_name}\nLanguage: ${lang}`,
      ],
      { type: "application/pdf" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2 mb-8">
        <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Home className="size-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Household Details</h3>
        <p className="text-gray-500 max-w-md mx-auto text-sm">
          Select your preferred language for the household information document.
        </p>
      </div>

      <Card className="p-5 border-blue-100 bg-blue-50/20 flex gap-3">
        <Info className="size-5 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700 leading-relaxed">
          Your household information will be generated from the civil registry.
          Choose your preferred language and click <strong>Download</strong>{" "}
          after submission.
        </p>
      </Card>

      {/* Language Preference */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-gray-700">
          Language Preference <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LANGUAGES.map((lang) => {
            const isSelected = data.language_preference === lang.value;
            return (
              <button
                key={lang.value}
                type="button"
                onClick={() => updateData({ language_preference: lang.value })}
                className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left hover:border-primary group ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                <div
                  className={`size-10 rounded-xl flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary"
                  }`}
                >
                  <Globe className="size-5" />
                </div>
                <div>
                  <p
                    className={`font-semibold text-base ${isSelected ? "text-primary" : "text-gray-800"}`}
                  >
                    {lang.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{lang.script}</p>
                </div>
                {isSelected && (
                  <div className="ml-auto size-5 bg-primary rounded-full flex items-center justify-center">
                    <svg
                      className="size-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
        {errors.language_preference && (
          <p className="text-red-500 text-xs font-semibold">
            {errors.language_preference}
          </p>
        )}
      </div>

      {/* Download Button — shown after submission */}
      {submitted && data.language_preference && (
        <Card className="p-6 border-green-100 bg-green-50/30 space-y-4 text-center">
          <div className="size-14 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Download className="size-7 text-green-600" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-lg">
              Ready to Download
            </h4>
            <p className="text-sm text-gray-500 mt-1">
              Your household information in{" "}
              <strong>{data.language_preference}</strong> is ready.
            </p>
          </div>
          <Button
            onClick={handleDownload}
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold gap-2"
          >
            <Download className="size-4" />
            Download Household Information
          </Button>
        </Card>
      )}

      {/* Declaration */}
      <div
        className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all hover:bg-gray-50 group ${
          errors.i_agree_to_terms
            ? "border-red-300 bg-red-50/30"
            : "border-gray-200"
        }`}
        onClick={() => updateData({ i_agree_to_terms: !data.i_agree_to_terms })}
      >
        <Checkbox
          id="hi-agree"
          checked={!!data.i_agree_to_terms}
          onCheckedChange={(checked) =>
            updateData({ i_agree_to_terms: checked === true })
          }
          className="size-5 mt-0.5 rounded border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary shrink-0"
        />
        <div>
          <Label
            htmlFor="hi-agree"
            className="text-sm font-semibold text-gray-900 cursor-pointer select-none group-hover:text-primary transition-colors"
          >
            I confirm and agree to submit this request
          </Label>
          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
            I certify that I am authorised to request this household information
            and agree that it will be used for official purposes only.
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
