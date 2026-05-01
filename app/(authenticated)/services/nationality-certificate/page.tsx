"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download } from "lucide-react";
import ServicePageLayout from "@/app/components/layouts/ServicePageLayout";
import NationalityApplicationService, {
  NationalityApplication,
} from "@/lib/services/issuance-service/nationality-applications/nationality-applications";
import NationalityCertificatePrint from "@/app/components/certificates/NationalityCertificatePrint";

export default function NationalityCertificatePage() {
  const [applications, setApplications] = useState<NationalityApplication[]>(
    [],
  );
  const [loadingApps, setLoadingApps] = useState(true);
  const [selectedApplication, setSelectedApplication] =
    useState<NationalityApplication | null>(null);

  useEffect(() => {
    setLoadingApps(true);
    NationalityApplicationService.GetMyNationalityApplications("demo-token")
      .then(setApplications)
      .catch((err) => console.error("Failed to fetch applications:", err))
      .finally(() => setLoadingApps(false));
  }, []);

  const handleDownloadCertificate = (app: NationalityApplication) => {
    setSelectedApplication(app);
  };

  return (
    <>
      {selectedApplication && (
        <NationalityCertificatePrint
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}
      <ServicePageLayout serviceId="nationality-certificate">
        <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 space-y-6">
          {/* Nationality Certificate Applications Table */}
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              Nationality Certificate Applications
            </h1>
            <Link
              href="/services/nationality-certificate/new"
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
                      colSpan={5}
                      className="px-4 py-8 text-center text-gray-400"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : applications.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No nationality certificate applications found.
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                        {app.application_no}
                      </td>
                      <td className="px-4 py-3 text-gray-900">
                        {app.minor_name}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {new Date(app.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            app.application_status === "APPROVED"
                              ? "bg-green-50 text-green-700"
                              : app.application_status === "REJECTED"
                                ? "bg-red-50 text-red-700"
                                : app.application_status === "ASSESSED"
                                  ? "bg-blue-50 text-blue-700"
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
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/5 rounded-lg transition-colors"
                            title="Download Certificate"
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
