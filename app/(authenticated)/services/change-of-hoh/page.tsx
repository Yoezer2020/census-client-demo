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

// Helper component for displaying details
function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <p className="text-sm text-gray-900">{value || "N/A"}</p>
    </div>
  );
}

export default function ChangeOfHoHPage() {
  const { session } = useSessionContext();
  const currentUserCID = session?.user?.cidNo || "11234567890"; // Fallback to mother's CID

  const [applications, setApplications] = useState<any[]>([]);
  const [approvalTasks, setApprovalTasks] = useState<any[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewDetails = (task: any) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
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
                  <DetailItem
                    label="Application No"
                    value={selectedTask.hoh_change_application.application_no}
                  />
                  <DetailItem
                    label="Status"
                    value={selectedTask.hoh_change_application.status}
                  />
                  <DetailItem
                    label="Household No"
                    value={selectedTask.hoh_change_application.householdNo}
                  />
                  <DetailItem
                    label="House/Tharm No"
                    value={`${selectedTask.hoh_change_application.houseNo} / ${selectedTask.hoh_change_application.tharmNo}`}
                  />
                </div>
              </div>

              {/* Applicant Details */}
              <div className="space-y-2">
                <h3 className="font-semibold text-base text-gray-900">
                  Applicant Details
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <DetailItem
                    label="Applicant CID"
                    value={selectedTask.hoh_change_application.applicantCidNo}
                  />
                  <DetailItem
                    label="Contact Number"
                    value={
                      selectedTask.hoh_change_application.applicantContactNo
                    }
                  />
                  <DetailItem
                    label="Applicant Type"
                    value={selectedTask.hoh_change_application.applicantIs}
                  />
                </div>
              </div>

              {/* Current HoH */}
              <div className="space-y-2">
                <h3 className="font-semibold text-base text-gray-900">
                  Current Head of Household
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <DetailItem
                    label="Current HoH CID"
                    value={selectedTask.hoh_change_application.hohCidNo}
                  />
                </div>
              </div>

              {/* New HoH */}
              <div className="space-y-2">
                <h3 className="font-semibold text-base text-gray-900">
                  Proposed New Head of Household
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <DetailItem
                    label="New HoH CID"
                    value={selectedTask.hoh_change_application.newHohCidNo}
                  />
                  <DetailItem
                    label="Reason for Change"
                    value={
                      selectedTask.hoh_change_application.hohChangeReasonId
                    }
                  />
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  <span className="font-semibold">Note:</span> By approving this
                  application, you confirm that you agree to the change of Head
                  of Household for your household.
                </p>
              </div>
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl font-semibold">
              Cancel
            </AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleReject}
              className="rounded-xl font-semibold"
            >
              Reject
            </Button>
            <AlertDialogAction
              onClick={handleApprove}
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold"
            >
              Approve
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ServicePageLayout>
  );
}
