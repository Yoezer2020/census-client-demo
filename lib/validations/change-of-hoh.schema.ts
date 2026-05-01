export interface HouseholdMember {
  member_cid: string;
  member_name: string;
  gender: string;
  date_of_birth: string;
  relation_to_hoh: string;
}

export interface ChangeOfHoHData {
  // Step 1 – Applicant Details
  applicantCidNo: string;
  applicantContactNo: string;
  applicantIs: string;
  isOperatorVerified?: boolean; // Operator verification status
  householdNo: string;
  hohCidNo: string;
  houseNo: string;
  tharmNo: string;
  dzongkhagId: string;
  gewogId: string;
  chiwogId: string;
  villageId: string;
  nationality: string;

  // Step 2 – New HoH
  newHohCidNo: string;
  firstName: string;
  middleName: string;
  lastName: string;
  hohChangeReasonId: string;
  newHohHouseholdMismatch?: boolean;

  // Review & agree
  i_agree_to_terms: boolean;
}

export const HOH_STEPS = [
  { id: "ApplicantDetails", number: 1, label: "Applicant Details" },
  { id: "NewHoH", number: 2, label: "New Head" },
  { id: "Review", number: 3, label: "Review & Submit" },
];

// ─── Household Information Form (Form 2) ─────────────────────────────────────

export interface HouseholdInfoData {
  // Step 1 – Applicant Details (all read-only from NDI)
  cid_of_applicant: string;
  applicant_name: string;
  village: string;
  gewog: string;
  dzongkhag: string;

  // Step 2 – Household Details + agree
  language_preference: "English" | "Dzongkha" | "";
  i_agree_to_terms: boolean;
}

export const HOUSEHOLD_INFO_STEPS = [
  { id: "ApplicantDetails", number: 1, label: "Applicant Details" },
  { id: "HouseholdDetails", number: 2, label: "Household Details" },
];
