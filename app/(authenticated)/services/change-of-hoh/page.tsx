"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";
import { toast } from "sonner";
import { useSessionContext } from "@/app/context/SessionContext";
import ServicePageLayout from "@/app/components/layouts/ServicePageLayout";
import HohChangesService from "@/lib/services/amendment-service/hoh-changes/hoh-changes";
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

export default function ChangeOfHoHPage() {
  const { session } = useSessionContext();
  const currentUserCID = session?.user?.cidNo || "11234567890"; // Fallback to mother's CID

  const [applications, setApplications] = useState<any[]>([]);
  const [approvalTasks, setApprovalTasks] = useState<any[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<any | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAppDetailDialogOpen, setIsAppDetailDialogOpen] = useState(false);

  const handleViewDetails = (task: any) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };

  const handleViewApplication = (app: any) => {
    setSelectedApplication(app);
    setIsAppDetailDialogOpen(true);
  };

  const handleApprove = async () => {
    if (!selectedTask) return;

    try {
      await HohChangesService.ApproveTask(selectedTask.id);

      // Remove from current list
      setApprovalTasks((prev) => prev.filter((t) => t.id !== selectedTask.id));

      // Refresh applications to show updated status
      const updatedApps = await HohChangesService.GetMyHohChangeApplications(
        "demo-token",
        currentUserCID,
      );
      setApplications(
        Array.isArray(updatedApps)
          ? updatedApps
          : (updatedApps as any)?.data || [],
      );

      setIsDialogOpen(false);

      // Show success message
      toast.success("Application approved successfully!");
    } catch (err) {
      console.error("Failed to approve:", err);
      toast.error("Failed to approve application");
    }
  };

  const handleReject = async () => {
    if (!selectedTask) return;

    try {
      await HohChangesService.RejectTask(selectedTask.id);

      // Remove from current list
      setApprovalTasks((prev) => prev.filter((t) => t.id !== selectedTask.id));

      // Refresh applications to show updated status
      const updatedApps = await HohChangesService.GetMyHohChangeApplications(
        "demo-token",
        currentUserCID,
      );
      setApplications(
        Array.isArray(updatedApps)
          ? updatedApps
          : (updatedApps as any)?.data || [],
      );

      setIsDialogOpen(false);

      // Show error/rejection message
      toast.error("Application rejected");
    } catch (err) {
      console.error("Failed to reject:", err);
      toast.error("Failed to reject application");
    }
  };

  useEffect(() => {
    if (!currentUserCID) return;

    setLoadingApps(true);
    HohChangesService.GetMyHohChangeApplications("demo-token", currentUserCID)
      .then((data: any) => {
        setApplications(Array.isArray(data) ? data : data?.data || []);
      })
      .catch((err) => console.error("Failed to fetch applications:", err))
      .finally(() => setLoadingApps(false));

    // Fetch approval tasks for the current logged-in user
    setLoadingTasks(true);
    HohChangesService.GetMyApprovalList("demo-token", currentUserCID)
      .then((tasks: any) => {
        setApprovalTasks(Array.isArray(tasks) ? tasks : tasks?.data || []);
      })
      .catch((err) => console.error("Failed to fetch approval tasks:", err))
      .finally(() => setLoadingTasks(false));
  }, [currentUserCID]);

  return (
    <ServicePageLayout serviceId="change-of-hoh">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 space-y-6">
        {/* Change of HOH Applications Table */}
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
            Change of Head of Household Applications
          </h1>
          <Link
            href="/services/change-of-hoh/new"
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
                  Application No.
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Applicant CID
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  New HoH CID
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Household No
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Submitted At
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
                    colSpan={7}
                    className="px-4 py-8 text-center text-gray-400"
                  >
                    Loading...
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No change of head of household applications found.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="border-t border-gray-100">
                    <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                      {app.application_no || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-gray-900 font-mono text-xs">
                      {app.applicantCidNo || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-gray-900 font-mono text-xs">
                      {app.newHohCidNo || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-gray-700 font-mono text-xs">
                      {app.householdNo || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {app.createdAt
                        ? new Date(app.createdAt).toLocaleString("en-GB")
                        : "N/A"}
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

        {/* Pending Actions Table */}
        <div className="space-y-3">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Pending Actions
            <span className="ml-2 text-sm font-normal text-gray-500">
              (Household Member Approvals)
            </span>
          </h2>

          <div className="overflow-x-auto border border-gray-100 rounded-xl">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Application No
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    New HoH CID
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
                      colSpan={5}
                      className="px-4 py-8 text-center text-gray-400"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : approvalTasks.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No pending approvals.
                    </td>
                  </tr>
                ) : (
                  approvalTasks.map((task) => (
                    <tr key={task.id} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                        {task.hoh_change_application?.application_no || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-gray-900 font-mono text-xs">
                        {task.hoh_change_application?.newHohCidNo || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {task.task_type}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {new Date(task.assigned_at).toLocaleString("en-GB")}
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Approval Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Change of HoH Application Details
            </AlertDialogTitle>
            <AlertDialogDescription>
              Review the application details and approve or reject
            </AlertDialogDescription>
          </AlertDialogHeader>

          {selectedTask?.hoh_change_application && (
            <div className="space-y-4 text-sm">
              {/* Application Information */}
              <div className="space-y-2">
                <h3 className="font-semibold text-base text-gray-900">
                  Application Information
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-gray-500 text-xs">Application No</p>
                    <p className="text-gray-900 font-medium font-mono">
                      {selectedTask.hoh_change_application.application_no}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Status</p>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        selectedTask.hoh_change_application.status ===
                        "APPROVED"
                          ? "bg-green-50 text-green-700"
                          : selectedTask.hoh_change_application.status ===
                              "REJECTED"
                            ? "bg-red-50 text-red-700"
                            : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {selectedTask.hoh_change_application.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Household No</p>
                    <p className="text-gray-900 font-medium font-mono">
                      {selectedTask.hoh_change_application.householdNo}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">House/Tharm No</p>
                    <p className="text-gray-900 font-medium">
                      {selectedTask.hoh_change_application.houseNo} /{" "}
                      {selectedTask.hoh_change_application.tharmNo}
                    </p>
                  </div>
                </div>
              </div>

              {/* Applicant Details */}
              <div className="space-y-2">
                <h3 className="font-semibold text-base text-gray-900">
                  Applicant Details
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-gray-500 text-xs">Applicant CID</p>
                    <p className="text-gray-900 font-medium font-mono">
                      {selectedTask.hoh_change_application.applicantCidNo}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Contact Number</p>
                    <p className="text-gray-900 font-medium">
                      {selectedTask.hoh_change_application.applicantContactNo}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Applicant Type</p>
                    <p className="text-gray-900 font-medium capitalize">
                      {selectedTask.hoh_change_application.applicantIs?.replace(
                        /_/g,
                        " ",
                      ) || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Current HoH */}
              <div className="space-y-2">
                <h3 className="font-semibold text-base text-gray-900">
                  Current Head of Household
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-gray-500 text-xs">Current HoH CID</p>
                    <p className="text-gray-900 font-medium font-mono">
                      {selectedTask.hoh_change_application.hohCidNo}
                    </p>
                  </div>
                </div>
              </div>

              {/* New HoH */}
              <div className="space-y-2">
                <h3 className="font-semibold text-base text-gray-900">
                  Proposed New Head of Household
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-gray-500 text-xs">New HoH CID</p>
                    <p className="text-gray-900 font-medium font-mono">
                      {selectedTask.hoh_change_application.newHohCidNo}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Reason for Change</p>
                    <p className="text-gray-900 font-medium">
                      {selectedTask.hoh_change_application.hohChangeReasonId ||
                        "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Approval Note */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-900 font-semibold mb-2">
                  🔔 Your Approval Required
                </p>
                <p className="text-xs text-amber-800 leading-relaxed">
                  By approving this application, you confirm that you agree to
                  the change of Head of Household for household{" "}
                  <strong>
                    {selectedTask.hoh_change_application.householdNo}
                  </strong>
                  . The household headship will transfer from{" "}
                  <span className="font-mono">
                    {selectedTask.hoh_change_application.hohCidNo}
                  </span>{" "}
                  to{" "}
                  <span className="font-mono">
                    {selectedTask.hoh_change_application.newHohCidNo}
                  </span>
                  .
                </p>
              </div>
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleReject}
              className="mr-2"
            >
              Reject
            </Button>
            <AlertDialogAction onClick={handleApprove}>
              Approve
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Application Details Dialog (for applicants viewing their own application) */}
      {/* Application Details Dialog (for applicants viewing their own application) */}
      <AlertDialog
        open={isAppDetailDialogOpen}
        onOpenChange={setIsAppDetailDialogOpen}
      >
        <AlertDialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Change of HoH Application Details
            </AlertDialogTitle>
            <AlertDialogDescription>
              Review your application details and approval status
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
                    <p className="text-gray-900 font-medium font-mono">
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
                            : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {selectedApplication.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Household No</p>
                    <p className="text-gray-900 font-medium font-mono">
                      {selectedApplication.householdNo}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Submitted On</p>
                    <p className="text-gray-900 font-medium">
                      {new Date(
                        selectedApplication.createdAt,
                      ).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Current & New HoH */}
              <div className="space-y-2">
                <h3 className="font-semibold text-base text-gray-900">
                  Household Head Change
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-gray-500 text-xs">Current HoH CID</p>
                    <p className="text-gray-900 font-medium font-mono">
                      {selectedApplication.hohCidNo}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">New HoH CID</p>
                    <p className="text-gray-900 font-medium font-mono">
                      {selectedApplication.newHohCidNo}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500 text-xs">Reason for Change</p>
                    <p className="text-gray-900 font-medium">
                      {selectedApplication.hohChangeReasonId || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Applicant Details */}
              <div className="space-y-2">
                <h3 className="font-semibold text-base text-gray-900">
                  Applicant Information
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-gray-500 text-xs">Applicant CID</p>
                    <p className="text-gray-900 font-medium font-mono">
                      {selectedApplication.applicantCidNo}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Contact Number</p>
                    <p className="text-gray-900 font-medium">
                      {selectedApplication.applicantContactNo}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Applicant Type</p>
                    <p className="text-gray-900 font-medium capitalize">
                      {selectedApplication.applicantIs?.replace(/_/g, " ") ||
                        "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pending Approvals - Only show if applicant is viewing their own pending application */}
              {selectedApplication.applicantCidNo === currentUserCID &&
                (selectedApplication.status === "PENDING" ||
                  selectedApplication.status === "SUBMITTED") && (
                  <div className="border border-gray-200 rounded-xl p-4 bg-gradient-to-br from-blue-50/50 to-white">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <span className="text-lg">⏳</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">
                          Pending Approvals
                        </h4>
                        <p className="text-xs text-gray-600">
                          Awaiting action from household members
                        </p>
                      </div>
                    </div>

                    {/* Approval Cards */}
                    <div className="space-y-3">
                      {/* New HoH Approval */}
                      <div className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-semibold text-gray-900">
                                New Head of Household Consent
                              </span>
                              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-800">
                                Required
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 mb-2">
                              Proposed new HoH must accept the responsibility
                            </p>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-xs font-semibold text-blue-700">
                                KD
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-900">
                                  Karma Tenzin Dorji
                                </p>
                                <p className="text-xs text-gray-500 font-mono">
                                  11105001234
                                </p>
                              </div>
                            </div>
                          </div>
                          <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
                            ⏳ Pending
                          </span>
                        </div>
                      </div>

                      {/* Household Member 1 */}
                      <div className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-semibold text-gray-900">
                                Household Member Verification
                              </span>
                              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                                1 of 3
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 mb-2">
                              Member verification and consent
                            </p>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center text-xs font-semibold text-indigo-700">
                                SD
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-900">
                                  Sonam Dorji
                                </p>
                                <p className="text-xs text-gray-500 font-mono">
                                  11209876543
                                </p>
                              </div>
                            </div>
                          </div>
                          <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
                            ⏳ Pending
                          </span>
                        </div>
                      </div>

                      {/* Household Member 2 */}
                      <div className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-semibold text-gray-900">
                                Household Member Verification
                              </span>
                              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                                2 of 3
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 mb-2">
                              Member verification and consent
                            </p>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center text-xs font-semibold text-pink-700">
                                TC
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-900">
                                  Tashi Choden
                                </p>
                                <p className="text-xs text-gray-500 font-mono">
                                  11398765432
                                </p>
                              </div>
                            </div>
                          </div>
                          <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
                            ⏳ Pending
                          </span>
                        </div>
                      </div>

                      {/* Household Member 3 */}
                      <div className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-semibold text-gray-900">
                                Household Member Verification
                              </span>
                              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                                3 of 3
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 mb-2">
                              Member verification and consent
                            </p>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-xs font-semibold text-purple-700">
                                PD
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-900">
                                  Pema Dema
                                </p>
                                <p className="text-xs text-gray-500 font-mono">
                                  11287654321
                                </p>
                              </div>
                            </div>
                          </div>
                          <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
                            ⏳ Pending
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Info Footer */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">💡</span>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Once all household members approve, your application
                          will automatically change to{" "}
                          <span className="font-semibold text-gray-900">
                            SUBMITTED
                          </span>{" "}
                          status and proceed for final processing by the
                          authorities.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              {/* Note for Approvers */}
              {selectedApplication.newHohCidNo === currentUserCID &&
                (selectedApplication.status === "PENDING" ||
                  selectedApplication.status === "SUBMITTED") && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm text-amber-900 font-semibold mb-2">
                      🔔 Your Consent Required
                    </p>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      You have been proposed as the new Head of Household for
                      household{" "}
                      <strong>{selectedApplication.householdNo}</strong>. Please
                      review the application in the "Pending Actions" section
                      below to approve or reject this request.
                    </p>
                  </div>
                )}
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
