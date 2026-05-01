import { z } from "zod";

// --- Schema Definitions ---

export const birthRegistrationSchema = z.object({
  // Step 1: Disclaimer
  disclaimerAgreed: z.literal(true, {
    message: "You must agree to the terms to proceed.",
  }),

  // Step 2: Applicant Details
  applicantCID: z.string().min(11).max(11).optional(), // Auto-filled from NDI
  applicant_cid: z.string().optional(), // API field
  applicant_contact_no: z.string().optional(),
  applicant_is: z
    .enum(["FATHER", "MOTHER", "HOH", "GUARDIAN", "OPERATOR"])
    .optional(),
  isOperatorVerified: z.boolean().optional(), // Operator verification status
  father_approval: z.enum(["APPROVED", "PENDING"]).optional(),
  mother_approval: z.enum(["APPROVED", "PENDING"]).optional(),
  isParent: z.enum(["yes", "no"]).optional(), // kept for internal compat
  parentType: z.enum(["father", "mother"]).optional(), // kept for internal compat
  requiresSpouseApproval: z.boolean().optional(),

  is_born_in_bhutan: z.boolean().optional(), // API field
  is_epis_registered: z.boolean().optional(), // API field
  hasMarriageCertificate: z.enum(["yes", "no"]).optional(), // kept for internal compat
  is_mc_valid: z.boolean().optional(), // API field
  mc_no: z.string().optional(),

  // Step 3: Birth Details (Conditionals)
  birth_country_id: z.string().optional(),
  countryOfBirth: z.string().optional(), // Required if bornInBhutan = no

  birth_city_id: z.string().optional(),
  cityOfBirth: z.string().optional(), // Required if bornInBhutan = no

  episId: z.string().optional(), // Required if registeredInEpis = yes (Auto-fetched mostly)

  birth_dzongkhag_id: z.string().optional(),
  placeOfBirthVillage: z.string().optional(), // Required if registeredInEpis = yes
  birth_village_id: z.string().optional(),
  placeOfBirthGewog: z.string().optional(), // Required if registeredInEpis = yes
  birth_gewog_id: z.string().optional(),
  placeOfBirthDzongkhag: z.string().optional(), // Required if registeredInEpis = yes
  placeOfBirthChiwog: z.string().optional(),
  birth_chiwog_id: z.string().optional(),

  isParentsAsPerMarriageCert: z.enum(["yes", "no"]).optional(), // Required if hasMarriageCertificate = yes
  spouseName: z.string().optional(),
  spouseCID: z.string().optional(),

  // Step 4: Newborn Personal Details
  first_name: z.string().optional(),
  middle_name: z.string().optional(),
  last_name: z.string().optional(),
  childFirstName: z.string().min(1, "First Name is required"),
  childMiddleName: z.string().optional(),
  childLastName: z.string().min(1, "Last Name is required"),

  // Step 5: Newborn Birth Information
  date_of_birth: z.string().optional(),
  time_of_birth: z.string().optional(),
  weight: z.string().optional(),
  gender_id: z.string().optional(),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  birthWeight: z.string().min(1, "Weight is required"), // Using string for input, validated as number maybe
  timeOfBirth: z.string().min(1, "Time of Birth is required"),

  // Step 6: Parents Details
  father_cid: z.string().optional(),
  fathers_contact_no: z.string().optional(),
  is_father_alive: z.boolean().optional(),

  mother_cid: z.string().optional(),
  mothers_contact_no: z.string().optional(),
  is_mother_alive: z.boolean().optional(),

  fatherCID: z.string().min(11).max(11).optional(),
  isFatherDeceased: z.boolean().optional(),
  fatherFirstName: z.string().optional(),
  fatherMiddleName: z.string().optional(),
  fatherLastName: z.string().optional(),
  fatherVillage: z.string().optional(),
  fatherGewog: z.string().optional(),
  fatherDzongkhag: z.string().optional(),
  fatherHouseholdNo: z.string().optional(),

  motherCID: z.string().min(11).max(11).optional(),
  isMotherDeceased: z.boolean().optional(),
  motherFirstName: z.string().optional(),
  motherMiddleName: z.string().optional(),
  motherLastName: z.string().optional(),
  motherVillage: z.string().optional(),
  motherGewog: z.string().optional(),
  motherDzongkhag: z.string().optional(),
  motherHouseholdNo: z.string().optional(),

  // Step 7: Guarantor (If both parents deceased - flagged manually or by logic)
  guarantorCID: z.string().optional(),
  guarantorRelationship: z.string().optional(),
  guarantor_cid: z.string().optional(),
  guarantor_contact_no: z.string().optional(),
  relationship: z.string().optional(),
  guarantor_approval: z.boolean().optional(),

  // Step 8: Household
  registerWithHousehold: z.enum(["Father", "Mother", "Others"]).optional(),
  child_hh_no: z.string().optional(),
  otherHouseholdNo: z.string().optional(),
  headOfHousehold: z.string().optional(),
  dzongkhagId: z.string().optional(),
  gewogId: z.string().optional(),
  chiwogId: z.string().optional(),
  villageId: z.string().optional(),

  // Step 9: Attachments
  certificate: z.array(z.any()).optional(),
  attachments: z.array(z.any()).optional(),
});

export type BirthRegistrationData = z.infer<typeof birthRegistrationSchema>;

export type BirthFormStep =
  | "Disclaimer"
  | "ApplicantDetails"
  | "ChildDetails"
  | "ParentsDetails"
  | "GuarantorDetails"
  | "Household"
  | "Attachments"
  | "Review";

export const BIRTH_STEPS: {
  id: BirthFormStep;
  label: string;
  number: number;
}[] = [
  { id: "ApplicantDetails", label: "Applicant Details", number: 1 },
  { id: "ChildDetails", label: "Child Details", number: 2 },
  { id: "ParentsDetails", label: "Parents Details", number: 3 },
  { id: "GuarantorDetails", label: "Guarantor", number: 4 }, // Conditional visibility
  { id: "Household", label: "Household", number: 5 },
  { id: "Attachments", label: "Attachments", number: 6 },
  { id: "Review", label: "Review & Submit", number: 7 },
];
