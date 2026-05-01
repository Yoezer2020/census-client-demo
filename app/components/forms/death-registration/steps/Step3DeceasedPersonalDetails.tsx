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
    </div>
  );
}
