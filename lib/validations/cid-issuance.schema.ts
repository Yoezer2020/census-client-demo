import { z } from "zod";

// --- Schema Definitions ---

export const cidIssuanceSchema = z.object({
  // Step 1: Disclaimer
  disclaimerAgreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms to proceed.",
  }),

  // Step 2: Applicant Details
  applicantCID: z
    .string()
    .min(11, "CID must be 11 digits")
    .max(11, "CID must be 11 digits"),
  applicantName: z.string().min(1, "Name is required"),
  applicationType: z.enum(["New", "Renewal", "Replacement"]),
  applicantType: z.enum(["parent", "self", "operator"]).optional(),
  applicantPhoneNumber: z.string().optional(),
  isApplyingForSelf: z.boolean().default(true),
  collectionPoint: z
    .enum(["Dzongkhag", "Thromde", "Dungkhag", "HQ"])
    .optional(),

  // Additional fields for new flow
  cid_no: z.string().optional(),
  parent_cid_no: z.string().optional(),
  parent_contact_no: z.string().optional(),
  applicant_contact_no: z.string().optional(),
  first_name: z.string().optional(),
  middle_name: z.string().optional(),
  last_name: z.string().optional(),
  date_of_birth: z.string().optional(),

  // Step 3: Recipient Details (Conditional based on Application Type and isApplyingForSelf)
  recipientCID: z.string().optional().or(z.literal("")),
  recipientName: z.string().optional(),
  recipientDOB: z.string().optional(),
  replacementReason: z.enum(["Lost", "Damaged", "Stolen", "Other"]).optional(),
  application_type: z.string().optional(), // Payment service type string
  payment_type_id: z.string().optional(), // Payment service type UUID

  // Step 4: Biometric Uploads
  photoUrl: z.string().min(1, "Passport photo is required"),
  photo_url: z.string().optional(), // Final URL for submission
  reasons_id: z.string().optional(), // UUID for reason
  reasonName: z.string().optional(), // Display name for reason
  place_of_collection: z.string().optional(), // UUID for collection point

  // Step 5: Review & Submit
  reviewAgreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms to submit your application.",
  }),

  // Additional Display Info (Mocked/Pre-filled)
  placeOfBirth: z.string().optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
});

export type CIDIssuanceData = z.infer<typeof cidIssuanceSchema>;

export type CIDFormStep =
  | "ApplicantDetails"
  | "RecipientDetails"
  | "BiometricUploads"
  | "Review";

export const CID_STEPS: { id: CIDFormStep; label: string; number: number }[] = [
  { id: "ApplicantDetails", label: "Applicant Details", number: 1 },
  { id: "RecipientDetails", label: "Recipient Details", number: 2 },
  { id: "BiometricUploads", label: "Biometric Uploads", number: 3 },
  { id: "Review", label: "Review & Submit", number: 4 },
];
