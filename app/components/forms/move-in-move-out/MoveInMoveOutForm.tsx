"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@/app/context/SessionContext";
import { toast } from "sonner";
import {
  X,
  Check,
  Home,
  MapPin,
  Users,
  FileText,
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

import {
  MOVE_IN_MOVE_OUT_STEPS as STEPS,
  MoveInMoveOutData,
} from "@/lib/validations/move-in-move-out.schema";

import Step1ApplicationDetails from "./steps/Step1ApplicationDetails";
import Step2MoveInLandDetails from "./steps/Step2MoveInLandDetails";
import Step5Review from "./steps/Step5Review";
import MoveInOutApplicationService from "@/lib/services/nrm_service/move-in-out/move-in-out";
import Step3MembersOfHousehold from "./steps/Step3MembersOfHousehold";

const STEP_ICONS = [Home, MapPin, Users, CheckCircle];

interface MoveInMoveOutFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  isPage?: boolean;
}

export default function MoveInMoveOutForm({
  isOpen = true,
  onClose,
  isPage = false,
}: MoveInMoveOutFormProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<Partial<MoveInMoveOutData>>({
    applicant_is: "HOUSEHOLD_MEMBER",
    applicantCidNo: "",
    applicantName: "",
    applicantContactNo: "",
    currentHouseholdNo: "",
    currentHohCidNo: "",
    currentHouseNo: "",
    currentTharmNo: "",
    currentDzongkhagId: "",
    currentGewogId: "",
    currentChiwogId: "",
    currentVillageId: "",
    moveInHouseNo: "",
    moveInTharmNo: "",
    moveInDzongkhagId: "",
    moveInGewogId: "",
    moveInChiwogId: "",
    moveInVillageId: "",
    moveType: "new_household",
    movingMembers: [],
    willBecomeHoh: false,
    i_agree_to_terms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHohError, setIsHohError] = useState(false);
  const [isResettlementError, setIsResettlementError] = useState(false);
  const [showDummyData, setShowDummyData] = useState(true);
  const stepperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { session } = useSessionContext();

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

  const updateFormData = (data: Partial<MoveInMoveOutData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    const newErrors = { ...errors };
    Object.keys(data).forEach((key) => delete newErrors[key]);
    setErrors(newErrors);
  };

  const validateStep = (stepNumber: number): boolean => {
    const stepErrors: Record<string, string> = {};

    // Step 1: Application Details
    if (stepNumber === 1) {
      if (!formData.applicantCidNo)
        stepErrors.applicantCidNo = "Applicant CID is required";
      if (!formData.applicantContactNo)
        stepErrors.applicantContactNo = "Contact number is required";
      if (!formData.currentHouseholdNo)
        stepErrors.currentHouseholdNo = "Current household number is required";
      if (!formData.currentDzongkhagId)
        stepErrors.currentDzongkhagId = "Current Dzongkhag is required";
      if (!formData.currentGewogId)
        stepErrors.currentGewogId = "Current Gewog is required";
      if (!formData.currentVillageId)
        stepErrors.currentVillageId = "Current Village is required";

      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        toast.error("Please fill in all required fields");
        return false;
      }
    }

    // Step 2: Move In Land Details
    if (stepNumber === 2) {
      if (!formData.moveType) stepErrors.moveType = "Move type is required";
      if (!formData.moveInDzongkhagId)
        stepErrors.moveInDzongkhagId = "Move-in Dzongkhag is required";
      if (!formData.moveInGewogId)
        stepErrors.moveInGewogId = "Move-in Gewog is required";
      if (!formData.moveInVillageId)
        stepErrors.moveInVillageId = "Move-in Village is required";
      if (!formData.moveInHouseNo)
        stepErrors.moveInHouseNo = "Move-in House number is required";

      if (
        formData.moveType === "join_household" &&
        !formData.moveInHouseholdNo
      ) {
        stepErrors.moveInHouseholdNo =
          "Household number is required when joining existing household";
      }

      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        toast.error("Please fill in all required move-in location details");
        return false;
      }
    }

    // Step 3: Members of Household
    if (stepNumber === 3) {
      // Household member selection is optional
      // No validation needed
    }

    // Step 4: Review
    if (stepNumber === 4) {
      if (!formData.i_agree_to_terms) {
        stepErrors.i_agree_to_terms =
          "You must agree to the terms and conditions";
        setErrors(stepErrors);
        toast.error("Please agree to the terms and conditions to proceed");
        return false;
      }
    }

    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep.number)) {
      if (currentStepIndex === STEPS.length - 1) {
        setShowConfirmDialog(true);
      } else {
        setCurrentStepIndex((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setShowConfirmDialog(false);
    setIsSubmitting(true);

    try {
      if (!session?.user?.cidNo) {
        toast.error("Authentication required. Please log in again.");
        setIsSubmitting(false);
        return;
      }

      // Submit the application
      const response =
        await MoveInOutApplicationService.createMoveInOutApplication(
          "demo-token",
          formData,
        );

      if (response.success) {
        toast.success("Move In/Move Out application submitted successfully!");
        setShowSuccessModal(true);
      } else {
        throw new Error(response.message || "Submission failed");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    if (isPage) {
      router.push("/services/move-in-move-out");
    } else if (onClose) {
      onClose();
    }
  };

  const dummyDataSection = (
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
                Step 1: Application Details
              </p>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">
                    Applicant Type:
                  </span>
                  <code className="text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded">
                    Household Member
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
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-600 font-medium">Note:</span>
                  <span className="text-gray-600 text-[11px]">
                    All details auto-populate when you select Household Member
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 space-y-2">
              <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                Step 2: Move-In Details
              </p>
              <div className="space-y-1.5 text-xs">
                {formData.moveType === "new_household" ? (
                  <>
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">
                        Move Type:
                      </span>
                      <code className="text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded">
                        New Household
                      </code>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">
                        Plot Owner CID:
                      </span>
                      <code className="text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded">
                        11111111111
                      </code>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">
                        Area Type:
                      </span>
                      <code className="text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded">
                        Rural / Urban
                      </code>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-600 font-medium">Note:</span>
                      <span className="text-gray-600 text-[11px]">
                        Enter plot owner CID and verify to continue
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">
                        Move Type:
                      </span>
                      <code className="text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded">
                        Join Existing Household
                      </code>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">
                        Existing Household No:
                      </span>
                      <code className="text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded">
                        HH-2024-001
                      </code>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">
                        House/Tharm No:
                      </span>
                      <code className="text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded">
                        H-789 / T-012
                      </code>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-600 font-medium">Note:</span>
                      <span className="text-gray-600 text-[11px]">
                        Enter household number and click search to load details
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 space-y-2">
              <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                Step 3: Household Members
              </p>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">
                    Available Members:
                  </span>
                  <code className="text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded">
                    4 members
                  </code>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Selection:</span>
                  <code className="text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded">
                    Optional
                  </code>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-600 font-medium">Note:</span>
                  <span className="text-gray-600 text-[11px]">
                    Select members who will move with you (optional)
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-xs text-amber-800 font-medium">
                <span className="font-bold">Note:</span> Your applicant details
                are automatically loaded from your login credentials. Fill in
                contact information and select locations from the dropdowns.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const headerContent = (
    <div className="bg-white border-b border-gray-100 flex flex-col pt-4 sm:pt-6 pb-0 z-10 sticky top-0">
      {/* Top Bar with Title and Back/Close */}
      <div className="px-4 sm:px-6 lg:px-8 pb-3 sm:pb-4 flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
          {isPage && (
            <button
              onClick={() => router.back()}
              className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <div className="min-w-0 flex-1">
            <h2 className="text-lg sm:text-xl font-black text-gray-900 truncate">
              Move In / Move Out
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

      {/* Dummy Data Helper */}
      {dummyDataSection}

      {/* Stepper */}
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
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <AlertDialogTitle className="text-center">
            Application Submitted Successfully
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Your Move In/Move Out application has been submitted successfully.
            You will receive updates via SMS.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleSuccessClose}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Done
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  const confirmDialog = (
    <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to submit this Move In/Move Out application?
            Please review all details before proceeding.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Confirm & Submit"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  if (!isOpen) return null;

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {headerContent}

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          {currentStep.number === 1 && (
            <Step1ApplicationDetails
              data={formData}
              updateData={updateFormData}
              errors={errors}
              setIsHohError={setIsHohError}
              setIsResettlementError={setIsResettlementError}
            />
          )}
          {currentStep.number === 2 && (
            <Step2MoveInLandDetails
              data={formData}
              updateData={updateFormData}
              errors={errors}
            />
          )}
          {currentStep.number === 3 && (
            <Step3MembersOfHousehold
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

      {/* Footer */}
      <div className="p-4 sm:p-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between bg-gray-50">
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
            (currentStepIndex === 0 &&
              (isHohError ||
                isResettlementError ||
                formData.applicant_is === "OPERATOR"))
          }
          className="h-12 px-10 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:opacity-90 order-1 sm:order-2 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentStepIndex === STEPS.length - 1
            ? "Submit Application"
            : "Continue"}
          {currentStepIndex < STEPS.length - 1 && (
            <ArrowRight className="w-4 h-4" />
          )}
        </Button>
      </div>

      {successModal}
      {confirmDialog}
    </div>
  );
}
