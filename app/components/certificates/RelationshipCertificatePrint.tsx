"use client";

import { useState } from "react";
import { Download, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface RelationshipApplication {
  id: string;
  application_no: string;
  applicant_name: string;
  applicant_cid: string;
  relationship_to_cid: string;
  relationship_to_name: string;
  application_status: string;
  purpose: {
    name: string;
  };
}

interface RelationshipCertificatePrintProps {
  application: RelationshipApplication;
  onClose?: () => void;
}

export default function RelationshipCertificatePrint({
  application,
  onClose,
}: RelationshipCertificatePrintProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const imageUrl =
        "/assets/images/certificates/relationshipCertificate.jpg";
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `relationship-certificate-${application.application_no}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading certificate:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Relationship Certificate
            </h2>
            <p className="text-sm text-gray-500">
              {application.applicant_name} - {application.application_no}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Certificate Preview */}
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="flex justify-center">
            <img
              src="/assets/images/certificates/relationshipCertificate.jpg"
              alt="Relationship Certificate"
              className="max-w-full h-auto shadow-lg"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-white">
          <Button variant="outline" onClick={onClose} className="rounded-xl">
            Cancel
          </Button>
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            className="rounded-xl bg-primary text-white hover:opacity-90 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {isDownloading ? "Downloading..." : "Download"}
          </Button>
        </div>
      </div>
    </div>
  );
}
