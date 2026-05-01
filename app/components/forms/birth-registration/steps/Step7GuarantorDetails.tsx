"use client";

import { useEffect, useState } from "react";
import { useSessionContext } from "@/app/context/SessionContext";
import { BirthRegistrationData } from "@/lib/validations/birth-registration.schema";
import { Input } from "../ui/FormFields";
import RelationshipAutocomplete from "../components/autocomplete/RelationshipAutocomplete";
import RelationshipsService from "@/lib/services/common-service/relationships/relationships";

interface Relationship {
  id: string;
  name: string;
}

interface StepProps {
  data: Partial<BirthRegistrationData>;
  updateData: (data: Partial<BirthRegistrationData>) => void;
  errors: Record<string, string>;
}

export default function Step7GuarantorDetails({
  data,
  updateData,
  errors,
}: StepProps) {
  const { session } = useSessionContext();
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [relationshipQuery, setRelationshipQuery] = useState("");

  useEffect(() => {
    // DEMO: Use dummy relationships data
    const dummyRelationships: Relationship[] = [
      { id: "1", name: "Uncle" },
      { id: "2", name: "Aunt" },
      { id: "3", name: "Grandfather" },
      { id: "4", name: "Grandmother" },
      { id: "5", name: "Guardian" },
      { id: "6", name: "Other Relative" },
    ];
    setRelationships(dummyRelationships);
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-1 sm:space-y-2">
        <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
          Guarantor Details
        </h3>
        <p className="text-sm sm:text-base text-gray-500">
          Required since both parents are deceased
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Input
          label="Guarantor CID"
          required
          value={data.guarantor_cid || ""}
          onChange={(e) => updateData({ guarantor_cid: e.target.value })}
          placeholder="Enter Guarantor CID"
          maxLength={11}
          error={errors.guarantor_cid}
        />

        <Input
          label="Guarantor Contact Number"
          required
          value={data.guarantor_contact_no || ""}
          onChange={(e) => updateData({ guarantor_contact_no: e.target.value })}
          placeholder="Enter Guarantor Contact Number"
          error={errors.guarantor_contact_no}
        />

        <RelationshipAutocomplete
          value={relationshipQuery}
          options={relationships}
          onSelect={(value, selected) => {
            setRelationshipQuery(value);
            updateData({
              relationship: selected?.id,
            });
          }}
          error={errors.relationship}
        />
      </div>
    </div>
  );
}
