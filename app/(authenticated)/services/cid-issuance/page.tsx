"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSessionContext } from "@/app/context/SessionContext";
import ServicePageLayout from "@/app/components/layouts/ServicePageLayout";
import CIDIssuanceService from "@/lib/services/issuance-service/cid-issuance/cid-issuance";
import BirthApplicationService, {
  ApprovalTask,
} from "@/lib/services/birth-death-service/birth-applications/birth-applications";
import { Eye } from "lucide-react";
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
import { toast } from "sonner";

interface CIDIssuanceApplication {
  id: string;
  createdAt: string;
  updatedAt: string;
  application_no: string;
  applicant_cid_no: string;
  applicant_contact_no: string;
  cid_no: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  parent_cid_no: string | null;
  parent_contact_no: string | null;
  payment_type_id: string;
  parent_approval: string;
  date_of_birth: string;
  reasons_id: string;
  photo_url: string;
  place_of_collection: string;
  status: string;
}

interface CIDIssuanceResponse {
  data: CIDIssuanceApplication[];
  meta: {
    page: string;
    take: string;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export default function CIDIssuancePage() {
  const { session } = useSessionContext();
  // Use logged-in user's CID
  const dummyUserCID = session?.user?.cidNo || "11234567890";

  const [applications, setApplications] = useState<CIDIssuanceApplication[]>(
    [],
  );
  const [approvalTasks, setApprovalTasks] = useState<ApprovalTask[]>([]);
  const [cidApprovalTasks, setCidApprovalTasks] = useState<any[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [selectedApplication, setSelectedApplication] =
    useState<CIDIssuanceApplication | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewDetails = (app: CIDIssuanceApplication) => {
    setSelectedApplication(app);
    setIsDialogOpen(true);
  };

  const handleViewFromTask = async (task: any) => {
    // Fetch the full application by ID
    const app = await CIDIssuanceService.GetApplicationById(
      task.application_id,
    );
    if (app) {
      setSelectedApplication(app);
      setIsDialogOpen(true);
    } else {
      toast.error("Application not found");
    }
  };

  useEffect(() => {
    if (!session?.user?.cidNo) return;

    // Applications will only appear after user submits through the form

    setLoadingApps(true);
    CIDIssuanceService.getMyCidIssuanceApplications(
      "demo-token",
      "ASC",
      1,
      10,
      dummyUserCID,
    )
      .then((response: CIDIssuanceResponse) => setApplications(response.data))
      .catch((err) => console.error("Failed to fetch CID applications:", err))
      .finally(() => setLoadingApps(false));

    setLoadingTasks(true);
    // Fetch both birth approval tasks and CID approval tasks
    Promise.all([
      BirthApplicationService.GetMyApprovalList("demo-token", dummyUserCID),
      CIDIssuanceService.GetMyApprovalTasks("demo-token", dummyUserCID),
    ])
      .then(([birthTasks, cidTasks]) => {
        setApprovalTasks(birthTasks);
        setCidApprovalTasks(cidTasks);
      })
      .catch((err) => console.error("Failed to fetch approval tasks:", err))
      .finally(() => setLoadingTasks(false));
  }, [dummyUserCID, session?.user?.cidNo]);

  return (
    <ServicePageLayout serviceId="cid-issuance">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 space-y-6">
        {/* CID Applications Table */}
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
            CID Card Applications
          </h1>
          <Link
            href="/services/cid-issuance/new"
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
                  CID Number
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Submitted On
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Action
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
                    No CID issuance applications found.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="border-t border-gray-100">
                    <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                      {app.application_no}
                    </td>
                    <td className="px-4 py-3 text-gray-900 font-medium">
                      {[app.first_name, app.middle_name, app.last_name]
                        .filter(Boolean)
                        .join(" ")}
                    </td>
                    <td className="px-4 py-3 text-gray-700 font-mono text-xs">
                      {app.cid_no}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {new Date(app.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          app.status === "APPROVED"
                            ? "bg-green-50 text-green-700"
                            : app.status === "REJECTED"
                              ? "bg-red-50 text-red-700"
                              : app.status === "ASSESSED"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(app)}
                        className="text-primary hover:text-primary/80"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pending Approvals / Action Table */}
        <div className="space-y-3">
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
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {loadingTasks ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-8 text-center text-gray-400"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : approvalTasks.length === 0 &&
                  cidApprovalTasks.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No pending applications or tasks.
                    </td>
                  </tr>
                ) : (
                  <>
                    {/* Birth approval tasks */}
                    {approvalTasks.map((task) => {
                      const childName = [
                        task.birth_application?.first_name,
                        task.birth_application?.middle_name,
                        task.birth_application?.last_name,
                      ]
                        .filter(Boolean)
                        .join(" ");

                      return (
                        <tr key={task.id} className="border-t border-gray-100">
                          <td className="px-4 py-3 text-gray-900">
                            {task.task_type} {childName && `- ${childName}`}
                          </td>
                          <td className="px-4 py-3 text-gray-700">
                            {task.assigned_cid}
                          </td>
                          <td className="px-4 py-3 text-gray-700">
                            {new Date(task.assigned_at).toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-gray-400 text-xs">
                              Birth app
                            </span>
                          </td>
                        </tr>
                      );
                    })}

                    {/* CID approval tasks */}
                    {cidApprovalTasks.map((task) => {
                      return (
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
                          <td className="px-4 py-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewFromTask(task)}
                              className="text-primary hover:text-primary/80"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CID Application Details Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>CID Application Details</AlertDialogTitle>
            <AlertDialogDescription>
              Review the CID application details below
            </AlertDialogDescription>
          </AlertDialogHeader>

          {selectedApplication && (
            <div className="space-y-4 text-sm">
              {/* Application Information */}
              <div className="space-y-2">
                <h3 className="font-semibold text-base text-gray-900">
                  Application Information
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-gray-500 text-xs">Application No</p>
                    <p className="text-gray-900 font-medium">
                      {selectedApplication.application_no}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Status</p>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        selectedApplication.status === "APPROVED"
                          ? "bg-green-50 text-green-700"
                          : selectedApplication.status === "REJECTED"
                            ? "bg-red-50 text-red-700"
                            : selectedApplication.status === "ASSESSED"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {selectedApplication.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Submitted On</p>
                    <p className="text-gray-900 font-medium">
                      {new Date(
                        selectedApplication.createdAt,
                      ).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Payment Type ID</p>
                    <p className="text-gray-900 font-medium">
                      {selectedApplication.payment_type_id}
                    </p>
                  </div>
                </div>
              </div>

              {/* Applicant Information */}
              <div className="space-y-2">
                <h3 className="font-semibold text-base text-gray-900">
                  Applicant Information
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-gray-500 text-xs">Applicant CID</p>
                    <p className="text-gray-900 font-medium font-mono">
                      {selectedApplication.applicant_cid_no}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Contact Number</p>
                    <p className="text-gray-900 font-medium">
                      {selectedApplication.applicant_contact_no}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recipient/CID Holder Information */}
              <div className="space-y-2">
                <h3 className="font-semibold text-base text-gray-900">
                  CID Holder Information
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-gray-500 text-xs">Full Name</p>
                    <p className="text-gray-900 font-medium">
                      {[
                        selectedApplication.first_name,
                        selectedApplication.middle_name,
                        selectedApplication.last_name,
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">CID Number</p>
                    <p className="text-gray-900 font-medium font-mono">
                      {selectedApplication.cid_no}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Date of Birth</p>
                    <p className="text-gray-900 font-medium">
                      {selectedApplication.date_of_birth}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Collection Point</p>
                    <p className="text-gray-900 font-medium">
                      {selectedApplication.place_of_collection}
                    </p>
                  </div>
                </div>
              </div>

              {selectedApplication.parent_cid_no && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-base text-gray-900">
                    Parent Information
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-gray-500 text-xs">Parent CID</p>
                      <p className="text-gray-900 font-medium font-mono">
                        {selectedApplication.parent_cid_no}
                      </p>
                    </div>
                    {selectedApplication.parent_contact_no && (
                      <div>
                        <p className="text-gray-500 text-xs">Parent Contact</p>
                        <p className="text-gray-900 font-medium">
                          {selectedApplication.parent_contact_no}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <AlertDialogFooter>
            <Button
              onClick={() => setIsDialogOpen(false)}
              className="w-full sm:w-auto"
            >
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ServicePageLayout>
  );
}
