"use client";

import { useState } from "react";
import { Upload, FileText, X, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { BirthRegistrationData } from "@/lib/validations/birth-registration.schema";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";

interface StepProps {
  data: Partial<BirthRegistrationData>;
  updateData: (data: Partial<BirthRegistrationData>) => void;
  errors: Record<string, string>;
}

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  preview?: string;
}

export default function Step9Attachments({
  data,
  updateData,
  errors,
}: StepProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(
    data.certificate || [],
  );
  const isRequired = data.is_epis_registered === false;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: UploadedFile[] = [];

    Array.from(files).forEach((file) => {
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Maximum size is 5MB.`);
        return;
      }

      // Check file type
      const allowedTypes = [
        "image/svg+xml",
        "image/png",
        "image/jpeg",
        "application/pdf",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error(`${file.name} is not a supported file type.`);
        return;
      }

      newFiles.push({
        name: file.name,
        size: file.size,
        type: file.type,
      });
    });

    const updated = [...uploadedFiles, ...newFiles];
    setUploadedFiles(updated);
    updateData({ certificate: updated });
  };

  const handleRemoveFile = (index: number) => {
    const updated = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updated);
    updateData({ certificate: updated });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-1 sm:space-y-2">
        <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
          Attachments: Birth Certificate
        </h3>
        <p className="text-sm sm:text-base text-gray-500">
          Upload any supporting documents (
          {isRequired ? (
            <span className="text-destructive font-bold">Required</span>
          ) : (
            "Optional"
          )}
          )
        </p>
      </div>

      <div className="border-2 border-dashed border-gray-100 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-all bg-gray-50/50 group">
        {uploadedFiles.length === 0 ? (
          <>
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3 sm:mb-4 text-primary group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={2.5} />
            </div>
            <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-1">
              Click to upload files
            </h4>
            <p className="text-gray-500 text-sm mb-6 max-w-xs">
              SVG, PNG, JPG or PDF documents up to 5MB each.
            </p>
          </>
        ) : (
          <div className="w-full space-y-4 mb-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-2">
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                Recently Uploaded{" "}
                <span className="text-primary bg-primary/10 px-2 py-0.5 rounded-full text-[10px]">
                  {uploadedFiles.length}
                </span>
              </h4>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                Max 5MB per file
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-100 rounded-xl p-3 flex items-center justify-between group/item hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile(index);
                    }}
                    className="h-8 w-8 hover:bg-destructive/10 text-gray-300 hover:text-destructive rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Label htmlFor="file-upload" className="cursor-pointer">
          <input
            id="file-upload"
            type="file"
            multiple
            accept=".svg,.png,.jpg,.jpeg,.pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            variant="outline"
            className="rounded-xl px-8 h-12 bg-white font-bold border-2"
            asChild
          >
            <span>
              {uploadedFiles.length > 0 ? "Add More Files" : "Select Files"}
            </span>
          </Button>
        </Label>

        {uploadedFiles.length > 0 && (
          <p className="text-gray-400 text-[10px] mt-4 font-medium italic">
            Sorted by most recent. Supported: SVG, PNG, JPG, PDF.
          </p>
        )}

        {errors.certificate && (
          <p className="text-destructive text-[10px] mt-4 font-bold bg-destructive/10 px-3 py-1.5 rounded-lg animate-in zoom-in duration-300">
            {errors.certificate}
          </p>
        )}
      </div>

      {/* Ready to Submit */}
      <Card className="bg-green-500/5 border-green-200/50 overflow-hidden relative shadow-none">
        <div className="absolute top-0 left-0 w-1 h-full" />
        <CardContent className="p-3 sm:p-4 flex items-start gap-3">
          <div>
            <h5 className="text-sm sm:text-base font-bold text-green-900">
              Ready to Submit
            </h5>
            <p className="text-[11px] sm:text-xs text-green-800 leading-snug font-medium mt-0.3">
              Please review your information before final submission. By
              clicking Submit, you confirm that all provided details are
              accurate.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
