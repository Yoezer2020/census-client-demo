"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ServicePageLayout from "@/app/components/layouts/ServicePageLayout";

import DeathApplicationService from "@/lib/services/birth-death-service/death-applications/death-applications";

export default function DeathRegistrationPage() {
  // DEMO: Use dummy data
  const dummyUserCID = "11234567890"; // Mother's CID

  const [applications, setApplications] = useState<any[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);

  useEffect(() => {
    setLoadingApps(true);
    DeathApplicationService.GetMyDeathApplications("demo-token", dummyUserCID)
      .then(setApplications)
      .catch((err) => console.error("Failed to fetch applications:", err))
      .finally(() => setLoadingApps(false));
  }, []);

  return (
    <ServicePageLayout serviceId="death-registration">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 space-y-6">
        {/* Birth Applications Table */}
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
            Death Register Applications
          </h1>
          <Link
            href="/services/death-registration/new"
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
                  Application ID
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Deceased Name
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Date of Death
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {loadingApps ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-gray-400"
                  >
                    Loading...
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No death register applications found.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="border-t border-gray-100">
                    <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                      {app.application_no || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-gray-900">
                      {[
                        app.first_name || app.deceased_first_name,
                        app.middle_name || app.deceased_middle_name,
                        app.last_name || app.deceased_last_name,
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {app.date_of_death || app.date_of_birth || "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          app.status === "APPROVED"
                            ? "bg-green-50 text-green-700"
                            : app.status === "REJECTED"
                              ? "bg-red-50 text-red-700"
                              : app.status === "SUBMITTED"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pending Approvals / Action Table */}
        {/* <div className="space-y-3">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Pending Actions
          </h2>

          <div className="overflow-x-auto border border-gray-100 rounded-xl">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Task Type
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Assigned CID
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Assigned At
                  </th>
                </tr>
              </thead>
              <tbody>
                {loadingTasks ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-8 text-center text-gray-400"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : approvalTasks.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No pending applications or tasks.
                    </td>
                  </tr>
                ) : (
                  approvalTasks.map((task) => (
                    <tr key={task.id} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-gray-900">
                        {task.task_type}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {task.assigned_cid}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {new Date(task.assigned_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div> */}
      </div>
    </ServicePageLayout>
  );
}
