"use client";

import { BirthRegistrationData } from "@/lib/validations/birth-registration.schema";
import { Card, CardContent } from "@/app/components/ui/card";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Label } from "@/app/components/ui/label";

interface StepProps {
  data: Partial<BirthRegistrationData>;
  updateData: (data: Partial<BirthRegistrationData>) => void;
  errors: Record<string, string>;
}

export default function Step10Review({ data, updateData, errors }: StepProps) {
  const sections = [
    {
      label: "Applicant CID",
      value: data.applicant_cid || "-",
    },
    {
      label: "Applicant Contact No",
      value: data.applicant_contact_no || "-",
    },
    {
      label: "Applicant Type",
      value: data.applicant_is || "-",
    },
    {
      label: "Child Name",
      value:
        `${data.first_name || ""} ${data.middle_name || ""} ${data.last_name || ""}`.trim() ||
        "-",
    },
    {
      label: "Date of Birth",
      value: `${data.date_of_birth || "-"} at ${data.time_of_birth || "-"}`,
    },
    { label: "Gender", value: data.gender || "-" },
    { label: "Birth Weight", value: data.weight ? `${data.weight} kg` : "-" },

    { label: "Father CID", value: data.father_cid || "-" },
    {
      label: "Father Contact No",
      value: data.fathers_contact_no || "-",
    },

    { label: "Mother CID", value: data.mother_cid || "-" },
    {
      label: "Mother Contact No",
      value: data.mothers_contact_no || "-",
    },
    {
      label: "Guarantor CID",
      value: data.guarantor_cid || "-",
    },
    {
      label: "Guarantor Contact No",
      value: data.guarantor_contact_no || "-",
    },
    {
      label: "Household Selection",
      value: data.registerWithHousehold || "-",
    },
    {
      label: "Child Household No",
      value: data.child_hh_no || "-",
    },
    {
      label: "Certificate",
      value:
        data.certificate && data.certificate.length > 0
          ? `${data.certificate.length} file(s) uploaded`
          : "No file uploaded",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-2">
        <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
          Review Application
        </h3>
        <p className="text-sm sm:text-base text-gray-500">
          Please verify all details before submitting
        </p>
      </div>

      <Card className="overflow-hidden p-0 border-gray-100">
        <CardContent className="p-0 divide-y divide-gray-50">
          {sections.map((item) => (
            <div
              key={item.label}
              className="px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4 group hover:bg-gray-50 transition-colors"
            >
              <span className="text-[10px] sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">
                {item.label}
              </span>
              <span className="text-sm sm:text-base font-bold text-gray-900 sm:text-right">
                {item.value || "-"}
              </span>
            </div>
          ))}
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

      <Card className="bg-primary/5 border-primary/10">
        <CardContent className="p-4 text-sm font-medium text-primary text-center">
          By submitting this form, I certify that the information provided is
          true and accurate to the best of my knowledge.
        </CardContent>
      </Card>
    </div>
  );
}
