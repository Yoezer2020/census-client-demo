import { z } from "zod";

// --- Schema Definitions ---

export const deathRegistrationSchema = z.object({
  // Step 1: Disclaimer
  disclaimerAgreed: z.literal(true).refine((val) => val === true, {
    message: "You must agree to the terms to proceed.",
  }),

  // Step 2: Applicant Details
  applicantCID: z.string().min(11).max(11).optional(), // Auto-filled from NDI
  applicant_cid: z.string().optional(),
  applicant_contact_no: z.string().optional(),
  applicant_is: z.enum(["FAMILY", "OPERATOR"]).optional(), // Added applicant type
  isOperatorVerified: z.boolean().optional(), // Operator verification status
  episId: z.string().optional(), // ePIS/MCH Number if registered
  relationshipToDeceased: z.string().optional(), // Made optional

  // Step 3: Deceased Personal Details
  deceased_cid: z.string().optional(),
  deceasedCID: z.string().optional(), // May not have CID if never registered
  first_name: z.string().optional(),
  middle_name: z.string().optional(),
  last_name: z.string().optional(),
  date_of_birth: z.string().optional(),
  firstName: z.string().min(1, "First Name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last Name is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  gender: z.enum(["male", "female", "other"]),

  // Step 4: Deceased Address Details
  dzongkhag_id: z.string().optional(),
  gewog_id: z.string().optional(),
  chiwog_id: z.string().optional(),
  village_id: z.string().optional(),
  house_hold_no: z.string().optional(),
  house_no: z.string().optional(),
  dzongkhagId: z.string().min(1, "Dzongkhag is required"),
  gewogId: z.string().min(1, "Gewog is required"),
  villageId: z.string().min(1, "Village is required"),
  houseHoldNo: z.string().min(1, "Household Number is required"),
  houseNo: z.string().min(1, "House Number is required"),

  // Step 5: Death Details
  isHealthRegistered: z.boolean().optional(),
  is_health_registered: z.boolean().optional(),
  date_of_death: z.string().optional(),
  time_of_death: z.string().optional(),
  cause_of_death: z.string().optional(),
  place_of_death: z.string().optional(),
  dateOfDeath: z.string().min(1, "Date of Death is required"),
  timeOfDeath: z.string().min(1, "Time of Death is required"),
  causeOfDeath: z.string().min(1, "Cause of Death is required"),
  placeOfDeath: z.string().min(1, "Place of Death is required"),

  // Step 6: Death Location Details
  country_of_death_id: z.string().optional(),
  dzongkhag_of_death_id: z.string().optional(),
  gewog_of_death_id: z.string().optional(),
  village_of_death_id: z.string().optional(),
  chiwog_of_death_id: z.string().optional(),
  city_id: z.string().optional(),
  countryOfDeathId: z.string().optional(),
  dzongkhagOfDeathId: z.string().optional(),
  gewogOfDeathId: z.string().optional(),
  villageOfDeathId: z.string().optional(),
  cityId: z.string().optional(),

  // Step 7: Attachments
  certificate: z.array(z.any()).optional(),
  deathCertificateUrl: z.string().optional(),
  attachments: z.array(z.any()).optional(),
});

export type DeathRegistrationData = z.infer<typeof deathRegistrationSchema>;

export type DeathFormStep =
  | "Disclaimer"
  | "ApplicantDetails"
  | "DeceasedPersonalDetails"
  | "DeceasedAddressDetails"
  | "DeathDetails"
  | "Attachments"
  | "Review";

export const DEATH_STEPS: {
  id: DeathFormStep;
  label: string;
  number: number;
}[] = [
  { id: "ApplicantDetails", label: "Applicant Details", number: 1 },
  {
    id: "DeceasedPersonalDetails",
    label: "Deceased Personal Details",
    number: 2,
  },
  { id: "DeceasedAddressDetails", label: "Deceased Address", number: 3 },
  { id: "DeathDetails", label: "Death Details", number: 4 },
  { id: "Attachments", label: "Attachments", number: 5 },
  { id: "Review", label: "Review & Submit", number: 6 },
];
