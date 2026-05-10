"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@/app/context/SessionContext";
import { toast } from "sonner";
import CIDIssuanceService from "@/lib/services/issuance-service/cid-issuance/cid-issuance";
import {
  X,
  Check,
  CreditCard,
  User,
  ShieldCheck,
  FileText,
  Camera,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CID_ISSUANCE_DUMMY_DATA,
  simulateApiDelay,
  simulateSuccessResponse,
} from "@/lib/dummy-data";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";
import { Button } from "@/app/components/ui/button";

import {
  CID_STEPS as STEPS,
  CIDIssuanceData,
  cidIssuanceSchema,
} from "@/lib/validations/cid-issuance.schema";

import Step2ApplicantDetails from "./steps/Step2ApplicantDetails";
import Step3RecipientDetails from "./steps/Step3RecipientDetails";
import Step4Uploads from "./steps/Step4Uploads";
import Step5Review from "./steps/Step5Review";

// Icon mapping for steps
const STEP_ICONS = [
  User, // Applicant
  ShieldCheck, // Recipient
  Camera, // Biometrics
  CheckCircle, // Review
];

interface CIDIssuanceFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  isPage?: boolean;
}

export default function CIDIssuanceForm({
  isOpen = true,
  onClose,
  isPage = false,
}: CIDIssuanceFormProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { session } = useSessionContext();
  // Use logged-in user's CID
  const dummyApplicantCID = session?.user?.cidNo || "11234567890";
  const dummyApplicantName = session?.user?.fullName || "Demo User";

  const [isValidOperator, setIsValidOperator] = useState<boolean | null>(null);
  const [formData, setFormData] = useState<Partial<CIDIssuanceData>>({
    // Data will be populated with logged-in user data
    applicantCID: dummyApplicantCID,
    applicantName: dummyApplicantName,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const stepperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const currentStep = STEPS[currentStepIndex];

  // Update form data when session changes (user switches accounts)
  useEffect(() => {
    if (session?.user?.cidNo) {
      setFormData((prev) => ({
        ...prev,
        applicantCID: session.user.cidNo,
        applicantName: session.user.fullName,
      }));
    }
  }, [session?.user?.cidNo, session?.user?.fullName]);

  // Auto-scroll active step into view
  useEffect(() => {
    if (stepperRef.current) {
      const activeStep = stepperRef.current.querySelector(
        '[data-active="true"]',
      );
      if (activeStep) {
        activeStep.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [currentStepIndex]);

  const updateFormData = (data: Partial<CIDIssuanceData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    // Clear errors for fields being updated
    const newErrors = { ...errors };
    Object.keys(data).forEach((key) => delete newErrors[key]);
    setErrors(newErrors);
  };

  const validateStep = (stepNumber: number): boolean => {
    const stepErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      // Step 1: Applicant Details (applicantType, phone, recipientCID for non-self)
      if (!formData.applicantType) {
        stepErrors.applicantType = "Applicant type is required";
        toast.error("Please select who is applying");
      }
      if (!formData.applicantPhoneNumber) {
        stepErrors.applicantPhoneNumber = "Contact number is required";
      }
      if (!formData.point_of_application_dzongkhag) {
        stepErrors.point_of_application_dzongkhag =
          "Please select Dzongkhag/Dungkhag/Thromde.";
      }
      if (!formData.point_of_application_gewog) {
        stepErrors.point_of_application_gewog = "Please select Gewog.";
      }

      // Validate CID for non-self applicants
      if (formData.applicantType !== "self") {
        if (!formData.recipientCID) {
          stepErrors.recipientCID = "CID number is required";
        } else if (formData.recipientCID.length !== 11) {
          stepErrors.recipientCID = "CID must be 11 digits";
        }
      }

      // Check operator validation
      if (formData.applicantType === "operator") {
        if (isValidOperator === false) {
          toast.error(
            "Operator validation failed. Please verify your operator status.",
          );
          return false;
        }
        if (isValidOperator === null) {
          toast.error("Please wait for operator validation to complete.");
          return false;
        }
      }
    }

    if (stepNumber === 2) {
      // Step 2: Recipient Details (payment type selection)
      if (!formData.payment_type_id) {
        stepErrors.payment_type_id = "Application type is required";
        toast.error("Please select a type of application");
      }

      // Check for replacement reason if replacement type is selected
      if (
        formData.application_type?.toLowerCase().includes("replacement") &&
        !formData.replacementReason
      ) {
        stepErrors.replacementReason = "Replacement reason is required";
        toast.error("Please select a reason for replacement");
      }

      // Validate that citizen data was fetched
      if (
        !formData.first_name ||
        !formData.last_name ||
        !formData.date_of_birth
      ) {
        toast.error(
          "Citizen details could not be loaded. Please go back and try again.",
        );
        return false;
      }
    }

    if (stepNumber === 3) {
      // Step 3: Uploads and Collection Point
      if (!formData.collectionPoint) {
        stepErrors.collectionPoint = "Collection point is required";
        toast.error("Please select a collection point");
      }
      if (!formData.photoUrl && !formData.photo_url) {
        stepErrors.photoUrl = "Passport photo is required";
        toast.error("Please upload your passport photo");
      }
      if (!formData.reasonName) {
        stepErrors.reasonName = "Application reason is required";
        toast.error("Please select a reason for your application");
      }

      // Validate IDs are set
      if (!formData.reasons_id || !formData.place_of_collection) {
        toast.error("Please ensure all selections are properly saved");
        return false;
      }
    }

    if (stepNumber === 4) {
      // Step 4: Review & Submit - Validate all required fields
      const missingFields: string[] = [];

      if (!formData.reviewAgreed) {
        toast.error("You must agree to the terms to submit your application.");
        return false;
      }

      // Validate all required API fields
      if (!formData.payment_type_id) missingFields.push("Application Type");
      if (!formData.reasons_id) missingFields.push("Application Reason");
      if (!formData.place_of_collection) missingFields.push("Collection Point");
      if (!formData.photoUrl && !formData.photo_url)
        missingFields.push("Passport Photo");
      if (!formData.first_name) missingFields.push("First Name");
      if (!formData.last_name) missingFields.push("Last Name");
      if (!formData.date_of_birth) missingFields.push("Date of Birth");
      if (!formData.cid_no) missingFields.push("Recipient CID");

      if (missingFields.length > 0) {
        toast.error(`Missing required fields: ${missingFields.join(", ")}`);
        return false;
      }

      return true;
    }

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return false;
    }

    return true;
  };

  const handleNext = async () => {
    if (validateStep(currentStep.number)) {
      // Handle Step 1 data transformation
      if (currentStep.number === 1) {
        const updates: Partial<CIDIssuanceData> = {};

        // Handle CID assignment based on applicant type
        if (formData.applicantType === "self") {
          updates.cid_no = dummyApplicantCID;
        } else if (formData.applicantType === "parent") {
          updates.parent_cid_no = dummyApplicantCID;
          updates.cid_no = formData.recipientCID; // Child/dependent CID
        } else {
          // operator
          updates.cid_no = formData.recipientCID;
        }

        // Handle phone number assignment
        if (formData.applicantType === "parent") {
          updates.parent_contact_no = formData.applicantPhoneNumber;
        } else {
          updates.applicant_contact_no = formData.applicantPhoneNumber;
        }

        updateFormData(updates);
      }

      // Handle Step 2 data transformation (Step3RecipientDetails already populates these via updateData)
      if (currentStep.number === 2) {
        // Data is already in formData from Step3RecipientDetails component
        // Just log it
        console.log("Step 2 completed with data:", {
          first_name: formData.first_name,
          middle_name: formData.middle_name,
          last_name: formData.last_name,
          date_of_birth: formData.date_of_birth,
        });
      }

      // Handle Step 3 (Step4Uploads) data transformation - Log final submission data
      if (currentStep.number === 3) {
        console.log("Step 3 (Uploads) completed with data:", {
          reasons_id: formData.reasons_id,
          reasonName: formData.reasonName,
          photo_url: formData.photo_url || formData.photoUrl,
          place_of_collection:
            formData.place_of_collection || formData.collectionPoint,
        });
      }

      // Log current step data
      console.log("=== Step Data ===");
      console.log(`Step ${currentStep.number}: ${currentStep.label}`);
      console.log("Form Data:", {
        ...formData,
        ...(currentStep.number === 1
          ? {
              cid_no:
                formData.applicantType === "self"
                  ? dummyApplicantCID
                  : formData.recipientCID,
              parent_cid_no:
                formData.applicantType === "parent"
                  ? dummyApplicantCID
                  : undefined,
              parent_contact_no:
                formData.applicantType === "parent"
                  ? formData.applicantPhoneNumber
                  : undefined,
              applicant_contact_no:
                formData.applicantType !== "parent"
                  ? formData.applicantPhoneNumber
                  : undefined,
            }
          : {}),
      });
      console.log("================");

      if (currentStepIndex === STEPS.length - 1) {
        // Final Submission Logic
        try {
          // Prepare API payload according to requirements
          const apiPayload = {
            // Applicant information
            applicant_cid_no: dummyApplicantCID,
            applicant_contact_no:
              formData.applicantType === "parent"
                ? formData.parent_contact_no || ""
                : formData.applicant_contact_no ||
                  formData.applicantPhoneNumber ||
                  "",

            // Application details
            application_type: formData.application_type || "",
            payment_type_id: formData.payment_type_id || "",

            // Recipient/CID holder information
            cid_no: formData.cid_no || "",
            first_name: formData.first_name || "",
            middle_name: formData.middle_name || "",
            last_name: formData.last_name || "",
            date_of_birth: formData.date_of_birth || "",

            // Parent information (if applicable)
            ...(formData.applicantType === "parent" && {
              parent_cid_no: formData.parent_cid_no || dummyApplicantCID,
              parent_contact_no:
                formData.parent_contact_no ||
                formData.applicantPhoneNumber ||
                "",
            }),

            // Collection and reason
            reasons_id: formData.reasons_id || "",
            place_of_collection: formData.place_of_collection || "",

            // Photo will be handled separately as file upload
            // photo: formData.photoUrl || formData.photo_url
          };

          console.log("=== Final API Payload ===");
          console.log(JSON.stringify(apiPayload, null, 2));
          console.log("========================");

          // Simulate API call with dummy data
          await simulateApiDelay(1500);

          const applicationNo = `CID-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

          // Create application object to store
          const applicationData = {
            ...formData,
            id: `cid-${Date.now()}`,
            application_no: applicationNo,
            applicant_cid_no: dummyApplicantCID,
            status: "SUBMITTED",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          // Add to in-memory store
          CIDIssuanceService.AddSubmittedApplication(applicationData);

          const response = simulateSuccessResponse({
            application_id: applicationNo,
            status: "PENDING",
            message: "CID issuance application submitted successfully",
          });

          console.log("Dummy API Response:", response);

          toast.success("CID Application Submitted Successfully!");
          setShowSuccessModal(true);
        } catch (error) {
          console.error("Submission Error:", error);
          toast.error("Failed to submit application. Please try again.");
        }
        return;
      }
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const headerContent = (
    <div className="bg-white border-b border-gray-100 flex flex-col pt-4 sm:pt-6 pb-0 z-10 sticky top-0">
      <div className="px-4 sm:px-6 lg:px-8 pb-3 sm:pb-4 flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
          {isPage && (
            <button
              onClick={() => window.history.back()}
              className="p-1.5 sm:p-2 -ml-1 sm:-ml-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors shrink-0"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}
          <div className="min-w-0">
            <h2 className="text-base sm:text-xl font-bold text-gray-900 leading-tight truncate">
              CID Issuance Service
            </h2>
            <p className="text-xs text-gray-500 font-medium hidden sm:block">
              Apply for New, Renewal, or Replacement CID
            </p>
          </div>
        </div>
        {!isPage && onClose && (
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Dummy Data Display */}
      <div className="px-4 sm:px-6 lg:px-8 pb-2">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-blue-900">
              Sample Data for{" "}
              {(CID_ISSUANCE_DUMMY_DATA as any)[`step${currentStepIndex + 1}`]
                ?.stepTitle || `Step ${currentStepIndex + 1}`}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {Object.entries(
              (CID_ISSUANCE_DUMMY_DATA as any)[`step${currentStepIndex + 1}`]
                ?.sampleData || {},
            ).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-blue-700 font-medium">{key}:</span>
                <span className="text-blue-900 font-mono">{String(value)}</span>
              </div>
            ))}
          </div>
          {(CID_ISSUANCE_DUMMY_DATA as any)[`step${currentStepIndex + 1}`]
            ?.note && (
            <div className="mt-2 text-xs text-blue-700 italic">
              {
                (CID_ISSUANCE_DUMMY_DATA as any)[`step${currentStepIndex + 1}`]
                  .note
              }
            </div>
          )}
        </div>
      </div>

      <div
        className="px-4 sm:px-6 lg:px-8 pb-3 sm:pb-4 overflow-x-auto scrollbar-hide"
        ref={stepperRef}
      >
        <div className="flex items-center min-w-max">
          {STEPS.map((step, idx) => {
            const Icon = STEP_ICONS[idx] || CheckCircle;
            const isActive = idx === currentStepIndex;
            const isCompleted = idx < currentStepIndex;

            return (
              <div key={step.id} className="flex items-center">
                {idx > 0 && (
                  <div
                    className={cn(
                      "h-0.5 w-4 sm:w-8 transition-colors",
                      isCompleted || isActive ? "bg-primary" : "bg-gray-100",
                    )}
                  />
                )}
                <div
                  data-active={isActive}
                  className={cn(
                    "flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all border whitespace-nowrap",
                    isActive
                      ? "bg-gray-900 text-white border-gray-900 scale-105 z-10"
                      : isCompleted
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 text-gray-400 border-gray-100",
                  )}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span>{step.label}</span>
                  {isCompleted && <Check className="w-3 h-3 text-white ml-1" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const successModal = (
    <AlertDialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
      <AlertDialogContent className="max-w-md rounded-3xl">
        <AlertDialogHeader className="items-center text-center">
          <div className="size-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="size-12 text-green-600" />
          </div>
          <AlertDialogTitle className="text-2xl font-bold text-gray-900">
            Application Submitted!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 pt-2">
            Your CID application has been received. Our team will verify your
            biometrics against DCRC records.
            <br />
            <br />
            Reference ID:{" "}
            <span className="font-bold text-gray-900">#CID-2026-9842</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => router.push("/services/cid-issuance")}
            className="w-full h-12 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20"
          >
            View My Applications
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <div
      className={cn(
        isPage
          ? "min-h-screen bg-gray-50 py-4 sm:py-8"
          : "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4",
      )}
    >
      <div
        className={cn(
          "bg-white shadow-sm border border-gray-100 overflow-hidden flex flex-col",
          isPage
            ? "max-w-5xl mx-auto rounded-3xl min-h-[600px] w-full"
            : "rounded-3xl w-full max-w-5xl max-h-[90vh]",
        )}
      >
        {headerContent}

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-4xl mx-auto">
            {currentStep.number === 1 && (
              <Step2ApplicantDetails
                data={formData}
                updateData={updateFormData}
                errors={errors}
                onOperatorValidationChange={setIsValidOperator}
              />
            )}
            {currentStep.number === 2 && (
              <Step3RecipientDetails
                data={formData}
                updateData={updateFormData}
                errors={errors}
              />
            )}
            {currentStep.number === 3 && (
              <Step4Uploads
                data={formData}
                updateData={updateFormData}
                errors={errors}
              />
            )}
            {currentStep.number === 4 && (
              <Step5Review data={formData} updateData={updateFormData} />
            )}
          </div>
        </div>

        <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-3 sm:justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStepIndex === 0}
            className="h-12 px-8 rounded-xl font-bold border-2 order-2 sm:order-1"
          >
            Back
          </Button>
          {/* Hide Next button if operator is invalid */}
          {!(
            currentStepIndex === 0 &&
            formData.applicantType === "operator" &&
            isValidOperator === false
          ) && (
            <Button
              onClick={handleNext}
              disabled={
                currentStepIndex === 0 &&
                formData.applicantType === "operator" &&
                isValidOperator === false
              }
              className="h-12 px-10 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:opacity-90 order-1 sm:order-2 flex items-center gap-2"
            >
              {currentStepIndex === STEPS.length - 1
                ? "Submit Application"
                : "Continue"}
              {currentStepIndex < STEPS.length - 1 && (
                <ArrowRight className="w-4 h-4" />
              )}
            </Button>
          )}
        </div>
      </div>
      {successModal}
    </div>
  );
}
