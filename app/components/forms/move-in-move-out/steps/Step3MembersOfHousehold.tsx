"use client";

import { useState, useEffect } from "react";
import {
  MoveInMoveOutData,
  HouseholdMember,
} from "@/lib/validations/move-in-move-out.schema";
import { Label } from "@/app/components/ui/label";
import { Users, Loader2 } from "lucide-react";
import { Checkbox } from "@/app/components/ui/checkbox";
import { toast } from "sonner";

interface Step3Props {
  data: Partial<MoveInMoveOutData>;
  updateData: (data: Partial<MoveInMoveOutData>) => void;
  errors: Record<string, string>;
}

export default function Step3MembersOfHousehold({
  data,
  updateData,
  errors,
}: Step3Props) {
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);

  // Mock household members data
  const mockHouseholdMembers = [
    {
      id: "1",
      cid_no: "11111111111",
      first_name: "Tashi",
      middle_name: "",
      last_name: "Dorji",
      gender: "Male",
      date_of_birth: "1990-05-15",
      relation: "Head of Household",
      name_in_dzongkha: "བཀྲ་ཤིས་ རྡོ་རྗེ།",
    },
    {
      id: "2",
      cid_no: "22222222222",
      first_name: "Pema",
      middle_name: "",
      last_name: "Wangmo",
      gender: "Female",
      date_of_birth: "1992-08-20",
      relation: "Spouse",
      name_in_dzongkha: "པདྨ་ དབང་མོ།",
    },
    {
      id: "3",
      cid_no: "33333333333",
      first_name: "Sonam",
      middle_name: "",
      last_name: "Dorji",
      gender: "Male",
      date_of_birth: "2015-03-10",
      relation: "Son",
      name_in_dzongkha: "བསོད་ནམས་ རྡོ་རྗེ།",
    },
    {
      id: "4",
      cid_no: "44444444444",
      first_name: "Deki",
      middle_name: "",
      last_name: "Dorji",
      gender: "Female",
      date_of_birth: "2018-11-25",
      relation: "Daughter",
      name_in_dzongkha: "བདེ་སྐྱིད་ རྡོ་རྗེ།",
    },
  ];

  const members = data.movingMembers || [];

  // Simulate loading members on mount
  useEffect(() => {
    if (!data.currentHouseholdNo) return;

    setIsLoadingMembers(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoadingMembers(false);
      toast.success(`Found ${mockHouseholdMembers.length} household member(s)`);
    }, 800);
  }, [data.currentHouseholdNo]);

  // Handle checkbox selection
  const handleMemberToggle = (member: any, checked: boolean) => {
    if (checked) {
      setSelectedMemberIds([...selectedMemberIds, member.cid_no]);

      // Add member to movingMembers
      const fullName = [member.first_name, member.middle_name, member.last_name]
        .filter(Boolean)
        .join(" ");

      const newMemberData: HouseholdMember = {
        member_cid: member.cid_no,
        member_name: fullName,
        gender: member.gender || "",
        date_of_birth: member.date_of_birth || "",
        relation_to_hoh: member.relation || "",
      };

      updateData({
        movingMembers: [...members, newMemberData],
      });
    } else {
      setSelectedMemberIds(
        selectedMemberIds.filter((id) => id !== member.cid_no),
      );

      // Remove member from movingMembers
      const updated = members.filter((m) => m.member_cid !== member.cid_no);

      updateData({
        movingMembers: updated,
      });
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Household Members Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            Select Household Members to Move{" "}
            <span className="text-gray-400 text-sm font-normal">
              (Optional)
            </span>
          </h3>
          <Users className="w-5 h-5 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Optionally select household members who will be relocating with you to
          the new location. If no members are selected, you will be moving
          alone. Note: You will require adults for approval for this application
          to be submitted. Minors will automatically move.
        </p>

        {isLoadingMembers ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="ml-2 text-sm text-gray-600">
              Loading household members...
            </span>
          </div>
        ) : mockHouseholdMembers.length > 0 ? (
          <div className="space-y-3">
            {mockHouseholdMembers.map((member) => {
              const fullName = [
                member.first_name,
                member.middle_name,
                member.last_name,
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <div
                  key={member.id}
                  className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50"
                >
                  <Checkbox
                    id={member.id}
                    checked={selectedMemberIds.includes(member.cid_no)}
                    onCheckedChange={(checked) =>
                      handleMemberToggle(member, checked as boolean)
                    }
                    className="mt-1"
                  />
                  <Label htmlFor={member.id} className="flex-1 cursor-pointer">
                    <div className="font-semibold text-gray-900">
                      {fullName}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      CID: {member.cid_no} • {member.gender}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Relation: {member.relation}
                    </div>
                    {member.name_in_dzongkha && (
                      <div className="text-sm text-gray-500 mt-1">
                        འབྲུག་ཡིག: {member.name_in_dzongkha}
                      </div>
                    )}
                  </Label>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">No household members found</p>
          </div>
        )}

        {selectedMemberIds.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700 font-medium">
              {selectedMemberIds.length} member(s) selected to move
            </p>
          </div>
        )}

        {errors.movingMembers && (
          <p className="text-sm text-red-500 mt-2">{errors.movingMembers}</p>
        )}
      </div>
    </div>
  );
}
