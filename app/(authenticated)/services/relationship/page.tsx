"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download } from "lucide-react";
import ServicePageLayout from "@/app/components/layouts/ServicePageLayout";
import RelationshipCertificatePrint from "@/app/components/certificates/RelationshipCertificatePrint";
import RelationshipApplicationService from "@/lib/services/issuance-service/relationship-application/relationship-application";

interface RelationshipApplication {
  id: string;
  application_no: string;
  applicant_name: string;
  applicant_cid: string;
  applicant_contact_no: string;
  relationship_to_cid: string;
  relationship_to_name: string;
  purpose_id: string;
  payment_type_id: string | null;
  payment_service_type_id: string;
  application_status: string;
  createdAt: string;
  purpose: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

export default function BirthRegistrationPage() {
  const [applications, setApplications] = useState<RelationshipApplication[]>(
    [],
  );
  const [loadingApps, setLoadingApps] = useState(true);
  const [selectedApplication, setSelectedApplication] =
    useState<RelationshipApplication | null>(null);

  useEffect(() => {
    setLoadingApps(true);
    RelationshipApplicationService.getApplicationsForRelationship("demo-token")
      .then((response) => {
        setApplications(response.data);
      })
      .catch((err) => {
        console.error("Failed to fetch applications:", err);
        setApplications([]);
      })
      .finally(() => setLoadingApps(false));
  }, []);

  const handleDownloadCertificate = (app: RelationshipApplication) => {
    setSelectedApplication(app);
  };

  return (
    <>
      {selectedApplication && (
        <RelationshipCertificatePrint
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}
      <ServicePageLayout serviceId="birth-registration">
        <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 space-y-6">
          {/* Relationship Applications Table */}
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              Relationship Certificate Applications
            </h1>
            <Link
              href="/services/relationship/new"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Submit New Application
            </Link>
          </div>

          <div className="overflow-x-auto border border-gray-100 rounded-xl">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Application No
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Applicant Name
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Purpose
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Date of Submission
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loadingApps ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-gray-400"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : applications.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No relationship applications found.
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                        {app.application_no}
                      </td>
                      <td className="px-4 py-3 text-gray-900">
                        {app.applicant_name}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {app.purpose.name}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {new Date(app.createdAt).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            app.application_status === "APPROVED"
                              ? "bg-green-50 text-green-700"
                              : app.application_status === "REJECTED"
                                ? "bg-red-50 text-red-700"
                                : "bg-yellow-50 text-yellow-700"
                          }`}
                        >
                          {app.application_status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {app.application_status === "APPROVED" && (
                          <button
                            onClick={() => handleDownloadCertificate(app)}
                            className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-medium text-sm"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </ServicePageLayout>
    </>
  );
}
