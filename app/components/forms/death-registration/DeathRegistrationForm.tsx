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
  UserX,
  Calendar,
  Heart,
  Home,
  Paperclip,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DEATH_REGISTRATION_DUMMY_DATA,
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
  DEATH_STEPS as STEPS,
  DeathRegistrationData,
} from "@/lib/validations/death-registration.schema";
import Step2ApplicantDetails from "./steps/Step2ApplicantDetails";
import Step3DeceasedPersonalDetails from "./steps/Step3DeceasedPersonalDetails";
import Step4DeceasedAddressDetails from "./steps/Step4DeceasedAddressDetails";
import Step5DeathDetails from "./steps/Step5DeathDetails";
import Step7Attachments from "./steps/Step7Attachments";
import Step8Review from "./steps/Step8Review";
import DeathApplicationService from "@/lib/services/birth-death-service/death-applications/death-applications";

// Icon mapping for steps
const STEP_ICONS = [
  User, // Applicant
  UserX, // Deceased Personal
  Home, // Deceased Address
  Heart, // Death Details
  Paperclip, // Attachments
  CheckCircle, // Review
];

interface DeathRegistrationFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  isPage?: boolean;
}

export default function DeathRegistrationForm({
  isOpen = true,
  onClose,
  isPage = false,
}: DeathRegistrationFormProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<Partial<DeathRegistrationData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingEligibility, setIsCheckingEligibility] = useState(false);
  const [hohEligibilityError, setHohEligibilityError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
  // DEMO: Use dummy data
  const dummyUserCID = "11234567890"; // Mother's CID

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
              Death Registration
            </h2>
            <p className="text-xs text-gray-500 font-medium hidden sm:block">
              Application ID: #DR-2026-001
            </p>
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
      <div className="px-4 sm:px-6 lg:px-8 pb-2">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-blue-900">
              Sample Data for{" "}
              {(DEATH_REGISTRATION_DUMMY_DATA as any)[
                `step${currentStepIndex + 1}`
              ]?.stepTitle || `Step ${currentStepIndex + 1}`}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {Object.entries(
              (DEATH_REGISTRATION_DUMMY_DATA as any)[
                `step${currentStepIndex + 1}`
              ]?.sampleData || {},
            ).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-blue-700 font-medium">{key}:</span>
                <span className="text-blue-900 font-mono">{String(value)}</span>
              </div>
            ))}
          </div>
          {(DEATH_REGISTRATION_DUMMY_DATA as any)[`step${currentStepIndex + 1}`]
            ?.note && (
            <div className="mt-2 text-xs text-blue-700 italic">
              {
                (DEATH_REGISTRATION_DUMMY_DATA as any)[
                  `step${currentStepIndex + 1}`
                ].note
              }
            </div>
          )}
        </div>
      </div>

      {/* Scrollable Stepper Container */}
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
                      isCompleted || isActive ? "bg-green-600" : "bg-gray-100",
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
                  <span className="sm:hidden">{step.label.split(" ")[0]}</span>
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
    </div>
  );

  const updateFormData = (data: Partial<DeathRegistrationData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    // Clear errors for fields being updated
    const newErrors = { ...errors };
    Object.keys(data).forEach((key) => delete newErrors[key]);
    setErrors(newErrors);
  };

  const validateStep = (stepNumber: number): boolean => {
    try {
      const stepErrors: Record<string, string> = {};

      if (stepNumber === 1) {
        if (!formData.applicantCID)
          stepErrors.applicantCID = "Applicant CID is required";
        if (!formData.applicant_contact_no)
          stepErrors.applicant_contact_no =
            "Applicant contact number is required";
        if (!formData.point_of_application_dzongkhag)
          stepErrors.point_of_application_dzongkhag =
            "Please select Dzongkhag/Dungkhag/Thromde.";
        if (!formData.point_of_application_gewog)
          stepErrors.point_of_application_gewog = "Please select Gewog.";
        if (!formData.applicant_is)
          stepErrors.applicant_is = "Please select applicant type";

        // Check operator verification
        if (
          formData.applicant_is === "OPERATOR" &&
          formData.isOperatorVerified === false
        ) {
          stepErrors.applicant_is = "You are not authorized as an operator.";
        }

        if (typeof formData.is_health_registered !== "boolean")
          stepErrors.is_health_registered =
            "Please select if deceased is registered in ePIS";
        if (formData.is_health_registered === true && !formData.deceased_cid)
          stepErrors.deceased_cid = "Deceased CID number is required";
      }

      if (stepNumber === 2) {
        if (!formData.first_name)
          stepErrors.first_name = "First Name is required";
        if (!formData.last_name) stepErrors.last_name = "Last Name is required";
        if (!formData.date_of_birth)
          stepErrors.date_of_birth = "Date of Birth is required";
        if (!formData.gender) stepErrors.gender = "Gender is required";
      }

      if (stepNumber === 3) {
        if (!formData.dzongkhag_id)
          stepErrors.dzongkhag_id = "Dzongkhag is required";
        if (!formData.gewog_id) stepErrors.gewog_id = "Gewog is required";
        if (!formData.chiwog_id) stepErrors.chiwog_id = "Chiwog is required";
        if (!formData.village_id) stepErrors.village_id = "Village is required";
        if (!formData.house_hold_no)
          stepErrors.house_hold_no = "Household Number is required";
        if (!formData.house_no)
          stepErrors.house_no = "House Number is required";
      }

      if (stepNumber === 4) {
        if (!formData.date_of_death)
          stepErrors.date_of_death = "Date of Death is required";
        if (!formData.time_of_death)
          stepErrors.time_of_death = "Time of Death is required";
        if (!formData.place_of_death)
          stepErrors.place_of_death = "Place of Death is required";
        if (!formData.cause_of_death)
          stepErrors.cause_of_death = "Cause of Death is required";

        const hasAbroadLocation =
          !!formData.country_of_death_id || !!formData.city_id;

        if (hasAbroadLocation) {
          if (!formData.country_of_death_id)
            stepErrors.country_of_death_id = "Country of Death is required";
          if (!formData.city_id)
            stepErrors.city_id = "City of Death is required";
        } else {
          if (!formData.dzongkhag_of_death_id)
            stepErrors.dzongkhag_of_death_id = "Dzongkhag of Death is required";
          if (!formData.gewog_of_death_id)
            stepErrors.gewog_of_death_id = "Gewog of Death is required";
          if (!formData.chiwog_of_death_id)
            stepErrors.chiwog_of_death_id = "Chiwog of Death is required";
          if (!formData.village_of_death_id)
            stepErrors.village_of_death_id = "Village of Death is required";
        }
      }

      if (stepNumber === 5) {
        if (
          formData.is_health_registered === false &&
          (!formData.certificate || formData.certificate.length === 0)
        ) {
          stepErrors.certificate =
            "Death certificate is required when not registered in ePIS";
        }
      }

      // Step 6 is Review & Submit (T&C validation)
      if (stepNumber === 6) {
        if (!formData.disclaimerAgreed) {
          stepErrors.disclaimerAgreed =
            "You must agree to the terms to proceed.";
        }
      }

      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return false;
      }

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleNext = async () => {
    console.log("DeathRegistrationForm Next Click", {
      step: currentStep.number,
      stepId: currentStep.id,
      formData,
    });

    if (validateStep(currentStep.number)) {
      // On step 2 (Deceased Personal Details), check HOH eligibility before proceeding
      if (currentStep.number === 2 && formData.deceased_cid) {
        setIsCheckingEligibility(true);
        setHohEligibilityError("");
        try {
          // Simulate API call with dummy data
          await simulateApiDelay(1000);
          const result = {
            eligible: true,
            message: "Eligibility verified successfully",
          };
          if (!result?.eligible) {
            setHohEligibilityError(
              result?.message || "Deceased is not eligible to proceed.",
            );
            return;
          }
        } catch {
          setHohEligibilityError(
            "Failed to verify eligibility. Please try again.",
          );
          return;
        } finally {
          setIsCheckingEligibility(false);
        }
      }

      if (currentStepIndex === STEPS.length - 1) {
        setShowConfirmDialog(true);
        return;
      }

      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmDialog(false);

    try {
      setIsSubmitting(true);

      console.log("Submitting Form:", formData);

      // Generate application ID
      const applicationId = `DR-2026-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`;

      // Create application object
      const applicationData = {
        ...formData,
        id: `death-${Date.now()}`,
        application_no: applicationId,
        applicant_cid: dummyUserCID,
        status: "SUBMITTED",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add to in-memory store
      DeathApplicationService.AddSubmittedApplication(applicationData);

      // Simulate API delay
      await simulateApiDelay(1500);
      const response = simulateSuccessResponse({
        application_id: applicationId,
        status: "SUBMITTED",
        message: "Death registration application submitted successfully",
      });

      console.log("Application submitted:", applicationId);

      toast.success("Application Submitted Successfully!", {
        description: "Your death registration request has been received.",
        duration: 5000,
      });

      setShowSuccessModal(true);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to submit application. Please try again.";

      toast.error("Submission Failed", {
        description: Array.isArray(errorMessage)
          ? errorMessage.join(", ")
          : String(errorMessage),
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setHohEligibilityError("");
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

  const confirmDialog = (
    <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
          <AlertDialogDescription>
            Please confirm that all death registration details are correct. Once
            submitted, you will not be able to edit this application.
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
            Your death registration application has been submitted successfully.
            Your reference number is{" "}
            <span className="font-bold text-foreground">#DR-2026-001</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => {
              setShowSuccessModal(false);
              if (onClose) onClose();
              router.push("/services/death-registration");
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
        {isPage ? (
          /* Page Structure */
          <>
            {headerContent}
            {/* Body */}
            <div className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto overflow-x-hidden min-h-[400px]">
              <div className="w-full max-w-5xl mx-auto">
                <>
                  {currentStep.number === 1 && (
                    <Step2ApplicantDetails
                      data={formData}
                      updateData={updateFormData}
                      errors={errors}
                      onProceedToManualEntry={() => setCurrentStepIndex(1)}
                    />
                  )}
                  {currentStep.number === 2 && (
                    <>
                      <Step3DeceasedPersonalDetails
                        data={formData}
                        updateData={updateFormData}
                        errors={errors}
                      />
                      {hohEligibilityError && (
                        <div className="max-w-2xl mx-auto mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold">
                          Error: Cannot proceed with the application:{" "}
                          {hohEligibilityError}
                        </div>
                      )}
                    </>
                  )}
                  {currentStep.number === 3 && (
                    <Step4DeceasedAddressDetails
                      data={formData}
                      updateData={updateFormData}
                      errors={errors}
                    />
                  )}
                  {currentStep.number === 4 && (
                    <Step5DeathDetails
                      data={formData}
                      updateData={updateFormData}
                      errors={errors}
                    />
                  )}
                  {currentStep.number === 5 && (
                    <Step7Attachments
                      data={formData}
                      updateData={updateFormData}
                      errors={errors}
                    />
                  )}
                  {currentStep.number === 6 && (
                    <Step8Review
                      data={formData}
                      updateData={updateFormData}
                      errors={errors}
                    />
                  )}
                </>
              </div>
            </div>

            {/* Footer */}
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
                  disabled={
                    isSubmitting ||
                    isCheckingEligibility ||
                    (currentStep.number === 2 && !!hohEligibilityError)
                  }
                  className={cn(
                    "px-8 h-11 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:opacity-90 transition-all flex items-center justify-center gap-2 order-1 sm:order-2",
                    currentStep.number === 2 && hohEligibilityError && "hidden",
                  )}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : isCheckingEligibility
                      ? "Checking..."
                      : currentStepIndex === STEPS.length - 1
                        ? "Submit Application"
                        : "Continue"}
                  {!isSubmitting &&
                    !isCheckingEligibility &&
                    currentStepIndex < STEPS.length - 1 && (
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
              )}
            </div>
          </>
        ) : (
          /* Modal Structure */
          <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl relative border border-gray-100 max-h-[90vh] overflow-y-auto flex flex-col">
            {headerContent}
            {/* Body */}
            <div className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto">
              <>
                {currentStep.number === 1 && (
                  <Step2ApplicantDetails
                    data={formData}
                    updateData={updateFormData}
                    errors={errors}
                    onProceedToManualEntry={() => setCurrentStepIndex(1)}
                  />
                )}
                {currentStep.number === 2 && (
                  <>
                    <Step3DeceasedPersonalDetails
                      data={formData}
                      updateData={updateFormData}
                      errors={errors}
                    />
                    {hohEligibilityError && (
                      <div className="max-w-2xl mx-auto mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold">
                        Error: Cannot proceed with the application.{" "}
                        {hohEligibilityError}
                      </div>
                    )}
                  </>
                )}
                {currentStep.number === 3 && (
                  <Step4DeceasedAddressDetails
                    data={formData}
                    updateData={updateFormData}
                    errors={errors}
                  />
                )}
                {currentStep.number === 4 && (
                  <Step5DeathDetails
                    data={formData}
                    updateData={updateFormData}
                    errors={errors}
                  />
                )}
                {currentStep.number === 5 && (
                  <Step7Attachments
                    data={formData}
                    updateData={updateFormData}
                    errors={errors}
                  />
                )}
                {currentStep.number === 6 && (
                  <Step8Review
                    data={formData}
                    updateData={updateFormData}
                    errors={errors}
                  />
                )}
              </>
            </div>

            {/* Footer Actions */}
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
              <Button
                onClick={handleNext}
                disabled={
                  isSubmitting ||
                  isCheckingEligibility ||
                  (currentStep.number === 2 && !!hohEligibilityError)
                }
                className={cn(
                  "px-8 h-11 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:opacity-90 transition-all flex items-center justify-center gap-2 order-1 sm:order-2",
                  currentStep.number === 2 && hohEligibilityError && "hidden",
                )}
              >
                {isSubmitting
                  ? "Submitting..."
                  : isCheckingEligibility
                    ? "Checking..."
                    : currentStepIndex === STEPS.length - 1
                      ? "Submit Application"
                      : "Continue"}
                {!isSubmitting &&
                  !isCheckingEligibility &&
                  currentStepIndex < STEPS.length - 1 && (
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
          </div>
        )}
      </div>
      {confirmDialog}
      {successModal}
    </div>
  );
}
