"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSessionContext } from "@/app/context/SessionContext";
import ServicePageLayout from "@/app/components/layouts/ServicePageLayout";
import MoveInOutApplicationService from "@/lib/services/nrm_service/move-in-out/move-in-out";
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

export default function MoveInMoveOutPage() {
  const { session } = useSessionContext();
  const dummyUserCID = session?.user?.cidNo || "11234567890";

  const [applications, setApplications] = useState<any[]>([]);
  const [approvalTasks, setApprovalTasks] = useState<any[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<any | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewDetails = (app: any) => {
    setSelectedApplication(app);
    setIsDialogOpen(true);
  };

  const handleViewFromTask = async (task: any) => {
    // Fetch the full application by ID
    const app = await MoveInOutApplicationService.GetApplicationById(
      task.application_id,
    );
    if (app) {
      setSelectedApplication(app);
      setIsDialogOpen(true);
    } else {
      toast.error("Application not found");
    }
  };

  const handleApprove = () => {
    if (!selectedApplication) return;

    // Update application status in master list
    MoveInOutApplicationService.UpdateApplicationStatus(
      selectedApplication.id,
      "APPROVED",
    );

    // Update local state
    const updatedApp = { ...selectedApplication, status: "APPROVED" };
    setApplications((prev) =>
      prev.map((app) => (app.id === selectedApplication.id ? updatedApp : app)),
    );

    // Remove from approval tasks
    setApprovalTasks((prev) =>
      prev.filter((task) => task.application_id !== selectedApplication.id),
    );

    setIsDialogOpen(false);
    toast.success("Move in/out application approved successfully!");
  };

  const handleReject = () => {
    if (!selectedApplication) return;

    // Update application status in master list
    MoveInOutApplicationService.UpdateApplicationStatus(
      selectedApplication.id,
      "REJECTED",
    );

    // Update local state
    const updatedApp = { ...selectedApplication, status: "REJECTED" };
    setApplications((prev) =>
      prev.map((app) => (app.id === selectedApplication.id ? updatedApp : app)),
    );

    // Remove from approval tasks
    setApprovalTasks((prev) =>
      prev.filter((task) => task.application_id !== selectedApplication.id),
    );

    setIsDialogOpen(false);
    toast.error("Move in/out application rejected");
  };

  useEffect(() => {
    if (!session?.user?.cidNo) return;

    // Note: SeedTestData removed - table starts empty until applications are submitted

    setLoadingApps(true);
    MoveInOutApplicationService.getMyMoveInOutApplications(
      "demo-token",
      dummyUserCID,
    )
      .then((data: any) => {
        setApplications(Array.isArray(data) ? data : data?.data || []);
      })
      .catch((err) => console.error("Failed to fetch applications:", err))
      .finally(() => setLoadingApps(false));

    setLoadingTasks(true);
    MoveInOutApplicationService.getMyMoveInOutApprovalTaskList(
      "demo-token",
      dummyUserCID,
    )
      .then((data: any) => {
        setApprovalTasks(Array.isArray(data) ? data : data?.data || []);
      })
      .catch((err) => console.error("Failed to fetch approval list:", err))
      .finally(() => setLoadingTasks(false));
  }, [session?.user?.cidNo, dummyUserCID]);

  return (
    <ServicePageLayout serviceId="move-in-move-out">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 space-y-6">
        {/* Move In/Move Out Applications Table */}
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
            Move In / Move Out Applications
          </h1>
          <Link
            href="/services/move-in-move-out/new"
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
                  Applicant Name
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Move Type
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
                    No move in/move out applications found.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="border-t border-gray-100">
                    <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                      {app.application_no || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-gray-900">
                      {app.applicantName || app.name || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-gray-700 capitalize">
                      {app.moveType?.replace(/_/g, " ") || "N/A"}
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
                    Household No.
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    CID
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Relation
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
                {loadingTasks ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-gray-400"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : approvalTasks.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No pending approval tasks.
                    </td>
                  </tr>
                ) : (
                  approvalTasks.map((task) => (
                    <tr key={task.id} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-gray-900 font-mono text-xs">
                        {task.household_no}
                      </td>
                      <td className="px-4 py-3 text-gray-700 font-mono text-xs">
                        {task.cid}
                      </td>
                      <td className="px-4 py-3 text-gray-900">{task.name}</td>
                      <td className="px-4 py-3 text-gray-700">
                        {task.relation}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            task.status === "APPROVED"
                              ? "bg-green-50 text-green-700"
                              : task.status === "REJECTED"
                                ? "bg-red-50 text-red-700"
                                : "bg-yellow-50 text-yellow-700"
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {task.application_id ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewFromTask(task)}
                            className="text-primary hover:text-primary/80"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        ) : (
                          <span className="text-gray-400 text-xs">
                            No action
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
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
            <AlertDialogTitle>Move In/Out Application Details</AlertDialogTitle>
            <AlertDialogDescription>
              Review the move in/out application details below
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
                            : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {selectedApplication.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Move Type</p>
                    <p className="text-gray-900 font-medium capitalize">
                      {selectedApplication.moveType?.replace(/_/g, " ") ||
                        "N/A"}
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

              {/* Applicant Information */}
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
                    <p className="text-gray-500 text-xs">Applicant Name</p>
                    <p className="text-gray-900 font-medium">
                      {selectedApplication.applicantName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Contact Number</p>
                    <p className="text-gray-900 font-medium">
                      {selectedApplication.applicantContactNo}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">
                      Current Household No
                    </p>
                    <p className="text-gray-900 font-medium">
                      {selectedApplication.currentHouseholdNo}
                    </p>
                  </div>
                </div>
              </div>

              {/* Current Location */}
              <div className="space-y-2">
                <h3 className="font-semibold text-base text-gray-900">
                  Current Location
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-gray-500 text-xs">Dzongkhag</p>
                    <p className="text-gray-900 font-medium">
                      {selectedApplication.currentDzongkhag || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Gewog</p>
                    <p className="text-gray-900 font-medium">
                      {selectedApplication.currentGewog || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Village</p>
                    <p className="text-gray-900 font-medium">
                      {selectedApplication.currentVillage || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Move-In Location */}
              <div className="space-y-2">
                <h3 className="font-semibold text-base text-gray-900">
                  Move-In Location
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-gray-500 text-xs">Dzongkhag</p>
                    <p className="text-gray-900 font-medium">
                      {selectedApplication.moveInDzongkhag || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Gewog</p>
                    <p className="text-gray-900 font-medium">
                      {selectedApplication.moveInGewog || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Village</p>
                    <p className="text-gray-900 font-medium">
                      {selectedApplication.moveInVillage || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {selectedApplication?.status === "SUBMITTED" && (
              <>
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
              </>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ServicePageLayout>
  );
}
