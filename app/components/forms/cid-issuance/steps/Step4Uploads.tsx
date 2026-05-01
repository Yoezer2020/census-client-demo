"use client";

import { useState } from "react";
import { Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Camera, Upload, Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { CIDIssuanceData } from "@/lib/validations/cid-issuance.schema";
import CidApplicationReasonAutocomplete from "../components/CidApplicationReasonAutocomplete";
import CidCollectionPointAutocomplete from "../components/CidCollectionPointAutocomplete";

interface Step4UploadsProps {
  data: Partial<CIDIssuanceData>;
  updateData: (data: Partial<CIDIssuanceData>) => void;
  errors: Record<string, string>;
}

export default function Step4Uploads({
  data,
  updateData,
  errors,
}: Step4UploadsProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "image/jpeg") {
        alert("Please upload a JPEG image.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        updateData({ photoUrl: result, photo_url: result });
        setPhotoPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2 mb-4">
        <h3 className="text-2xl font-bold text-gray-900">
          Document Upload & Collection
        </h3>
        <p className="text-gray-500">
          Upload required documents and select your collection point
        </p>
      </div>

      {/* Reason for Application - Autocomplete */}
      <div className="max-w-md mx-auto">
        <CidApplicationReasonAutocomplete
          value={data.reasonName || ""}
          onSelect={(value, selected) => {
            updateData({
              reasonName: value,
              reasons_id: selected?.id,
            });
          }}
          error={errors.reasonName}
        />
      </div>

      {/* Collection Point Selection */}
      <div className="max-w-md mx-auto">
        <CidCollectionPointAutocomplete
          value={data.collectionPoint || ""}
          onSelect={(value, selected) => {
            updateData({
              collectionPoint: value as CIDIssuanceData["collectionPoint"],
              place_of_collection: selected?.id,
            });
          }}
          error={errors.collectionPoint}
        />
      </div>

      {/* Photo Upload */}
      <div className="max-w-md mx-auto space-y-4">
        <Label className="text-base font-bold text-gray-700 flex items-center gap-2">
          <Camera className="size-4 text-primary" /> Passport Photo{" "}
          <span className="text-red-500">*</span>
        </Label>
        <div
          className={cn(
            "relative aspect-[3/4] rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-4 bg-gray-50/50 group overflow-hidden",
            errors.photoUrl
              ? "border-red-300 bg-red-50/30"
              : "border-gray-200 hover:border-primary hover:bg-primary/5",
          )}
        >
          {photoPreview ? (
            <>
              <img
                src={photoPreview}
                alt="Photo Preview"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <div className="bg-white/90 p-3 rounded-full shadow-lg">
                  <Upload className="size-6 text-primary" />
                </div>
              </div>
            </>
          ) : (
            <div className="text-center space-y-3">
              <div className="size-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto text-gray-400 group-hover:text-primary transition-colors">
                <Camera className="size-8" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">
                  Click to Upload Photo
                </p>
                <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">
                  JPEG Format Only
                </p>
              </div>
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleFileUpload}
          />
        </div>
        {errors.photoUrl && (
          <p className="text-red-500 text-xs font-bold text-center">
            {errors.photoUrl}
          </p>
        )}
      </div>

      <div className="flex items-start gap-4 p-5 bg-blue-50/50 rounded-3xl border border-blue-100">
        <div className="size-10 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
          <Info className="size-5" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-blue-900">
            Document Requirements
          </p>
          <p className="text-xs text-blue-700 leading-relaxed font-medium">
            Please ensure your passport photo is recent, clear, and meets the
            official DCRC requirements. You can collect your CID from the
            selected office after verification.
          </p>
        </div>
      </div>
    </div>
  );
}
