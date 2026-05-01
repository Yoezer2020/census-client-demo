"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSessionContext } from "@/app/context/SessionContext";
import { Eye } from "lucide-react";
import { toast } from "sonner";
import ServicePageLayout from "@/app/components/layouts/ServicePageLayout";
import BirthApplicationService, {
  BirthApplication,
  ApprovalTask,
} from "@/lib/services/birth-death-service/birth-applications/birth-applications";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/app/components/ui/alert-dialog";
import { Button } from "@/app/components/ui/button";

export default function BirthRegistrationPage() {
  const { session } = useSessionContext();

  const [applications, setApplications] = useState<BirthApplication[]>([]);
  const [approvalTasks, setApprovalTasks] = useState<ApprovalTask[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [selectedTask, setSelectedTask] = useState<ApprovalTask | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<BirthApplication | null>(null);
  const [isAppDialogOpen, setIsAppDialogOpen] = useState(false);

  const handleViewDetails = (task: ApprovalTask) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };

  const handleViewApplication = (app: BirthApplication) => {
    setSelectedApplication(app);
    setIsAppDialogOpen(true);
  };

  const handleApprove = () => {
    if (!selectedTask) return;

    // Remove from current list
    setApprovalTasks((prev) => prev.filter((t) => t.id !== selectedTask.id));
    setIsDialogOpen(false);

    // Show success message
    toast.success("Application approved successfully!");
  };

  useEffect(() => {
    if (!session?.user?.cidNo) return;

    setLoadingApps(true);
    BirthApplicationService.GetMyApplications("demo-token", session.user.cidNo)
      .then(setApplications)
      .catch((err) => console.error("Failed to fetch applications:", err))
      .finally(() => setLoadingApps(false));

    setLoadingTasks(true);
    BirthApplicationService.GetMyApprovalList("demo-token", session.user.cidNo)
      .then(setApprovalTasks)
      .catch((err) => console.error("Failed to fetch approval list:", err))
      .finally(() => setLoadingTasks(false));
  }, [session?.user?.cidNo]);

  return (
    <ServicePageLayout serviceId="birth-registration">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 space-y-6">
        {/* Birth Applications Table */}
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
            Birth Applications
          </h1>
          <Link
            href="/services/birth-registration/new"
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
                  Child Name
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Date of Birth
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
                    No birth applications found.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="border-t border-gray-100">
                    <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                      {app.application_no}
                    </td>
                    <td className="px-4 py-3 text-gray-900">
                      {[app.first_name, app.middle_name, app.last_name]
                        .filter(Boolean)
                        .join(" ")}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {app.date_of_birth}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          app.status === "APPROVED"
                            ? "bg-green-50 text-green-700"
                            : app.status === "REJECTED"
                              ? "bg-red-50 text-red-700"
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
                        onClick={() => handleViewApplication(app)}
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
                    Child Name
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Task Type
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
                ) : approvalTasks.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No pending applications or tasks.
                    </td>
                  </tr>
                ) : (
                  approvalTasks.map((task) => {
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
                          {childName || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {task.task_type}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {new Date(task.assigned_at).toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(task)}
                            className="text-primary hover:text-primary/80"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Application Details Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>Birth Application Details</AlertDialogTitle>
            <AlertDialogDescription>
              Review the application details below
            </AlertDialogDescription>
          </AlertDialogHeader>

          {selectedTask?.birth_application && (
            <div className="space-y-4 text-sm">
              {/* Child Information */}
              <div className="space-y-2">
                <h3 className="font-semibold text-base text-gray-900">
                  Child Information
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <DetailItem
                    label="Application No"
                    value={selectedTask.birth_application.application_no}
                  />
                  <DetailItem
                    label="Full Name"
                    value={[
                      selectedTask.birth_application.first_name,
                      selectedTask.birth_application.middle_name,
                      selectedTask.birth_application.last_name,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  />
                  <DetailItem
                    label="Date of Birth"
                    value={selectedTask.birth_application.date_of_birth}
                  />
                  <DetailItem
                    label="Gender"
                    value={selectedTask.birth_application.gender}
                  />
                  <DetailItem
                    label="Status"
                    value={selectedTask.birth_application.status}
                  />
                </div>
              </div>

              {/* Applicant Information */}
              <div className="space-y-2">
                <h3 className="font-semibold text-base text-gray-900">
                  Applicant Information
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <DetailItem
                    label="Applicant CID"
                    value={selectedTask.birth_application.applicant_cid}
                  />
                  <DetailItem
                    label="Applicant Is"
                    value={selectedTask.birth_application.applicant_is}
                  />
                </div>
              </div>

              {/* Task Information */}
              <div className="space-y-2">
                <h3 className="font-semibold text-base text-gray-900">
                  Task Information
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <DetailItem
                    label="Task Type"
                    value={selectedTask.task_type}
                  />
                  <DetailItem
                    label="Assigned At"
                    value={new Date(selectedTask.assigned_at).toLocaleString()}
                  />
                </div>
              </div>
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleApprove}>
              Approve
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Application Details Dialog (View Only) */}
      <AlertDialog open={isAppDialogOpen} onOpenChange={setIsAppDialogOpen}>
        <AlertDialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>Birth Application Details</AlertDialogTitle>
            <AlertDialogDescription>
              View complete application information and pending actions.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {selectedApplication && (
            <div className="space-y-4 py-4">
              {/* Application Header */}
              <div className="space-y-2 border-b pb-4">
                <div className="grid grid-cols-2 gap-3">
                  <DetailItem
                    label="Application ID"
                    value={selectedApplication.application_no}
                  />
                  <div>
                    <p className="text-gray-500 text-xs">Application Status</p>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        selectedApplication.status === "APPROVED"
                          ? "bg-green-50 text-green-700"
                          : selectedApplication.status === "REJECTED"
                            ? "bg-red-50 text-red-700"
                            : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {selectedApplication.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Child Information */}
              <div className="space-y-2">
                <h3 className="font-semibold text-base text-gray-900">
                  Child Information
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <DetailItem
                    label="Full Name"
                    value={[
                      selectedApplication.first_name,
                      selectedApplication.middle_name,
                      selectedApplication.last_name,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  />
                  <DetailItem
                    label="Date of Birth"
                    value={selectedApplication.date_of_birth}
                  />
                  <DetailItem
                    label="Gender"
                    value={selectedApplication.gender}
                  />
                </div>
              </div>

              {/* Applicant Information */}
              <div className="space-y-2">
                <h3 className="font-semibold text-base text-gray-900">
                  Applicant Information
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <DetailItem
                    label="Applicant CID"
                    value={selectedApplication.applicant_cid}
                  />
                  <DetailItem
                    label="Applicant Type"
                    value={selectedApplication.applicant_is}
                  />
                </div>
              </div>

              {/* Pending Actions */}
              <div className="space-y-2 border-t pt-4">
                <h3 className="font-semibold text-base text-gray-900">
                  Pending Actions
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Father Approval
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Waiting for father&apos;s approval to complete the
                        application
                      </p>
                      {selectedApplication.father_cid && (
                        <p className="text-xs text-gray-600 mt-2 font-mono">
                          <span className="font-medium">Father CID:</span>{" "}
                          {selectedApplication.father_cid}
                        </p>
                      )}
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                        selectedApplication.status === "APPROVED"
                          ? "bg-green-50 text-green-700"
                          : selectedApplication.status === "REJECTED"
                            ? "bg-red-50 text-red-700"
                            : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {selectedApplication.status === "APPROVED"
                        ? "APPROVED"
                        : selectedApplication.status === "REJECTED"
                          ? "REJECTED"
                          : "AWAITING"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submission Info */}
              <div className="space-y-2 text-xs text-gray-500 border-t pt-4">
                <div className="flex justify-between">
                  <span>Submitted on:</span>
                  <span className="font-medium text-gray-700">
                    {selectedApplication.createdAt
                      ? new Date(selectedApplication.createdAt).toLocaleString()
                      : "N/A"}
                  </span>
                </div>
                {selectedApplication.updatedAt && (
                  <div className="flex justify-between">
                    <span>Last updated:</span>
                    <span className="font-medium text-gray-700">
                      {new Date(selectedApplication.updatedAt).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ServicePageLayout>
  );
}

// Helper component for displaying detail rows
function DetailItem({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="text-gray-900 font-medium">{value || "N/A"}</p>
    </div>
  );
}
