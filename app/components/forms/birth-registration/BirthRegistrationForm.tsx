"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  X,
  Check,
  FileText,
  User,
  MapPin,
  Baby,
  Calendar,
  Users,
  ShieldCheck,
  Home,
  Paperclip,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BIRTH_REGISTRATION_DUMMY_DATA,
  simulateApiDelay,
  simulateSuccessResponse,
} from "@/lib/dummy-data";
import BirthApplicationService from "@/lib/services/birth-death-service/birth-applications/birth-applications";

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
  BIRTH_STEPS as STEPS,
  BirthRegistrationData,
} from "@/lib/validations/birth-registration.schema";
import Step2ApplicantDetails from "./steps/Step2ApplicantDetails";
import Step3ChildDetails from "./steps/Step3ChildDetails";
import Step6ParentsDetails from "./steps/Step6ParentsDetails";
import Step7GuarantorDetails from "./steps/Step7GuarantorDetails";
import Step8Household from "./steps/Step8Household";
import Step9Attachments from "./steps/Step9Attachments";
import Step10Review from "./steps/Step10Review";
import VerificationStep from "./steps/VerificationStep";

// Icon mapping for steps
const STEP_ICONS = [
  User, // Applicant
  Baby, // Birth Details
  Users, // Parents
  ShieldCheck, // Guarantor
  Home, // Household
  Paperclip, // Attachments
  CheckCircle, // Review
];

interface BirthRegistrationFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  isPage?: boolean;
  skipVerification?: boolean;
}

