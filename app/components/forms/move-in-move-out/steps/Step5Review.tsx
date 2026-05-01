"use client";

import { MoveInMoveOutData } from "@/lib/validations/move-in-move-out.schema";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Textarea } from "@/app/components/ui/textarea";
import { Home, MapPin, Users, CheckCircle, ChevronRight } from "lucide-react";

interface Step5Props {
  data: Partial<MoveInMoveOutData>;
  updateData: (data: Partial<MoveInMoveOutData>) => void;
}

export default function Step5Review({ data, updateData }: Step5Props) {
  const members = data.movingMembers || [];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Summary Card */}
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <CheckCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Review Your Application
            </h3>
            <p className="text-sm text-gray-600">
              Please verify all details before submitting
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Current Household Details */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Home className="w-5 h-5 text-primary" />
          <h4 className="font-bold text-gray-900">Current Household Details</h4>
        </div>
        <div className="space-y-3 text-sm">
          <DetailRow label="Applicant CID" value={data.applicantCidNo} />
          <DetailRow label="Applicant Name" value={data.applicantName} />
          <DetailRow label="Contact Number" value={data.applicantContactNo} />
          <DetailRow
            label="Current Household No"
            value={data.currentHouseholdNo}
          />
          <DetailRow
            label="Current Location"
            value={`${data.currentVillageId || ""}, ${data.currentGewogId || ""}, ${data.currentDzongkhagId || ""}`}
          />
        </div>
      </div>

      {/* Section 2: Move In Location */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-primary" />
          <h4 className="font-bold text-gray-900">Move In Location Details</h4>
        </div>
        <div className="space-y-3 text-sm">
          <DetailRow
            label="Move Type"
            value={
              data.moveType === "new_household"
                ? "Create New Household"
                : "Join Existing Household"
            }
          />
          {data.moveType === "join_household" && (
            <DetailRow
              label="Joining Household No"
              value={data.moveInHouseholdNo}
            />
          )}
          <DetailRow label="House Number" value={data.moveInHouseNo} />
          <DetailRow label="Tharm Number" value={data.moveInTharmNo} />
          <DetailRow
            label="Move-In Location"
            value={`${data.moveInVillageId || ""}, ${data.moveInGewogId || ""}, ${data.moveInDzongkhagId || ""}`}
          />
        </div>
      </div>

      {/* Section 3: Household Members */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-primary" />
          <h4 className="font-bold text-gray-900">
            Household Members ({members.length})
          </h4>
        </div>
        {members.length > 0 ? (
          <div className="space-y-3">
            {members.map((member, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1 space-y-1">
                  <div className="font-semibold text-gray-900">
                    {member.member_name}
                  </div>
                  <div className="text-sm text-gray-600">
                    CID: {member.member_cid} • {member.gender}
                  </div>
                  <div className="text-sm text-gray-600">
                    Relation: {member.relation_to_hoh}
                  </div>
                  {member.date_of_birth && (
                    <div className="text-sm text-gray-500">
                      Date of Birth: {member.date_of_birth}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No members added</p>
        )}
      </div>

      {/* Remarks */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <Label htmlFor="remarks">Additional Remarks (Optional)</Label>
        <Textarea
          id="remarks"
          value={data.remarks || ""}
          onChange={(e) => updateData({ remarks: e.target.value })}
          placeholder="Add any additional information or notes..."
          className="mt-2"
          rows={4}
        />
      </div>

      {/* Terms and Conditions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-start gap-3">
          <Checkbox
            id="terms"
            checked={data.i_agree_to_terms || false}
            onCheckedChange={(checked) =>
              updateData({ i_agree_to_terms: checked === true })
            }
            className="mt-1"
          />
          <Label
            htmlFor="terms"
            className="cursor-pointer text-sm leading-relaxed"
          >
            I hereby confirm that all the information provided is accurate and
            complete to the best of my knowledge. I understand that providing
            false information may result in rejection of my application and
            legal consequences. I agree to the terms and conditions of the Move
            In/Move Out process. <span className="text-red-500">*</span>
          </Label>
        </div>
      </div>
    </div>
  );
}

// Helper component for displaying detail rows
function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) {
  return (
    <div className="flex items-start gap-2">
      <ChevronRight className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
      <div className="flex-1">
        <span className="font-medium text-gray-700">{label}:</span>{" "}
        <span className="text-gray-900">{value || "—"}</span>
      </div>
    </div>
  );
}
