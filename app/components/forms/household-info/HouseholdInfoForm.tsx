"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  X,
  Check,
  UserCircle,
  FileText,
  CheckCircle,
  ArrowRight,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";
import { Button } from "@/app/components/ui/button";

import {
  HOUSEHOLD_INFO_STEPS as STEPS,
  HouseholdInfoData,
} from "@/lib/validations/change-of-hoh.schema";

import HI2ApplicantDetails from "./steps/HI2ApplicantDetails";
import HI3HouseholdDetails from "./steps/HI3HouseholdDetails";

const STEP_ICONS = [UserCircle, FileText];

interface HouseholdInfoFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  isPage?: boolean;
}

export default function HouseholdInfoForm({
  isOpen = true,
  onClose,
  isPage = false,
}: HouseholdInfoFormProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<Partial<HouseholdInfoData>>({
    i_agree_to_terms: false,
    cid_of_applicant: "",
    applicant_name: "",
    village: "",
    gewog: "",
    dzongkhag: "",
    language_preference: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const stepperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const currentStep = STEPS[currentStepIndex];

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

  const updateFormData = (data: Partial<HouseholdInfoData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    const newErrors = { ...errors };
    Object.keys(data).forEach((key) => delete newErrors[key]);
    setErrors(newErrors);
  };

  const validateStep = (stepNumber: number): boolean => {
    const stepErrors: Record<string, string> = {};

    // Step 1 — Applicant Details (auto-filled, no required manual input)

    if (stepNumber === 2) {
      if (!formData.language_preference) {
        stepErrors.language_preference = "Please select a language preference.";
      }
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
      if (currentStepIndex === STEPS.length - 1) {
        toast.success("Household Information Request Submitted!");
        setSubmitted(true);
        setShowSuccessModal(true);
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
              Household Information
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
            Request Submitted!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 pt-2">
            Your household information is ready. It will be available in{" "}
            <strong>
              {formData.language_preference ?? "your chosen language"}
            </strong>
            .
            <br />
            <br />
            You can download it directly from the form or visit your dashboard.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col gap-2">
          <Button
            onClick={() => {
              setShowSuccessModal(false);
              // Return to Household Details step so user can click download
              setCurrentStepIndex(1);
            }}
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold gap-2"
          >
            <Download className="size-4" />
            Download Household Info
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard")}
            className="w-full h-11 rounded-xl font-semibold border-2"
          >
            Go to Dashboard
          </Button>
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
              <HI2ApplicantDetails
                data={formData}
                updateData={updateFormData}
                errors={errors}
              />
            )}
            {currentStep.number === 2 && (
              <HI3HouseholdDetails
                data={formData}
                updateData={updateFormData}
                errors={errors}
                submitted={submitted}
              />
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
          <Button
            onClick={handleNext}
            disabled={submitted && currentStepIndex === STEPS.length - 1}
            className="h-12 px-10 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:opacity-90 order-1 sm:order-2 flex items-center gap-2"
          >
            {currentStepIndex === STEPS.length - 1
              ? "Submit Request"
              : "Continue"}
            {currentStepIndex < STEPS.length - 1 && (
              <ArrowRight className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
      {successModal}
    </div>
  );
}
