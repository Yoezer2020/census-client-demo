"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  FileHeart,
  AlertCircle,
  CheckCircle2,
  Search,
  Loader2,
  CheckCircle,
  XCircle,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import ServicePageLayout from "@/app/components/layouts/ServicePageLayout";
import { Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import RelationshipPurposeAutocomplete from "@/app/components/forms/relationship/RelationshipPurposeAutocomplete";
import PaymentTypeAutocomplete from "@/app/components/forms/relationship/PaymentTypeAutocomplete";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import RelationshipApplicationService from "@/lib/services/issuance-service/relationship-application/relationship-application";

// Mock delay helper
const simulateApiDelay = (ms: number = 800) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default function RelationshipServicesPage() {
  const router = useRouter();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showDummyData, setShowDummyData] = useState(true);
  const [isVerifyingRelationship, setIsVerifyingRelationship] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [relationshipVerified, setRelationshipVerified] = useState(false);
  const [relationshipExists, setRelationshipExists] = useState<boolean | null>(
    null,
  );

  // Mock user data (Mother's credentials)
  const mockUserCID = "11234567890";
  const mockUserName = "Pema Deki Wangmo";

  const [formData, setFormData] = useState({
    applicantCID: mockUserCID,
    applicantName: mockUserName,
    applicantContactNumber: "",
    point_of_application_dzongkhag: "",
    point_of_application_gewog: "",
    relationshipToCID: "",
    purposeName: "",
    purposeId: "",
    paymentTypeId: "",
    paymentTypeName: "",
    paymentAmount: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleVerifyRelationship = async () => {
    if (!formData.relationshipToCID) {
      setErrors({ ...errors, relationshipToCID: "Please enter CID to verify" });
      return;
    }

    if (!/^\d{11}$/.test(formData.relationshipToCID)) {
      setErrors({
        ...errors,
        relationshipToCID: "Invalid CID (11 digits required)",
      });
      return;
    }

    setIsVerifyingRelationship(true);
    try {
      // Simulate API delay
      await simulateApiDelay(800);

      // Mock: Father's CID (11105001234) has a relationship, others don't
      const exists = formData.relationshipToCID === "11105001234";

      setRelationshipVerified(true);
      setRelationshipExists(exists);

      if (errors.relationshipToCID) {
        setErrors({ ...errors, relationshipToCID: "" });
      }

      if (exists) {
        toast.success("Relationship verified successfully!");
      } else {
        toast.error("No relationship found with this CID");
      }
    } catch (error: any) {
      console.error("Error verifying relationship:", error);
      toast.error("Failed to verify relationship. Please try again.");
    } finally {
      setIsVerifyingRelationship(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.applicantCID) {
      newErrors.applicantCID = "Applicant CID is required";
    }
    if (!formData.applicantContactNumber) {
      newErrors.applicantContactNumber = "Contact number is required";
    } else if (!/^\d{8}$/.test(formData.applicantContactNumber)) {
      newErrors.applicantContactNumber = "Invalid contact number (8 digits)";
    }
    if (!formData.point_of_application_dzongkhag) {
      newErrors.point_of_application_dzongkhag =
        "Please select Dzongkhag/Dungkhag/Thromde.";
    }
    if (!formData.point_of_application_gewog) {
      newErrors.point_of_application_gewog = "Please select Gewog.";
    }
    if (!formData.relationshipToCID) {
      newErrors.relationshipToCID = "Relationship to CID is required";
    } else if (!relationshipVerified) {
      newErrors.relationshipToCID = "Please verify the relationship first";
    }
    if (!formData.purposeName || !formData.purposeId) {
      newErrors.purposeName = "Certificate purpose is required";
    }
    if (!formData.paymentTypeId) {
      newErrors.paymentTypeId = "Payment type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setShowConfirmDialog(true);
    }
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);

    try {
      const payload = {
        applicant_cid: formData.applicantCID,
        applicant_name: formData.applicantName,
        relationship_to_cid: formData.relationshipToCID,
        purpose_id: formData.purposeId,
        purpose_name: formData.purposeName,
        payment_service_type_id: formData.paymentTypeId,
        payment_type_name: formData.paymentTypeName,
        payment_amount: formData.paymentAmount,
        applicant_contact_no: formData.applicantContactNumber,
      };

      console.log("=== Relationship Certificate Application ===");
      console.log("Payload:", payload);
      console.log("==========================================");

      await RelationshipApplicationService.createRelationshipApplication(
        "demo-token",
        payload,
      );

      setShowConfirmDialog(false);

      // Show success toast
      toast.success(
        "Relationship certificate application submitted successfully!",
        {
          duration: 3000,
        },
      );

      // Redirect after a brief delay
      setTimeout(() => {
        router.push("/services/relationship");
      }, 1000);
    } catch (error: any) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ServicePageLayout serviceId="relationship-services">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
          {/* Header */}
          <div className="text-center mb-8 space-y-3">
            <div className="inline-flex items-center justify-center size-16 bg-primary/10 rounded-2xl mb-4">
              <FileHeart className="size-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Relationship Certificate
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Apply for relationship certificate for marriage, divorce, or other
              legal purposes
            </p>
          </div>

          {/* Test Data Helper */}
          <div className="mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200 overflow-hidden">
              <button
                type="button"
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
                      Application Details
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
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-600 font-medium">
                          Relationship to CID:
                        </span>
                        <code className="text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded">
                          11105001234 (Father)
                        </code>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-xs text-amber-800 font-medium">
                      <span className="font-bold">Note:</span> Enter contact
                      number 17123456 and relationship CID 11105001234 (Father)
                      to verify. Select any purpose and payment type to complete
                      the application.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Card */}
          <Card className="p-6 sm:p-8 shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Applicant CID */}
              <div className="space-y-2">
                <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
                  Applicant CID <span className="text-destructive">*</span>
                </Label>
                <Input
                  value={formData.applicantCID}
                  disabled
                  className="h-11 rounded-lg bg-gray-50 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 pl-0.5">
                  Demo data - Mother's CID
                </p>
              </div>

              {/* Applicant Name */}
              <div className="space-y-2">
                <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
                  Applicant Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  value={formData.applicantName}
                  disabled
                  className="h-11 rounded-lg bg-gray-50 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 pl-0.5">
                  Demo data - Mother's name
                </p>
              </div>

              {/* Applicant Contact Number */}
              <div className="space-y-2">
                <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
                  Applicant Contact Number(Bhutanese Number){" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  value={formData.applicantContactNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 8);
                    setFormData({ ...formData, applicantContactNumber: value });
                    if (errors.applicantContactNumber) {
                      setErrors({ ...errors, applicantContactNumber: "" });
                    }
                  }}
                  placeholder="Enter applicant contact number (8 digits)"
                  maxLength={8}
                  className={`h-11 rounded-lg ${
                    errors.applicantContactNumber
                      ? "border-red-300 bg-red-50/30"
                      : ""
                  }`}
                />
                {errors.applicantContactNumber && (
                  <p className="text-destructive text-[11px] font-semibold pl-0.5">
                    {errors.applicantContactNumber}
                  </p>
                )}
              </div>

              {/* Point of Application */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-700 pl-0.5">
                  Point of Application
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Dzongkhag/Dungkhag/Thromde */}
                  <div className="space-y-2">
                    <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
                      Dzongkhag/Dungkhag/Thromde{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.point_of_application_dzongkhag}
                      onValueChange={(val) => {
                        setFormData({
                          ...formData,
                          point_of_application_dzongkhag: val,
                        });
                        if (errors.point_of_application_dzongkhag) {
                          setErrors({
                            ...errors,
                            point_of_application_dzongkhag: "",
                          });
                        }
                      }}
                    >
                      <SelectTrigger
                        className={`h-11 rounded-lg ${
                          errors.point_of_application_dzongkhag
                            ? "border-red-300 bg-red-50/30"
                            : ""
                        }`}
                      >
                        <SelectValue placeholder="Select Dzongkhag/Dungkhag/Thromde" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="thimphu">Thimphu</SelectItem>
                        <SelectItem value="paro">Paro</SelectItem>
                        <SelectItem value="punakha">Punakha</SelectItem>
                        <SelectItem value="wangdue">
                          Wangdue Phodrang
                        </SelectItem>
                        <SelectItem value="bumthang">Bumthang</SelectItem>
                        <SelectItem value="trongsa">Trongsa</SelectItem>
                        <SelectItem value="zhemgang">Zhemgang</SelectItem>
                        <SelectItem value="trashigang">Trashigang</SelectItem>
                        <SelectItem value="mongar">Mongar</SelectItem>
                        <SelectItem value="pemagatshel">
                          Pema Gatshel
                        </SelectItem>
                        <SelectItem value="lhuentse">Lhuentse</SelectItem>
                        <SelectItem value="samdrupjongkhar">
                          Samdrup Jongkhar
                        </SelectItem>
                        <SelectItem value="samtse">Samtse</SelectItem>
                        <SelectItem value="chhukha">Chhukha</SelectItem>
                        <SelectItem value="haa">Haa</SelectItem>
                        <SelectItem value="dagana">Dagana</SelectItem>
                        <SelectItem value="tsirang">Tsirang</SelectItem>
                        <SelectItem value="sarpang">Sarpang</SelectItem>
                        <SelectItem value="gasa">Gasa</SelectItem>
                        <SelectItem value="trashiyangtse">
                          Trashi Yangtse
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.point_of_application_dzongkhag && (
                      <p className="text-destructive text-[11px] font-semibold pl-0.5">
                        {errors.point_of_application_dzongkhag}
                      </p>
                    )}
                  </div>

                  {/* Gewog */}
                  <div className="space-y-2">
                    <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
                      Gewog <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.point_of_application_gewog}
                      onValueChange={(val) => {
                        setFormData({
                          ...formData,
                          point_of_application_gewog: val,
                        });
                        if (errors.point_of_application_gewog) {
                          setErrors({
                            ...errors,
                            point_of_application_gewog: "",
                          });
                        }
                      }}
                    >
                      <SelectTrigger
                        className={`h-11 rounded-lg ${
                          errors.point_of_application_gewog
                            ? "border-red-300 bg-red-50/30"
                            : ""
                        }`}
                      >
                        <SelectValue placeholder="Select Gewog" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chang">Chang</SelectItem>
                        <SelectItem value="kawang">Kawang</SelectItem>
                        <SelectItem value="genye">Genye</SelectItem>
                        <SelectItem value="lingzhi">Lingzhi</SelectItem>
                        <SelectItem value="mewang">Mewang</SelectItem>
                        <SelectItem value="naro">Naro</SelectItem>
                        <SelectItem value="soe">Soe</SelectItem>
                        <SelectItem value="dagala">Dagala</SelectItem>
                        <SelectItem value="mewang-thimphu">
                          Mewang (Thimphu)
                        </SelectItem>
                        <SelectItem value="maedwang">Maedwang</SelectItem>
                        <SelectItem value="kabisa">Kabisa</SelectItem>
                        <SelectItem value="kabji">Kabji</SelectItem>
                        <SelectItem value="lunana">Lunana</SelectItem>
                        <SelectItem value="wangchang">Wangchang</SelectItem>
                        <SelectItem value="phobji">Phobji</SelectItem>
                        <SelectItem value="athang">Athang</SelectItem>
                        <SelectItem value="bjena">Bjena</SelectItem>
                        <SelectItem value="darkar">Darkar</SelectItem>
                        <SelectItem value="kazhi">Kazhi</SelectItem>
                        <SelectItem value="phobji-wangdue">
                          Phobji (Wangdue)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.point_of_application_gewog && (
                      <p className="text-destructive text-[11px] font-semibold pl-0.5">
                        {errors.point_of_application_gewog}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Relationship to CID */}
              <div className="space-y-2">
                <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
                  Relationship to CID{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={formData.relationshipToCID}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 11);
                      setFormData({
                        ...formData,
                        relationshipToCID: value,
                      });
                      // Reset verification when CID changes
                      setRelationshipVerified(false);
                      setRelationshipExists(null);
                      if (errors.relationshipToCID) {
                        setErrors({ ...errors, relationshipToCID: "" });
                      }
                    }}
                    placeholder="Enter CID number (11 digits)"
                    maxLength={11}
                    className={`h-11 rounded-lg flex-1 ${
                      errors.relationshipToCID
                        ? "border-red-300 bg-red-50/30"
                        : ""
                    }`}
                  />
                  <Button
                    type="button"
                    onClick={handleVerifyRelationship}
                    disabled={
                      isVerifyingRelationship || !formData.relationshipToCID
                    }
                    className="h-11 px-4 rounded-lg"
                  >
                    {isVerifyingRelationship ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Search className="size-4" />
                    )}
                  </Button>
                </div>
                {errors.relationshipToCID && (
                  <p className="text-destructive text-[11px] font-semibold pl-0.5">
                    {errors.relationshipToCID}
                  </p>
                )}

                {/* Verification Messages */}
                {relationshipVerified && relationshipExists === true && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="size-4 text-green-600 shrink-0" />
                    <p className="text-sm font-semibold text-green-700">
                      Relationship Exists! You can proceed with the application.
                    </p>
                  </div>
                )}

                {relationshipVerified && relationshipExists === false && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <XCircle className="size-4 text-red-600 shrink-0" />
                    <p className="text-sm font-semibold text-red-700">
                      No relationship found. Please verify the CID and try
                      again.
                    </p>
                  </div>
                )}
              </div>

              {/* Certificate Purpose Autocomplete - Only show after verification */}
              {relationshipVerified && relationshipExists === true && (
                <>
                  <RelationshipPurposeAutocomplete
                    value={formData.purposeName}
                    onSelect={(value, selected) => {
                      setFormData({
                        ...formData,
                        purposeName: value,
                        purposeId: selected?.id || "",
                      });
                      if (errors.purposeName) {
                        setErrors({ ...errors, purposeName: "" });
                      }
                    }}
                    error={errors.purposeName}
                  />

                  {/* Payment Type Autocomplete */}
                  <PaymentTypeAutocomplete
                    value={formData.paymentTypeId}
                    onSelect={(value, selected) => {
                      setFormData({
                        ...formData,
                        paymentTypeId: value,
                        paymentTypeName: selected?.payment_type || "",
                        paymentAmount: selected?.amount || "",
                      });
                      if (errors.paymentTypeId) {
                        setErrors({ ...errors, paymentTypeId: "" });
                      }
                    }}
                    error={errors.paymentTypeId}
                  />
                </>
              )}

              {/* Information Box */}
              <div className="flex items-start gap-4 p-5 bg-blue-50/50 rounded-3xl border border-blue-100">
                <div className="size-10 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                  <AlertCircle className="size-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-blue-900">
                    Important Information
                  </p>
                  <ul className="text-xs text-blue-700 leading-relaxed font-medium space-y-1">
                    <li>• Ensure all information is accurate and complete</li>
                    <li>• Processing time: 7-14 working days</li>
                    <li>
                      • You will be notified via SMS once the certificate is
                      ready
                    </li>
                    <li>
                      • Additional documents may be required for verification
                    </li>
                  </ul>
                </div>
              </div>

              {/* Submit Button - Only show when relationship is verified as true */}
              {relationshipExists === true && (
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold rounded-lg"
                >
                  Submit Application
                </Button>
              )}
            </form>
          </Card>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="size-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="size-6 text-green-600" />
              </div>
              <AlertDialogTitle className="text-xl">
                Confirm Submission
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription asChild>
              <div className="text-base space-y-3 pt-2">
                <div>Please review your application details:</div>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      Applicant CID:
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formData.applicantCID}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      Applicant Name:
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formData.applicantName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      Contact Number:
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formData.applicantContactNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      Relationship to CID:
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formData.relationshipToCID}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      Relationship Status:
                    </span>
                    <span
                      className={`font-semibold ${relationshipExists ? "text-green-600" : "text-red-600"}`}
                    >
                      {relationshipExists ? "Verified" : "Not Found"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Purpose:</span>
                    <span className="font-semibold text-gray-900">
                      {formData.purposeName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      Payment Type:
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formData.paymentTypeName
                        .split("_")
                        .map(
                          (word) =>
                            word.charAt(0) + word.slice(1).toLowerCase(),
                        )
                        .join(" ")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      Service Fee:
                    </span>
                    <span className="font-semibold text-gray-900">
                      BTN {formData.paymentAmount}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 pt-2">
                  Are you sure you want to submit this application?
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                "Confirm & Submit"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ServicePageLayout>
  );
}
