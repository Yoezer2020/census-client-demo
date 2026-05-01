export interface HouseholdMember {
  member_cid: string;
  member_name: string;
  gender: string;
  date_of_birth: string;
  relation_to_hoh: string;
}

export interface MoveInMoveOutData {
  // Step 1 – Application Details (Current Household Details)
  applicant_is: string; // 'OPERATOR' or 'HOUSEHOLD_MEMBER'
  isOperatorVerified?: boolean; // Verification status for operators
  applicantCidNo: string;
  applicantName: string;
  applicantContactNo: string;
  currentHouseholdNo: string;
  currentHohCidNo: string;
  currentHouseNo: string;
  currentTharmNo: string;
  currentDzongkhagId: string;
  currentGewogId: string;
  currentChiwogId: string;
  currentVillageId: string;

  // Step 2 – Move In Land Details
  moveInHouseNo: string;
  moveInTharmNo: string;
  moveInDzongkhagId: string;
  moveInGewogId: string;
  moveInChiwogId: string;
  moveInVillageId: string;
  moveInHouseholdNo?: string; // If joining existing household
  moveType: "new_household" | "join_household"; // Whether creating new or joining existing
  areaType?: string; // 'RURAL' or 'URBAN' (optional for now)
  plotOwnerCid?: string; // Plot owner CID (optional)
  plotId?: string; // Plot ID (optional)

  // Step 3 – Members of Household
  movingMembers: HouseholdMember[]; // Members moving with applicant
  movingMemberCids?: string[]; // Array of CID numbers for API submission
  willBecomeHoh: boolean; // Whether applicant will be HoH in new location

  // Step 4 – Review & Submit
  i_agree_to_terms: boolean;
  remarks?: string;
  supporting_document?: {
    name: string;
    size: number;
    type: string;
  };
}

export const MOVE_IN_MOVE_OUT_STEPS = [
  {
    id: "ApplicationDetails",
    number: 1,
    label: "Application Details",
  },
  {
    id: "MoveInLandDetails",
    number: 2,
    label: "Move In Land Details",
  },
  {
    id: "MembersOfHousehold",
    number: 3,
    label: "Members of Household",
  },
  {
    id: "Review",
    number: 4,
    label: "Review & Submit",
  },
];