export default function BirthRegistrationForm({
  isOpen = true,
  onClose,
  isPage = false,
  skipVerification = false,
}: BirthRegistrationFormProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<Partial<BirthRegistrationData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Parent Verification Logic
  const [isVerifying, setIsVerifying] = useState(false);
  const [pendingApplications, setPendingApplications] = useState<any[]>([]);
  const [showVerification, setShowVerification] = useState(false);

  useEffect(() => {
    if (skipVerification) {
      setPendingApplications([]);
      setShowVerification(false);
      setIsVerifying(false);
      return;
    }

    // Mock check for pending applications for parent verification
    // In a real app, this would be an API call
    const mockPending = [
      {
        id: "BR-2026-X123",
        first_name: "Tashi",
        middle_name: "",
        last_name: "Dorji",
        date_of_birth: "2026-02-05",
        gender: "male",
        applicant_cid: "11105001234",
        status: "PENDING",
      },
      {
        id: "BR-2026-Y456",
        first_name: "Dechen",
        middle_name: "Yangzom",
        last_name: "Lhamo",
        date_of_birth: "2026-01-28",
        gender: "female",
        applicant_cid: "10204008765",
        status: "PENDING",
      },
    ];

    // Simulate fetching
    setPendingApplications(mockPending);
    if (mockPending.length > 0) {
      setShowVerification(true);
      setIsVerifying(true);
    }
  }, [skipVerification]);

  const handleVerifyApplication = (id: string, status: string) => {
    // Simulate API call to update status
    toast.success(
      `Application ${status === "VERIFIED" ? "confirmed" : "rejected"} successfully`,
    );
    setPendingApplications((prev) => prev.filter((app) => app.id !== id));
  };

  const handleProceedToRegistration = () => {
    setIsVerifying(false);
    setShowVerification(false);
  };
  const stepperRef = useRef<HTMLDivElement>(null);

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

  const router = useRouter();

  const currentStep = STEPS[currentStepIndex];

  const headerContent = (
    <div className="bg-white border-b border-gray-100 flex flex-col pt-4 sm:pt-6 pb-0 z-10 sticky top-0">
      {/* Top Bar with Title and Back/Close */}
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
              Birth Registration
            </h2>
          </div>
        </div>
        {!isPage && onClose && (
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-900 shrink-0"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>

      {/* Dummy Data Display */}
      {!showVerification && (
        <div className="px-4 sm:px-6 lg:px-8 pb-2">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-blue-900">
                Sample Data for{" "}
                {(BIRTH_REGISTRATION_DUMMY_DATA as any)[
                  `step${currentStepIndex + 1}`
                ]?.stepTitle || `Step ${currentStepIndex + 1}`}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {Object.entries(
                (BIRTH_REGISTRATION_DUMMY_DATA as any)[
                  `step${currentStepIndex + 1}`
                ]?.sampleData || {},
              ).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-blue-700 font-medium">{key}:</span>
                  <span className="text-blue-900 font-mono">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
            {(BIRTH_REGISTRATION_DUMMY_DATA as any)[
              `step${currentStepIndex + 1}`
            ]?.note && (
              <div className="mt-2 text-xs text-blue-700 italic">
                {
                  (BIRTH_REGISTRATION_DUMMY_DATA as any)[
                    `step${currentStepIndex + 1}`
                  ].note
                }
              </div>
            )}
          </div>
        </div>
      )}

      {/* Scrollable Stepper Container */}
      {!showVerification && (
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
                  {/* Connecting Line (Before) */}
                  {idx > 0 && (
                    <div
                      className={cn(
                        "h-0.5 w-4 sm:w-8 transition-colors duration-500",
                        isCompleted || isActive
                          ? "bg-green-600"
                          : "bg-gray-100",
                      )}
                    />
                  )}

                  <div
                    data-active={isActive}
                    className={cn(
                      "flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 border whitespace-nowrap",
                      isActive
                        ? "bg-gray-900 text-white border-gray-900 scale-105 transform z-10"
                        : isCompleted
                          ? "bg-green-600 text-white border-green-600 shadow-sm"
                          : "bg-gray-50 text-gray-400 border-gray-100",
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0",
                        isActive || isCompleted ? "stroke-[2.5px]" : "stroke-2",
                      )}
                    />
                    <span className="hidden sm:inline">{step.label}</span>
                    <span className="sm:hidden">
                      {step.label.split(" ")[0]}
                    </span>
                    {isCompleted && (
                      <div className="bg-white/20 rounded-full p-0.5 ml-0.5 sm:ml-1 shrink-0">
                        <Check
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                          strokeWidth={3}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  const updateFormData = (data: Partial<BirthRegistrationData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    // Clear errors for fields being updated
    const newErrors = { ...errors };
    Object.keys(data).forEach((key) => delete newErrors[key]);
    setErrors(newErrors);
  };

  const validateStep = (stepNumber: number): boolean => {
    try {
      // In a real implementation, we would parse against the specific part of the schema
      // specific to the current step. For now, simplistic check.
      if (stepNumber === 1) {
        const step1Errors: Record<string, string> = {};
        if (!formData.applicant_cid)
          step1Errors.applicant_cid = "Applicant CID is required.";
        if (!formData.applicant_contact_no)
          step1Errors.applicant_contact_no = "Please enter contact number.";
        if (!formData.applicant_is)
          step1Errors.applicant_is = "Please select an option.";

        // Check operator verification
        if (
          formData.applicant_is === "OPERATOR" &&
          formData.isOperatorVerified === false
        ) {
          step1Errors.applicant_is = "You are not authorized as an operator.";
        }

        if (typeof formData.is_born_in_bhutan !== "boolean")
          step1Errors.is_born_in_bhutan = "Please select an option.";
        if (typeof formData.is_epis_registered !== "boolean")
          step1Errors.is_epis_registered = "Please select an option.";
        if (typeof formData.is_mc_valid !== "boolean")
          step1Errors.is_mc_valid = "Please select an option.";

        if (Object.keys(step1Errors).length > 0) {
          setErrors(step1Errors);
          return false;
        }
      }
      if (stepNumber === 2) {
        const step3Errors: Record<string, string> = {};

        // Location Validations
        if (formData.is_born_in_bhutan === false) {
          if (!formData.birth_country_id)
            step3Errors.birth_country_id = "Required";
          if (!formData.birth_city_id) step3Errors.birth_city_id = "Required";
        }
        if (formData.is_epis_registered === true && !formData.episId) {
          step3Errors.episId = "ePIS ID is required";
        }

        // Marriage Cert validation removed - handled in modal

        // Personal Details
        if (!formData.first_name)
          step3Errors.first_name = "First Name is required";
        if (!formData.last_name)
          step3Errors.last_name = "Last Name is required";

        // Birth Info
        if (!formData.date_of_birth) step3Errors.date_of_birth = "Required";
        if (!formData.time_of_birth) step3Errors.time_of_birth = "Required";
        if (!formData.weight) step3Errors.weight = "Required";
        if (!formData.gender_id) step3Errors.gender_id = "Required";

        if (Object.keys(step3Errors).length > 0) {
          setErrors(step3Errors);
          return false;
        }
      }
      // Step 3 is now Parents Details (previously 4)
      if (stepNumber === 3) {
        const stepparentsErrors: Record<string, string> = {};
        if (!formData.father_cid) stepparentsErrors.father_cid = "Required";
        if (!formData.fathers_contact_no)
          stepparentsErrors.fathers_contact_no = "Required";
        if (typeof formData.is_father_alive !== "boolean")
          stepparentsErrors.is_father_alive = "Please select deceased/alive";

        if (!formData.mother_cid) stepparentsErrors.mother_cid = "Required";
        if (!formData.mothers_contact_no)
          stepparentsErrors.mothers_contact_no = "Required";
        if (typeof formData.is_mother_alive !== "boolean")
          stepparentsErrors.is_mother_alive = "Please select deceased/alive";

        if (Object.keys(stepparentsErrors).length > 0) {
          setErrors({
            ...stepparentsErrors,
            parents: "Please fill in all required parent details.",
          });
          return false;
        }
      }
      // Step 5 is Guarantor (previously 7)
      if (stepNumber === 4) {
        const guarantorErrors: Record<string, string> = {};
        if (!formData.guarantor_cid)
          guarantorErrors.guarantor_cid = "Guarantor CID is required";
        if (!formData.guarantor_contact_no)
          guarantorErrors.guarantor_contact_no =
            "Guarantor Contact Number is required";
        if (!formData.relationship)
          guarantorErrors.relationship = "Relationship is required";

        if (Object.keys(guarantorErrors).length > 0) {
          setErrors(guarantorErrors);
          return false;
        }
      }
      // Step 5 is Household (previously 6)
      if (stepNumber === 5) {
        if (!formData.registerWithHousehold) {
          setErrors({ registerWithHousehold: "Please select a household" });
          return false;
        }
        if (
          formData.registerWithHousehold === "Others" &&
          !formData.otherHouseholdNo
        ) {
          setErrors({ otherHouseholdNo: "Required" });
          return false;
        }
      }

      // Step 7 is Attachments (previously 9)
      if (stepNumber === 6) {
        if (
          formData.is_epis_registered === false &&
          (!formData.certificate || formData.certificate.length === 0)
        ) {
          setErrors({
            certificate:
              "At least one supporting document is required as the child is not registered in ePIS/MCH.",
          });
          return false;
        }
      }

      // Step 7 is Review & Submit (T&C validation)
      if (stepNumber === 7) {
        if (!formData.disclaimerAgreed) {
          setErrors({
            disclaimerAgreed: "You must agree to the terms to proceed.",
          });
          return false;
        }
      }

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleNext = async () => {
    const logStepTransition = (nextIndex: number) => {
      console.log("BirthRegistrationForm Step Transition", {
        fromStep: currentStep.number,
        fromStepId: currentStep.id,
        toStep: STEPS[nextIndex]?.number,
        toStepId: STEPS[nextIndex]?.id,
        formData,
      });
    };

    if (validateStep(currentStep.number)) {
      if (currentStepIndex === STEPS.length - 1) {
        setShowConfirmDialog(true);
        return;
      }

      // Skip Logic for Guarantor
      if (currentStep.id === "ParentsDetails") {
        const bothDeceased =
          formData.is_father_alive === false &&
          formData.is_mother_alive === false;
        if (!bothDeceased) {
          // Skip Step 7 (Guarantor) and go to Step 8 (Household)
          // Current index is 5 (Step 6). Next is 6 (Step 7).
          // We want to go to 7 (Step 8).
          logStepTransition(currentStepIndex + 2);
          setCurrentStepIndex((prev) => prev + 2);
          return;
        }
      }

      // If we are backtracking from Step 8 to Step 6 (skipping 7), handleBack needs logic too.
      // But standard back button just goes -1.
      // We will handle back logic below.

      logStepTransition(currentStepIndex + 1);
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmDialog(false);
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      console.log("Submitting Form:", formData);
      // Simulate API call with dummy data
      await simulateApiDelay(1500);

      const applicationNo = `BR-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Create application object to store
      const applicationData = {
        ...formData,
        id: `birth-${Date.now()}`,
        application_no: applicationNo,
        applicant_cid: formData.applicant_cid,
        status: "PENDING",
        father_approval: "PENDING",
        mother_approval: "APPROVED",
        hoh_approval: "PENDING",
        guarantor_approval: "N/A",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add to in-memory store
      BirthApplicationService.AddSubmittedApplication(applicationData);

      const response = simulateSuccessResponse({
        application_id: applicationNo,
        status: "PENDING",
        message: "Birth registration application submitted successfully",
      });

      console.log("Application submitted:", applicationNo);
      toast.success("Application Submitted Successfully!", { duration: 5000 });
      setShowSuccessModal(true);
    } catch (error: any) {
      console.error("Submission Error:", error);
      const errorMessage =
        error.message || "Failed to submit application. Please try again.";
      setSubmissionError(errorMessage);
      toast.error("Submission Failed", {
        description: errorMessage,
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      // Skip Logic for Backtracking from Household (Step 8)
      // If we are at Step 8 (Index 7) and parents are NOT both deceased, go back to Step 6 (Index 5).
      if (currentStep.id === "Household") {
        const bothDeceased =
          formData.is_father_alive === false &&
          formData.is_mother_alive === false;
        if (!bothDeceased) {
          setCurrentStepIndex((prev) => prev - 2);
          return;
        }
      }
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  if (!isOpen && !isPage) return null;

  const containerClasses = isPage
    ? "min-h-screen bg-gradient-to-b from-gray-50 to-white py-4 sm:py-8 px-2 sm:px-4 overflow-x-hidden"
    : "fixed inset-0 z-50 overflow-y-auto overflow-x-hidden";

  const wrapperClasses = isPage
    ? "max-w-5xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 flex flex-col min-h-[600px] overflow-hidden"
    : "flex min-h-screen items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm pt-16 sm:pt-20 overflow-hidden";

  const contentClasses = isPage
    ? "flex-1 flex flex-col" // Simplified for page
    : "bg-white rounded-3xl w-full max-w-5xl shadow-2xl relative border border-gray-100 max-h-[90vh] overflow-y-auto flex flex-col";

  const confirmDialog = (
    <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
          <AlertDialogDescription>
            Please confirm that all the details you have entered are correct.
            Once submitted, you will not be able to edit this application.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:gap-3">
          <AlertDialogCancel
            onClick={() => setShowConfirmDialog(false)}
            className="rounded-xl h-11 px-6 font-bold border-2 border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all text-gray-600"
          >
            Go Back & Review
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmSubmit}
            className="rounded-xl h-11 px-8 font-bold bg-primary text-white shadow-lg shadow-primary/20 hover:opacity-90 transition-all border-none"
          >
            Confirm & Submit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  // Success Confirmation Modal
  const successModal = (
    <AlertDialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Submission Successful!</AlertDialogTitle>
          <AlertDialogDescription>
            Your birth registration application has been submitted successfully.
            You can track your application status in the Birth Registration
            service page.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => {
              setShowSuccessModal(false);
              if (onClose) onClose();
              router.push("/services/birth-registration");
            }}
            className="w-full rounded-xl h-11 px-8 font-bold bg-primary text-white shadow-lg shadow-primary/20 hover:opacity-90 transition-all border-none"
          >
            View My Applications
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <div className={containerClasses}>
      <div className={wrapperClasses}>
        {/* If modal, the content wrapper is inside. If page, wrapperClasses IS the content wrapper essentially (but struct differs) */}
        {isPage ? (
          /* Page Structure */
          <>
            {headerContent}
            {/* Body */}
            <div className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto min-h-[400px]">
              {showVerification ? (
                <VerificationStep
                  type="birth"
                  applications={pendingApplications}
                  onVerify={handleVerifyApplication}
                  onProceed={handleProceedToRegistration}
                />
              ) : (
                <>
                  {currentStep.number === 1 && (
                    <Step2ApplicantDetails
                      data={formData}
                      updateData={updateFormData}
                      errors={errors}
                    />
                  )}
                  {currentStep.number === 2 && (
                    <Step3ChildDetails
                      data={formData}
                      updateData={updateFormData}
                      errors={errors}
                    />
                  )}
                  {currentStep.number === 3 && (
                    <Step6ParentsDetails
                      data={formData}
                      updateData={updateFormData}
                      errors={errors}
                    />
                  )}
                  {currentStep.number === 4 && (
                    <Step7GuarantorDetails
                      data={formData}
                      updateData={updateFormData}
                      errors={errors}
                    />
                  )}
                  {currentStep.number === 5 && (
                    <Step8Household
                      data={formData}
                      updateData={updateFormData}
                      errors={errors}
                    />
                  )}
                  {currentStep.number === 6 && (
                    <Step9Attachments
                      data={formData}
                      updateData={updateFormData}
                      errors={errors}
                    />
                  )}
                  {currentStep.number === 7 && (
                    <Step10Review
                      data={formData}
                      updateData={updateFormData}
                      errors={errors}
                    />
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            {!showVerification && (
              <div className="p-4 sm:p-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between bg-gray-50 rounded-b-2xl sm:rounded-b-3xl">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStepIndex === 0 || isSubmitting}
                  className={cn(
                    "px-6 h-11 rounded-xl font-bold order-2 sm:order-1 border-2",
                    (currentStepIndex === 0 || isSubmitting) &&
                      "opacity-50 cursor-not-allowed",
                  )}
                >
                  Back
                </Button>
                {/* Hide Continue button if operator is not verified */}
                {!(
                  currentStep.number === 1 &&
                  formData.applicant_is === "OPERATOR" &&
                  formData.isOperatorVerified === false
                ) && (
                  <Button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="px-8 h-11 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:opacity-90 transition-all flex items-center justify-center gap-2 order-1 sm:order-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        {currentStepIndex === STEPS.length - 1
                          ? "Submit Application"
                          : "Continue"}
                        {currentStepIndex < STEPS.length - 1 && (
                          <svg
                            className="size-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        )}
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </>
        ) : (
          /* Modal Structure (Original) */
          <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl relative border border-gray-100 max-h-[90vh] overflow-y-auto flex flex-col">
            {headerContent}
            {/* Body */}
            <div className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto">
              {showVerification ? (
                <VerificationStep
                  type="birth"
                  applications={pendingApplications}
                  onVerify={handleVerifyApplication}
                  onProceed={handleProceedToRegistration}
                />
              ) : (
                <>
                  {currentStep.number === 1 && (
                    <Step2ApplicantDetails
                      data={formData}
                      updateData={updateFormData}
                      errors={errors}
                    />
                  )}
                  {currentStep.number === 2 && (
                    <Step3ChildDetails
                      data={formData}
                      updateData={updateFormData}
                      errors={errors}
                    />
                  )}
                  {currentStep.number === 3 && (
                    <Step6ParentsDetails
                      data={formData}
                      updateData={updateFormData}
                      errors={errors}
                    />
                  )}
                  {currentStep.number === 4 && (
                    <Step7GuarantorDetails
                      data={formData}
                      updateData={updateFormData}
                      errors={errors}
                    />
                  )}
                  {currentStep.number === 5 && (
                    <Step8Household
                      data={formData}
                      updateData={updateFormData}
                      errors={errors}
                    />
                  )}
                  {currentStep.number === 6 && (
                    <Step9Attachments
                      data={formData}
                      updateData={updateFormData}
                      errors={errors}
                    />
                  )}
                  {currentStep.number === 7 && (
                    <Step10Review
                      data={formData}
                      updateData={updateFormData}
                      errors={errors}
                    />
                  )}
                </>
              )}
            </div>

            {/* Footer Actions */}
            {!showVerification && (
              <div className="p-4 sm:p-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between bg-gray-50 rounded-b-2xl sm:rounded-b-3xl">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStepIndex === 0}
                  className={cn(
                    "px-6 h-11 rounded-xl font-bold order-2 sm:order-1 border-2",
                    currentStepIndex === 0 && "opacity-50 cursor-not-allowed",
                  )}
                >
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="px-8 h-11 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:opacity-90 transition-all flex items-center justify-center gap-2 order-1 sm:order-2"
                >
                  {currentStepIndex === STEPS.length - 1
                    ? "Submit Application"
                    : "Continue"}
                  {currentStepIndex < STEPS.length - 1 && (
                    <svg
                      className="size-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      {confirmDialog}
      {successModal}
    </div>
  );
}
