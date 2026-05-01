"use client";

import { Card } from "@/app/components/ui/card";
import {
  Check,
  User,
  MapPin,
  Camera,
  ShieldCheck,
  CheckCircle,
  Users,
  AlertCircle,
  CreditCard,
  Phone,
  Calendar,
} from "lucide-react";
import { CIDIssuanceData } from "@/lib/validations/cid-issuance.schema";
import { cn } from "@/lib/utils";

interface Step5ReviewProps {
  data: Partial<CIDIssuanceData>;
  updateData: (data: Partial<CIDIssuanceData>) => void;
}

export default function Step5Review({ data, updateData }: Step5ReviewProps) {
  const sections = [
    {
      title: "Applicant Information",
      icon: User,
      fields: [
        { label: "Applicant Type", value: data.applicantType?.toUpperCase() },
        { label: "Applicant CID", value: data.applicantCID || data.cid_no },
        {
          label: "Applicant Contact",
          value: data.applicantPhoneNumber || data.applicant_contact_no,
        },
        ...(data.applicantType === "parent"
          ? [
              { label: "Parent CID", value: data.parent_cid_no },
              { label: "Parent Contact", value: data.parent_contact_no },
            ]
          : []),
      ],
    },
    {
      title: "Recipient Details",
      icon: ShieldCheck,
      fields: [
        { label: "First Name", value: data.first_name },
        { label: "Middle Name", value: data.middle_name || "N/A" },
        { label: "Last Name", value: data.last_name },
        { label: "Date of Birth", value: data.date_of_birth },
        { label: "Recipient CID", value: data.cid_no },
      ],
    },
    {
      title: "Service & Payment",
      icon: CreditCard,
      fields: [
        { label: "Application Type", value: data.application_type },
        ...(data.application_type?.toLowerCase().includes("replacement")
          ? [{ label: "Replacement Reason", value: data.replacementReason }]
          : []),
      ],
    },
    {
      title: "Collection & Documents",
      icon: MapPin,
      fields: [
        { label: "Collection Point", value: data.collectionPoint },
        { label: "Application Reason", value: data.reasonName },
      ],
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 flex items-start gap-4">
        <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
          <CheckCircle className="size-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Final Review</h3>
          <p className="text-sm text-gray-600">
            Please verify all information before official submission. All fields
            below will be submitted to the CID Issuance System.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <Card
            key={section.title}
            className="p-6 border-gray-100 shadow-sm space-y-4"
          >
            <h4 className="font-bold text-gray-900 flex items-center gap-2">
              <section.icon className="size-4 text-primary" /> {section.title}
            </h4>
            <div className="space-y-4">
              {section.fields.map((field) => (
                <div
                  key={field.label}
                  className="flex justify-between items-start gap-4 pb-2 border-b border-gray-50 last:border-0 last:pb-0"
                >
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {field.label}
                  </span>
                  <span className="text-sm font-semibold text-gray-700 text-right break-words">
                    {field.value || "N/A"}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Photo Review */}
      <Card className="p-6 border-gray-100 shadow-sm space-y-4">
        <h4 className="font-bold text-gray-900 flex items-center gap-2">
          <Camera className="size-4 text-primary" /> Uploaded Passport Photo
        </h4>
        <div className="flex justify-center">
          <div className="space-y-2 w-full max-w-xs">
            <div className="aspect-[3/4] rounded-2xl bg-gray-50 border overflow-hidden relative group">
              {data.photoUrl || data.photo_url ? (
                <>
                  <img
                    src={data.photoUrl || data.photo_url}
                    alt="Passport Photo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1.5 shadow-lg">
                    <Check className="size-4" strokeWidth={3} />
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <div className="text-center">
                    <Camera className="size-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No Photo Uploaded</p>
                  </div>
                </div>
              )}
            </div>
            <p className="text-[10px] text-center font-bold text-gray-400 uppercase">
              Passport Photo (JPEG Format)
            </p>
          </div>
        </div>
      </Card>

      {/* Data Validation Warning */}
      {(!data.payment_type_id ||
        !data.reasons_id ||
        !data.place_of_collection ||
        !data.photoUrl) && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
          <AlertCircle className="size-5 text-red-600 mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-red-900 mb-2">
              Missing Required Information
            </p>
            <ul className="text-xs text-red-700 space-y-1">
              {!data.payment_type_id && (
                <li>• Application Type (Payment Type) is required</li>
              )}
              {!data.reasons_id && <li>• Application Reason is required</li>}
              {!data.place_of_collection && (
                <li>• Collection Point is required</li>
              )}
              {!data.photoUrl && <li>• Passport Photo is required</li>}
            </ul>
          </div>
        </div>
      )}

      {/* Submission Rules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <ShieldCheck className="size-4" /> Minors
          </div>
          <p className="text-[11px] text-gray-500 leading-relaxed italic">
            Applications for minors under 18 must be authorized by a registered
            parent or legal guardian.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Users className="size-4" /> Authorized Guardians
          </div>
          <p className="text-[11px] text-gray-500 leading-relaxed italic">
            Automated cross-check for deceased parents will verify authorized
            guardians against DCRC records.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <AlertCircle className="size-4" /> Document Verification
          </div>
          <p className="text-[11px] text-gray-500 leading-relaxed italic">
            All submitted documents and photos will be verified against original
            records before approval.
          </p>
        </div>
      </div>

      {/* Final Terms & Conditions */}
      <div className="pt-6 border-t border-gray-100">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 p-4 rounded-2xl hover:bg-gray-50 transition-all border border-gray-100 cursor-pointer group shadow-sm active:scale-[0.98]">
            <input
              id="reviewAgreed"
              type="checkbox"
              checked={data.reviewAgreed || false}
              onChange={(e) => updateData({ reviewAgreed: e.target.checked })}
              className="size-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer shrink-0"
            />
            <label
              htmlFor="reviewAgreed"
              className="text-sm font-normal text-gray-900 cursor-pointer select-none flex-1"
            >
              I agree to the terms and conditions and certify that the
              information provided is true and accurate to the best of my
              knowledge. <span className="text-red-500">*</span>
            </label>
          </div>

          <Card className="bg-primary/5 border-primary/10 rounded-2xl">
            <div className="p-4 text-sm font-medium text-primary text-center">
              I hereby declare that all the information provided in this
              application is true and correct. I understand that any false
              statements or misrepresentation may result in the rejection of my
              application and legal action under the Citizenship Act of Bhutan.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
