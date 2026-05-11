"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  FileText,
  AlertCircle,
  CheckCircle2,
  Search,
  Loader2,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Mock delay helper
const simulateApiDelay = (ms: number = 800) =>
  new Promise((resolve) => setTimeout(resolve, ms));
import ServicePageLayout from "@/app/components/layouts/ServicePageLayout";
import { Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
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
import PaymentTypeAutocomplete from "@/app/components/forms/nationality-certificate/PaymentTypeAutocomplete";
import NationalityApplicationService from "@/lib/services/issuance-service/nationality-applications/nationality-applications";

export default function NationalityCertificateNewPage() {
  const router = useRouter();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showDummyData, setShowDummyData] = useState(true);
  const [isLoadingMinor, setIsLoadingMinor] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock user data (Mother's credentials)
  const mockUserCID = "11234567890";
  const mockUserName = "Pema Deki Wangmo";
  const mockContactNo = "17123456";
  const mockMinorCID = "11234567891"; // Mock child CID
  const mockMinorName = "Sonam Deki Wangmo";
  const mockMinorDOB = "2015-05-15";
  const [formData, setFormData] = useState({
    applicant_is: "",
    applicant_cid_no: mockUserCID,
    applicant_contact_no: "",
    point_of_application_dzongkhag: "",
    point_of_application_gewog: "",
    guardian_acknowledgment: false,
    minor_cid: "",
    minor_name: "",
    dob: "",
    half_photo: null as File | null,
    half_photo_preview: "",
    payment_service_type_id: "",
    paymentTypeName: "",
    paymentAmount: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-fetch minor details when applicant_is becomes "minor"
  useEffect(() => {
    const fetchMinorDetailsForSelf = async () => {
      if (formData.applicant_is === "minor") {
        console.log("=== useEffect: Fetching minor details for self ===");

        setIsLoadingMinor(true);
        try {
          // Simulate API delay
          await simulateApiDelay(800);

          // Mock: Use mother's mock data as minor
          setFormData((prev) => ({
            ...prev,
            minor_cid: mockUserCID,
            minor_name: mockUserName,
            dob: "1990-01-15", // Mother's DOB
          }));
          console.log("Minor details updated successfully");
        } catch (error) {
          console.error("Error fetching minor details:", error);
          toast.error("Failed to fetch minor details. Please try again.");
        } finally {
          setIsLoadingMinor(false);
        }
      }
    };

    fetchMinorDetailsForSelf();
  }, [formData.applicant_is]);

  const fetchMinorDetails = async (cidNo: string) => {
    setIsLoadingMinor(true);
    try {
      // Simulate API delay
      await simulateApiDelay(800);

      // Mock: If searching for mock child CID, return child data
      if (cidNo === mockMinorCID) {
        setFormData((prev) => ({
          ...prev,
          minor_cid: mockMinorCID,
          minor_name: mockMinorName,
          dob: mockMinorDOB,
        }));
        toast.success("Minor details loaded successfully!");
      } else {
        toast.error("No citizen found with this CID. Try " + mockMinorCID);
      }
    } catch (error) {
      console.error("Error fetching minor details:", error);
      toast.error("Failed to fetch minor details. Please try again.");
    } finally {
      setIsLoadingMinor(false);
    }
  };

  const handleSearchMinor = async () => {
    if (!formData.minor_cid) {
      setErrors({ ...errors, minor_cid: "Please enter minor CID" });
      return;
    }

    fetchMinorDetails(formData.minor_cid);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          half_photo: file,
          half_photo_preview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.applicant_is) {
      newErrors.applicant_is = "Please select applicant type";
    }
    if (!formData.applicant_cid_no) {
      newErrors.applicant_cid_no = "Applicant CID is required";
    }
    if (!formData.applicant_contact_no) {
      newErrors.applicant_contact_no = "Contact number is required";
    } else if (!/^\d{8}$/.test(formData.applicant_contact_no)) {
      newErrors.applicant_contact_no = "Invalid contact number (8 digits)";
    }
    if (!formData.point_of_application_dzongkhag) {
      newErrors.point_of_application_dzongkhag =
        "Please select Dzongkhag/Dungkhag/Thromde.";
    }
    if (!formData.point_of_application_gewog) {
      newErrors.point_of_application_gewog = "Please select Gewog.";
    }
    if (
      formData.applicant_is === "guardian" &&
      !formData.guardian_acknowledgment
    ) {
      newErrors.guardian_acknowledgment =
        "You must acknowledge your responsibility as a guardian.";
    }
    if (!formData.minor_cid) {
      newErrors.minor_cid = "Minor CID is required";
    }
    if (!formData.minor_name) {
      newErrors.minor_name = "Minor name is required";
    }
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }
    if (!formData.half_photo) {
      newErrors.half_photo = "Half photo is required";
    }
    if (!formData.payment_service_type_id) {
      newErrors.payment_service_type_id = "Payment type is required";
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
      const applicantIsValue =
        formData.applicant_is === "minor" ? "OPERATOR" : "PARENT";

      const payload = {
        applicant_is: applicantIsValue,
        applicant_cid_no: formData.applicant_cid_no,
        applicant_contact_no: formData.applicant_contact_no,
        minor_cid: formData.minor_cid,
        minor_name: formData.minor_name,
        dob: formData.dob,
        payment_service_type_id: formData.payment_service_type_id,
        certificate: formData.half_photo ? [formData.half_photo] : [],
      };

      await NationalityApplicationService.CreateNationalityApplication(
        "demo-token",
        payload,
      );

      toast.success(
        "Nationality certificate application submitted successfully!",
      );
      setShowConfirmDialog(false);

      // Reset form
      setFormData({
        applicant_is: "",
        applicant_cid_no: mockUserCID,
        applicant_contact_no: "",
        point_of_application_dzongkhag: "",
        point_of_application_gewog: "",
        guardian_acknowledgment: false,
        minor_cid: "",
        minor_name: "",
        dob: "",
        half_photo: null,
        half_photo_preview: "",
        payment_service_type_id: "",
        paymentTypeName: "",
        paymentAmount: "",
      });

      // Redirect after 1 second
      setTimeout(() => {
        router.push("/services/nationality-certificate");
      }, 1000);
    } catch (error: any) {
      console.error("Error submitting nationality application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ServicePageLayout serviceId="nationality-certificate">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
          {/* Header */}
          <div className="text-center mb-8 space-y-3">
            <div className="inline-flex items-center justify-center size-16 bg-primary/10 rounded-2xl mb-4">
              <FileText className="size-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Nationality Certificate
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Apply for nationality certificate for minors and dependents
            </p>
          </div>

          {/* Form Card */}
          <Card className="p-6 sm:p-8 shadow-sm border border-gray-100">
            {/* Test Data Helper Section */}
            <div className="mb-6 rounded-lg overflow-hidden border border-blue-200">
              <button
                type="button"
                onClick={() => setShowDummyData(!showDummyData)}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <Info className="size-5 text-blue-600" />
                  <span className="font-semibold text-gray-700">
                    Test Data Helper
                  </span>
                </div>
                {showDummyData ? (
                  <ChevronUp className="size-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                ) : (
                  <ChevronDown className="size-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                )}
              </button>

              {showDummyData && (
                <div className="p-4 bg-white border-t border-blue-100 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="bg-blue-50/50 p-3 rounded-lg">
                      <p className="text-gray-500 text-xs mb-1">
                        Applicant (Mother)
                      </p>
                      <p className="font-mono font-semibold text-gray-900">
                        {mockUserCID}
                      </p>
                      <p className="text-gray-600 text-xs mt-1">
                        {mockUserName}
                      </p>
                    </div>
                    <div className="bg-blue-50/50 p-3 rounded-lg">
                      <p className="text-gray-500 text-xs mb-1">
                        Contact Number
                      </p>
                      <p className="font-mono font-semibold text-gray-900">
                        {mockContactNo}
                      </p>
                    </div>
                    <div className="bg-blue-50/50 p-3 rounded-lg">
                      <p className="text-gray-500 text-xs mb-1">Minor CID</p>
                      <p className="font-mono font-semibold text-gray-900">
                        {mockMinorCID}
                      </p>
                      <p className="text-gray-600 text-xs mt-1">
                        {mockMinorName}
                      </p>
                    </div>
                    <div className="bg-blue-50/50 p-3 rounded-lg">
                      <p className="text-gray-500 text-xs mb-1">
                        Minor Date of Birth
                      </p>
                      <p className="font-mono font-semibold text-gray-900">
                        {mockMinorDOB}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-gray-600 bg-amber-50 p-2 rounded border border-amber-200">
                    <Info className="size-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p>
                      <strong>Tip:</strong> Select "Parent" as applicant type
                      and search for minor CID {mockMinorCID} to load the
                      child's details.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Applicant Type */}
              <div className="space-y-2">
                <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
                  Applicant Type <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.applicant_is}
                  onValueChange={(val) => {
                    // For parent/guardian, reset minor fields
                    // For minor (self), don't reset - let useEffect populate them
                    if (val === "parent" || val === "guardian") {
                      setFormData({
                        ...formData,
                        applicant_is: val,
                        applicant_cid_no: mockUserCID,
                        minor_cid: "",
                        minor_name: "",
                        dob: "",
                      });
                    } else {
                      // For minor (self), only update applicant fields
                      setFormData({
                        ...formData,
                        applicant_is: val,
                        applicant_cid_no: mockUserCID,
                      });
                    }

                    if (errors.applicant_is) {
                      setErrors({ ...errors, applicant_is: "" });
                    }
                  }}
                >
                  <SelectTrigger
                    className={`h-11 rounded-lg ${
                      errors.applicant_is ? "border-red-300 bg-red-50/30" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select applicant type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minor">Minor (Self)</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="guardian">Guardian</SelectItem>
                  </SelectContent>
                </Select>
                {errors.applicant_is && (
                  <p className="text-destructive text-[11px] font-semibold pl-0.5">
                    {errors.applicant_is}
                  </p>
                )}
              </div>

              {/* Applicant CID - Always show and always use session CID */}
              {formData.applicant_is && (
                <div className="space-y-2">
                  <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
                    Applicant CID <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    value={formData.applicant_cid_no}
                    disabled
                    className="h-11 rounded-lg bg-gray-50 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 pl-0.5">
                    Auto-filled from your session
                  </p>
                </div>
              )}

              {/* Applicant Name - Always show for all applicant types */}
              {formData.applicant_is && (
                <div className="space-y-2">
                  <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
                    Applicant Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    value={mockUserName}
                    disabled
                    className="h-11 rounded-lg bg-gray-50 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 pl-0.5">
                    Auto-filled from test data
                  </p>
                </div>
              )}

              {/* Applicant Contact Number */}
              <div className="space-y-2">
                <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
                  Applicant Contact Number{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  value={formData.applicant_contact_no}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 8);
                    setFormData({ ...formData, applicant_contact_no: value });
                    if (errors.applicant_contact_no) {
                      setErrors({ ...errors, applicant_contact_no: "" });
                    }
                  }}
                  placeholder="Enter contact number"
                  maxLength={8}
                  className={`h-11 rounded-lg ${
                    errors.applicant_contact_no
                      ? "border-red-300 bg-red-50/30"
                      : ""
                  }`}
                />
                {errors.applicant_contact_no && (
                  <p className="text-destructive text-[11px] font-semibold pl-0.5">
                    {errors.applicant_contact_no}
                  </p>
                )}
              </div>

              {/* Guardian Acknowledgment */}
              {formData.applicant_is === "guardian" && (
                <div className="space-y-3">
                  <div
                    className={`p-4 rounded-xl border-2 transition-all ${
                      errors.guardian_acknowledgment
                        ? "border-red-300 bg-red-50/30"
                        : "border-amber-200 bg-amber-50/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="guardian_acknowledgment"
                        checked={formData.guardian_acknowledgment}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            guardian_acknowledgment: e.target.checked,
                          });
                          if (errors.guardian_acknowledgment) {
                            setErrors({
                              ...errors,
                              guardian_acknowledgment: "",
                            });
                          }
                        }}
                        className="mt-1 size-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                      />
                      <label
                        htmlFor="guardian_acknowledgment"
                        className="text-sm font-medium text-gray-900 leading-relaxed cursor-pointer flex-1"
                      >
                        I acknowledge that as a guardian, I take full
                        responsibility and ownership of the child, as the
                        parents of the child have passed away.
                        <span className="text-destructive ml-1">*</span>
                      </label>
                    </div>
                  </div>
                  {errors.guardian_acknowledgment && (
                    <p className="text-destructive text-[11px] font-semibold pl-0.5">
                      {errors.guardian_acknowledgment}
                    </p>
                  )}
                </div>
              )}

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

              {/* Divider */}
              {formData.applicant_is && (
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      Minor Details
                    </span>
                  </div>
                </div>
              )}

              {/* Minor CID - with search button if NOT minor applicant */}
              {formData.applicant_is && formData.applicant_is !== "minor" && (
                <div className="space-y-2">
                  <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
                    Minor CID <span className="text-destructive">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={formData.minor_cid}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 11);
                        setFormData({ ...formData, minor_cid: value });
                        if (errors.minor_cid) {
                          setErrors({ ...errors, minor_cid: "" });
                        }
                      }}
                      placeholder="Enter CID number"
                      maxLength={11}
                      className={`h-11 rounded-lg flex-1 ${
                        errors.minor_cid ? "border-red-300 bg-red-50/30" : ""
                      }`}
                    />
                    <Button
                      type="button"
                      onClick={handleSearchMinor}
                      disabled={isLoadingMinor}
                      className="h-11 px-4 rounded-lg"
                    >
                      {isLoadingMinor ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Search className="size-4" />
                      )}
                    </Button>
                  </div>
                  {errors.minor_cid && (
                    <p className="text-destructive text-[11px] font-semibold pl-0.5">
                      {errors.minor_cid}
                    </p>
                  )}
                </div>
              )}

              {/* Minor CID - disabled if IS minor applicant */}
              {formData.applicant_is === "minor" && (
                <div className="space-y-2">
                  <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
                    Minor CID <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      value={formData.minor_cid}
                      disabled
                      className="h-11 rounded-lg bg-gray-50 cursor-not-allowed"
                    />
                    {isLoadingMinor && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Loader2 className="size-4 animate-spin text-primary" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 pl-0.5">
                    {isLoadingMinor
                      ? "Fetching your details..."
                      : "Auto-filled from your session"}
                  </p>
                </div>
              )}

              {/* Minor Name */}
              {formData.applicant_is && (
                <div className="space-y-2">
                  <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
                    Minor Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    value={formData.minor_name}
                    disabled
                    className="h-11 rounded-lg bg-gray-50 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 pl-0.5">
                    {isLoadingMinor
                      ? "Loading..."
                      : formData.minor_name
                        ? "Auto-filled from citizen database"
                        : "Search by CID to auto-fill"}
                  </p>
                </div>
              )}

              {/* Date of Birth */}
              {formData.applicant_is && (
                <div className="space-y-2">
                  <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
                    Date of Birth <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    value={formData.dob}
                    disabled
                    className="h-11 rounded-lg bg-gray-50 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 pl-0.5">
                    {isLoadingMinor
                      ? "Loading..."
                      : formData.dob
                        ? "Auto-filled from citizen database"
                        : "Search by CID to auto-fill"}
                  </p>
                </div>
              )}

              {/* Payment Type Autocomplete */}
              {formData.applicant_is && (
                <PaymentTypeAutocomplete
                  value={formData.payment_service_type_id}
                  onSelect={(value, selected) => {
                    setFormData({
                      ...formData,
                      payment_service_type_id: value,
                      paymentTypeName: selected?.payment_type || "",
                      paymentAmount: selected?.amount
                        ? String(selected.amount)
                        : "",
                    });
                    if (errors.payment_service_type_id) {
                      setErrors({ ...errors, payment_service_type_id: "" });
                    }
                  }}
                  error={errors.payment_service_type_id}
                />
              )}

              {/* Half Photo Upload */}
              {formData.applicant_is && (
                <div className="space-y-2">
                  <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
                    Half Photo <span className="text-destructive">*</span>
                  </Label>
                  <div
                    className={`relative aspect-[4/3] max-w-sm rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-6 bg-gray-50/50 group overflow-hidden ${
                      errors.half_photo
                        ? "border-red-300 bg-red-50/30"
                        : "border-gray-200 hover:border-primary hover:bg-primary/5"
                    }`}
                  >
                    {formData.half_photo_preview ? (
                      <>
                        <img
                          src={formData.half_photo_preview}
                          alt="Half Photo Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                          <div className="bg-white/90 p-3 rounded-full shadow-lg">
                            <FileText className="size-6 text-primary" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center space-y-3">
                        <div className="size-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto text-gray-400 group-hover:text-primary transition-colors">
                          <FileText className="size-8" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">
                            Click to Upload Photo
                          </p>
                          <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">
                            JPG, PNG (Max 5MB)
                          </p>
                        </div>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                    />
                  </div>
                  {errors.half_photo && (
                    <p className="text-destructive text-[11px] font-semibold pl-0.5">
                      {errors.half_photo}
                    </p>
                  )}
                </div>
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
                    <li>• Processing time: 14-21 working days</li>
                    <li>
                      • You will be notified via SMS once the certificate is
                      ready
                    </li>
                    <li>
                      • The certificate will be available for collection at your
                      local office
                    </li>
                  </ul>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold rounded-lg"
              >
                Submit Application
              </Button>
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
                      Applicant Type:
                    </span>
                    <span className="font-semibold text-gray-900 capitalize">
                      {formData.applicant_is === "minor"
                        ? "Minor (Self)"
                        : formData.applicant_is}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      Applicant CID:
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formData.applicant_cid_no}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      Contact Number:
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formData.applicant_contact_no}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      Minor CID:
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formData.minor_cid}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      Minor Name:
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formData.minor_name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      Date of Birth:
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formData.dob}
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
