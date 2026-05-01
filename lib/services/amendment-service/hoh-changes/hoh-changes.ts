import { simulateApiDelay } from "@/lib/dummy-data";

// In-memory store for submitted applications
let submittedApplications: any[] = [];
let approvalTasks: any[] = [];

// Seed some test data on initialization
const seedTestData = () => {
  if (submittedApplications.length === 0) {
    // Create a test application submitted by another household member (not mother/father)
    // This way it won't show in mother's applications, but father will still see the pending action
    const testApplication = {
      id: "hoh-seed-001",
      application_no: "HOH-2026-DEMO001",
      applicantContactNo: "17987654",
      applicantCidNo: "11209876543", // Different household member (not mother or father)
      applicantIs: "Family",
      householdNo: "HH-2024-001",
      hohCidNo: "11234567890", // Current HoH is mother
      houseNo: "H-123",
      tharmNo: "T-456",
      dzongkhagId: "1",
      gewogId: "1",
      chiwogId: "1",
      villageId: "1",
      newHohCidNo: "11105001234", // Proposing father as new HoH
      firstName: "Karma",
      middleName: "Tenzin",
      lastName: "Dorji",
      hohChangeReasonId: "Resignation",
      status: "PENDING",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    };

    submittedApplications.push(testApplication);

    // Create approval task for father
    const testTask = {
      id: "task-seed-001",
      application_id: testApplication.id,
      assigned_to_cid: "11105001234", // Father's CID
      task_type: "HOH Change Approval",
      status: "PENDING",
      assigned_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      hoh_change_application: testApplication,
    };

    approvalTasks.push(testTask);
  }
};

// Seed data on module load
seedTestData();

export interface CreateHohChangePayload {
  applicantContactNo: string;
  applicantCidNo: string;
  applicantIs: string;
  householdNo: string;
  hohCidNo: string;
  houseNo: string;
  tharmNo: string;
  dzongkhagId: string;
  gewogId: string;
  chiwogId: string;
  villageId: string;
  newHohCidNo: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  hohChangeReasonId: string;
  nationality?: string;
}

const CreateHohChange = async (
  accessToken: string,
  payload: CreateHohChangePayload,
): Promise<any> => {
  await simulateApiDelay(800);

  const applicationNo = `HOH-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  const application = {
    id: `hoh-${Date.now()}`,
    application_no: applicationNo,
    ...payload,
    status: "PENDING",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  submittedApplications.push(application);

  // Create approval task for household members (for demo, assign to father)
  const task = {
    id: `task-${Date.now()}`,
    application_id: application.id,
    assigned_to_cid: "11105001234", // Father's CID
    task_type: "HOH Change Approval",
    status: "PENDING",
    assigned_at: new Date().toISOString(),
    hoh_change_application: application,
  };
  approvalTasks.push(task);

  return {
    success: true,
    data: application,
    message: "Change of Head of Household application submitted successfully",
  };
};

const GetMyHohChangeApplications = async (
  accessToken: string,
  userCid?: string,
): Promise<any[]> => {
  await simulateApiDelay(500);

  // Filter by user's CID if provided
  const filteredApps = userCid
    ? submittedApplications.filter(
        (app: any) =>
          app.applicantCidNo === userCid || app.applicant_cid_no === userCid,
      )
    : submittedApplications;

  return filteredApps;
};

const GetApplicationById = async (applicationId: string) => {
  await simulateApiDelay(100);
  return submittedApplications.find((app: any) => app.id === applicationId);
};

const UpdateApplicationStatus = (applicationId: string, status: string) => {
  const appIndex = submittedApplications.findIndex(
    (app: any) => app.id === applicationId,
  );
  if (appIndex !== -1) {
    submittedApplications[appIndex].status = status;
    submittedApplications[appIndex].updatedAt = new Date().toISOString();
  }
};

const GetMyApprovalList = async (
  accessToken: string,
  userCid: string,
): Promise<any[]> => {
  await simulateApiDelay(300);

  // Return approval tasks assigned to this CID (household members who need to approve)
  return approvalTasks.filter(
    (task: any) =>
      task.assigned_to_cid === userCid && task.status === "PENDING",
  );
};

const ApproveTask = async (taskId: string): Promise<void> => {
  await simulateApiDelay(500);

  const taskIndex = approvalTasks.findIndex((t: any) => t.id === taskId);
  if (taskIndex !== -1) {
    approvalTasks[taskIndex].status = "APPROVED";
    approvalTasks[taskIndex].approved_at = new Date().toISOString();

    // Update application status to APPROVED
    const applicationId = approvalTasks[taskIndex].application_id;
    UpdateApplicationStatus(applicationId, "APPROVED");
  }
};

const HohChangesService = {
  CreateHohChange,
  GetMyHohChangeApplications,
  GetApplicationById,
  UpdateApplicationStatus,
  GetMyApprovalList,
  ApproveTask,
};

export default HohChangesService;
