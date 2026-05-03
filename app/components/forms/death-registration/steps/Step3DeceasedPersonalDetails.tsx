"use client";

import { Input, Select } from "../ui/FormFields";
import { Card, CardContent } from "@/app/components/ui/card";
import { DeathRegistrationData } from "@/lib/validations/death-registration.schema";

interface Step3DeceasedPersonalDetailsProps {
  data: Partial<DeathRegistrationData>;
  updateData: (data: Partial<DeathRegistrationData>) => void;
  errors: Record<string, string>;
}

export default function Step3DeceasedPersonalDetails({
  data,
  updateData,
  errors,
}: Step3DeceasedPersonalDetailsProps) {
  console.log("Deceased Personal Details Data---------------->", data);
  return (
    <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-2">
        <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
          Deceased Personal Details
        </h3>
        <p className="text-sm sm:text-base text-gray-500">
          Provide information about the deceased person
        </p>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6 space-y-6">
          <Input
            label="Deceased CID"
            id="deceased_cid"
            type="text"
            placeholder="Enter deceased's CID"
            value={data.deceased_cid || ""}
            onChange={(e) => updateData({ deceased_cid: e.target.value })}
            maxLength={11}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Input
              label="First Name"
              required
              id="first_name"
              type="text"
              placeholder="First Name"
              value={data.first_name || ""}
              onChange={(e) => updateData({ first_name: e.target.value })}
              error={errors.first_name}
            />

            <Input
              label="Middle Name"
              id="middle_name"
              type="text"
              placeholder="Middle Name"
              value={data.middle_name || ""}
              onChange={(e) => updateData({ middle_name: e.target.value })}
            />

            <Input
              label="Last Name"
              required
              id="last_name"
              type="text"
              placeholder="Last Name"
              value={data.last_name || ""}
              onChange={(e) => updateData({ last_name: e.target.value })}
              error={errors.last_name}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Date of Birth"
              required
              id="date_of_birth"
              type="date"
              value={data.date_of_birth || ""}
              onChange={(e) => updateData({ date_of_birth: e.target.value })}
              error={errors.date_of_birth}
            />

            <Select
              label="Gender"
              required
              value={data.gender || ""}
              onChange={(e) =>
                updateData({
                  gender: e.target.value as "male" | "female" | "other",
                })
              }
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
              error={errors.gender}
            />
          </div>
        </CardContent>
      </Card>

      {/* Information Note Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4 sm:p-6">
          <h4 className="text-sm sm:text-base font-semibold text-blue-900 mb-3">
            📋 Important Note - Head of Household (HoH) Requirements
          </h4>
          <div className="space-y-2 text-xs sm:text-sm text-blue-800">
            <p className="flex gap-2">
              <span className="font-semibold min-w-[1.5rem]">1.</span>
              <span>
                If deceased person is HoH, then system will throw{" "}
                <strong className="text-blue-900">
                  "Apply for change of HoH first in order to register death of
                  this person"
                </strong>
              </span>
            </p>
            <p className="flex gap-2">
              <span className="font-semibold min-w-[1.5rem]">2.</span>
              <span>
                If deceased person is HoH and is a lone member, then will be
                allowed to apply. After admin approval, household will be
                dissolved.
              </span>
            </p>
            <p className="flex gap-2">
              <span className="font-semibold min-w-[1.5rem]">3.</span>
              <span>
                If deceased person is HoH and two members in the household,
                still be allowed to apply as default the other member will
                become HoH, even if minor.
              </span>
            </p>
            <p className="flex gap-2">
              <span className="font-semibold min-w-[1.5rem]">4.</span>
              <span>
                If three or more in a household, then change of HoH must be done
                first.
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
