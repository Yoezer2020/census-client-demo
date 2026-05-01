"use client";

import { Input } from "../ui/FormFields";
import { Card, CardContent } from "@/app/components/ui/card";
import { DeathRegistrationData } from "@/lib/validations/death-registration.schema";

interface Step6DeathLocationDetailsProps {
  data: Partial<DeathRegistrationData>;
  updateData: (data: Partial<DeathRegistrationData>) => void;
  errors: Record<string, string>;
}

export default function Step6DeathLocationDetails({
  data,
  updateData,
  errors,
}: Step6DeathLocationDetailsProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-2">
        <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
          Death Location
        </h3>
        <p className="text-sm sm:text-base text-gray-500">
          Specify where the death occurred (all fields optional)
        </p>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6 space-y-6">
          <Input
            label="Country of Death"
            id="countryOfDeathId"
            type="text"
            placeholder="Enter country"
            value={data.countryOfDeathId || ""}
            onChange={(e) => updateData({ countryOfDeathId: e.target.value })}
          />

          <Input
            label="Dzongkhag of Death"
            id="dzongkhagOfDeathId"
            type="text"
            placeholder="Enter Dzongkhag"
            value={data.dzongkhagOfDeathId || ""}
            onChange={(e) => updateData({ dzongkhagOfDeathId: e.target.value })}
          />

          <Input
            label="Gewog of Death"
            id="gewogOfDeathId"
            type="text"
            placeholder="Enter Gewog"
            value={data.gewogOfDeathId || ""}
            onChange={(e) => updateData({ gewogOfDeathId: e.target.value })}
          />

          <Input
            label="Village of Death"
            id="villageOfDeathId"
            type="text"
            placeholder="Enter Village"
            value={data.villageOfDeathId || ""}
            onChange={(e) => updateData({ villageOfDeathId: e.target.value })}
          />

          <Input
            label="City of Death"
            id="cityId"
            type="text"
            placeholder="Enter City"
            value={data.cityId || ""}
            onChange={(e) => updateData({ cityId: e.target.value })}
          />
        </CardContent>
      </Card>
    </div>
  );
}
