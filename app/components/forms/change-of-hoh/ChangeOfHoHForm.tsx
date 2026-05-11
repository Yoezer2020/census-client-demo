"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  X,
  Check,
  User,
  Users,
  ClipboardCheck,
  CheckCircle,
  ArrowRight,
  Loader2,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
import HohChangesService from "@/lib/services/amendment-service/hoh-changes/hoh-changes";

import {
  HOH_STEPS as STEPS,
  ChangeOfHoHData,
} from "@/lib/validations/change-of-hoh.schema";

import Step2ApplicantDetails from "./steps/Step2ApplicantDetails";
import Step3NewHoH from "./steps/Step3NewHoH";
import Step5Review from "./steps/Step5Review";

const STEP_ICONS = [User, Users, ClipboardCheck];

interface ChangeOfHoHFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  isPage?: boolean;
}

export default function ChangeOfHoHForm({
  isOpen = true,
  onClose,
  isPage = false,
}: ChangeOfHoHFormProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<Partial<ChangeOfHoHData>>({
    i_agree_to_terms: false,
    applicantCidNo: "",
    applicantContactNo: "",
    applicantIs: "",
    householdNo: "",
    hohCidNo: "",
    houseNo: "",
    tharmNo: "",
    dzongkhagId: "",
    gewogId: "",
    chiwogId: "",
    villageId: "",
    nationality: "",
    newHohCidNo: "",
    firstName: "",
    middleName: "",
    lastName: "",
    hohChangeReasonId: "",
    newHohHouseholdMismatch: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDummyData, setShowDummyData] = useState(true);
  const stepperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const currentStep = STEPS[currentStepIndex];

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

  const updateFormData = (data: Partial<ChangeOfHoHData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    const newErrors = { ...errors };
    Object.keys(data).forEach((key) => delete newErrors[key]);
    setErrors(newErrors);
  };

  const validateStep = (stepNumber: number): boolean => {
    const stepErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!formData.applicantIs) {
        stepErrors.applicantIs = "Please select applicant type.";
      }

      // Check operator verification
      if (
        formData.applicantIs === "Operator" &&
        formData.isOperatorVerified === false
      ) {
        stepErrors.applicantIs = "You are not authorized as an operator.";
      }

      if (!formData.point_of_application_dzongkhag) {
        stepErrors.point_of_application_dzongkhag =
          "Please select Dzongkhag/Dungkhag/Thromde.";
      }
      if (!formData.point_of_application_gewog) {
        stepErrors.point_of_application_gewog = "Please select Gewog.";
      }

      if (!formData.householdNo?.trim()) {
        stepErrors.householdNo = "Household number is required.";
      } else if (!formData.hohCidNo) {
        stepErrors.householdNo =
          "No household found with this number. Please verify.";
      }
    }

    if (stepNumber === 2) {
      if (!formData.newHohCidNo || !/^\d{11}$/.test(formData.newHohCidNo)) {
        stepErrors.newHohCidNo = "A valid 11-digit CID is required.";
      } else if (formData.newHohHouseholdMismatch) {
        stepErrors.newHohCidNo =
          "New hoh can be proposed only if they share the same household.";
      } else if (!formData.firstName) {
        stepErrors.newHohCidNo =
          "No record found for this CID. Please try again.";
      }
      if (!formData.hohChangeReasonId) {
        stepErrors.hohChangeReasonId = "Please select a reason for the change.";
      }
    }

    if (stepNumber === 3) {
      if (!formData.i_agree_to_terms) {
        stepErrors.i_agree_to_terms =
          "You must confirm the declaration to submit.";
      }
    }

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep.number)) {
      console.log(
        `[ChangeOfHoH] Step ${currentStep.number} → ${currentStepIndex < STEPS.length - 1 ? STEPS[currentStepIndex + 1].number : "SUBMIT"}`,
        "formData:",
        formData,
      );
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

      const payload = {
        applicantContactNo: formData.applicantContactNo || "",
        applicantCidNo: formData.applicantCidNo || "",
        applicantIs: formData.applicantIs || "",
        householdNo: formData.householdNo || "",
        hohCidNo: formData.hohCidNo || "",
        houseNo: formData.houseNo || "",
        tharmNo: formData.tharmNo || "",
        dzongkhagId: formData.dzongkhagId || "",
        gewogId: formData.gewogId || "",
        chiwogId: formData.chiwogId || "",
        villageId: formData.villageId || "",
        newHohCidNo: formData.newHohCidNo || "",
        hohChangeReasonId: formData.hohChangeReasonId || "",
      };

      await HohChangesService.CreateHohChange("demo-token", payload);

      toast.success("Application Submitted Successfully!", {
        description:
          "Your Change of Head of Household request has been received.",
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
      console.log(
        `[ChangeOfHoH] Step ${currentStep.number} ← ${STEPS[currentStepIndex - 1].number}`,
        "formData:",
        formData,
      );
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
              Change of Head of Household
            </h2>
            <p className="text-xs text-gray-500 font-medium hidden sm:block">
              Step {currentStepIndex + 1} of {STEPS.length} —{" "}
              {currentStep.label}
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

      {/* Test Data Helper */}
      <div className="px-4 sm:px-6 lg:px-8 pb-3">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200 overflow-hidden">
          <button
            onClick={() => setShowDummyData(!showDummyData)}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-blue-100/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-500 rounded-lg">
                <Info className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-blue-900">
                  Test Data Helper
                </h4>
                <p className="text-xs text-blue-700">
                  Click to {showDummyData ? "hide" : "show"} sample data for
                  testing
                </p>
              </div>
            </div>
            {showDummyData ? (
              <ChevronUp className="w-5 h-5 text-blue-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-blue-600" />
            )}
          </button>

          {showDummyData && (
            <div className="px-4 pb-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
              <div className="bg-white rounded-lg p-3 space-y-2">
                <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                  Step 1: Applicant Details
                </p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">
                      Logged in as:
                    </span>
                    <code className="text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded">
                      Mother (11234567890)
                    </code>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">
                      Contact Number:
                    </span>
                    <code className="text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded">
                      17123456
                    </code>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">
                      Applicant Type:
                    </span>
                    <code className="text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded">
                      Family
                    </code>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-600 font-medium">
                      Household Number:
                    </span>
                    <code className="text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded">
                      HH-2024-001
                    </code>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 space-y-2">
                <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                  Step 2: New Head of Household
                </p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">
                      New HoH CID:
                    </span>
                    <code className="text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded">
                      11105001234
                    </code>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">
                      New HoH Name:
                    </span>
                    <code className="text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded">
                      Karma Tenzin Dorji
                    </code>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-600 font-medium">
                      Change Reason:
                    </span>
                    <code className="text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded">
                      Select any reason
                    </code>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 space-y-2">
                <p className="text-xs text-amber-800 font-medium">
                  <span className="font-bold">Note:</span> Enter household
                  number HH-2024-001 and search to load details. Then enter new
                  HoH CID 11105001234 (Father) to propose the change.
                </p>
                <p className="text-xs text-amber-800 font-medium">
                  <span className="font-bold">Approval Flow:</span> After
                  submission, the application will appear in "Pending Actions"
                  for household members (Father: 11105001234) to approve.
                </p>
              </div>
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
            const Icon = STEP_ICONS[idx] ?? CheckCircle;
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
            Your Change of Head of Household application has been received and
            is under review.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Warning Alert */}
        <div className="mx-6 mb-2">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="text-sm font-medium text-yellow-800 text-center">
              For the final submission need to get approval of all eligible
              household members of the household
            </p>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => router.push("/services/change-of-hoh")}
            className="w-full h-12 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20"
          >
            Go to Applications
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  if (!isPage && !isOpen) return null;

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
              />
            )}
            {currentStep.number === 2 && (
              <Step3NewHoH
                data={formData}
                updateData={updateFormData}
                errors={errors}
              />
            )}
            {currentStep.number === 3 && (
              <Step5Review
                data={formData}
                updateData={updateFormData}
                errors={errors}
              />
            )}
          </div>
        </div>

        <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-3 sm:justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStepIndex === 0 || isSubmitting}
            className="h-12 px-8 rounded-xl font-bold border-2 order-2 sm:order-1"
          >
            Back
          </Button>
          {/* Hide Continue button if operator is not verified */}
          {!(
            currentStepIndex === 0 &&
            formData.applicantIs === "Operator" &&
            formData.isOperatorVerified === false
          ) && (
            <Button
              onClick={handleNext}
              disabled={isSubmitting}
              className="h-12 px-10 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:opacity-90 order-1 sm:order-2 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting…
                </>
              ) : currentStepIndex === STEPS.length - 1 ? (
                "Submit Application"
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
      {/* Confirm submission dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="max-w-md rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold text-gray-900">
              Confirm Submission
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Are you sure you want to submit this Change of Head of Household
              application? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl font-semibold">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmSubmit}
              className="bg-primary text-white rounded-xl font-semibold"
            >
              Confirm &amp; Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {successModal}
    </div>
  );
}
