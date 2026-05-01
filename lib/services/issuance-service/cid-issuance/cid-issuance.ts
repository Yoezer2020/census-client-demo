import { simulateApiDelay } from "@/lib/dummy-data";

const baseUrl = process.env.NEXT_PUBLIC_ISSUANCE_SERVICE_URL;

// In-memory store for submitted applications (lost on page refresh)
let submittedApplications: any[] = [];
// In-memory store for approval tasks
let approvalTasks: any[] = [];

const getMyCidIssuanceApplications = async (
  accessToken: string,
  order: "ASC" | "DESC" = "ASC",
  page: number = 1,
  take: number = 10,
  userCid?: string,
) => {
  // DEMO: Return from in-memory store
  await simulateApiDelay(500);

  // Filter to show only applications where user is the applicant
  const filteredApps = userCid
    ? submittedApplications.filter(
        (app: any) => app.applicant_cid_no === userCid,
      )
    : submittedApplications;

  return {
    data: filteredApps,
    meta: {
      page: page.toString(),
      take: take.toString(),
      itemCount: filteredApps.length,
      pageCount: Math.ceil(filteredApps.length / take),
      hasPreviousPage: false,
      hasNextPage: false,
    },
  };
};

const AddSubmittedApplication = (application: any) => {
  submittedApplications.push(application);

  // If application has parent_cid_no, create an approval task for the child
  if (application.parent_cid_no && application.cid_no) {
    const task = {
      id: `task-${Date.now()}`,
      task_type: "CID_PARENT_APPROVAL",
      assigned_cid: application.cid_no, // Child's CID
      assigned_at: new Date().toISOString(),
      application_id: application.id,
    };
    approvalTasks.push(task);
  }
};

const GetMyApprovalTasks = async (accessToken: string, userCid: string) => {
  // DEMO: Return approval tasks for this user's CID
  await simulateApiDelay(300);

  return approvalTasks.filter((task: any) => task.assigned_cid === userCid);
};

const RemoveApprovalTask = (taskId: string) => {
  approvalTasks = approvalTasks.filter((task: any) => task.id !== taskId);
};

const GetApplicationById = async (applicationId: string) => {
  // Get application by ID regardless of applicant
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

// Helper function to seed test data
const SeedTestData = () => {
  // Only seed if arrays are empty
  if (submittedApplications.length === 0) {
    // Create a test CID application where mother applied for father's CID
    const testApp = {
      id: `cid-${Date.now()}`,
      application_no: `CID-2026-TEST001`,
      applicant_cid_no: "11234567890", // Mother
      applicant_contact_no: "17123456",
      cid_no: "11105001234", // Father (child in this scenario)
      first_name: "Karma",
      middle_name: "Tenzin",
      last_name: "Dorji",
      parent_cid_no: "11234567890", // Mother is parent
      parent_contact_no: "17123456",
      payment_type_id: "1",
      parent_approval: "PENDING",
      date_of_birth: "1985-08-15",
      reasons_id: "1",
      photo_url: "demo-photo.jpg",
      place_of_collection: "Thimphu District Office",
      status: "SUBMITTED",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    submittedApplications.push(testApp);

    // Create corresponding approval task for father
    const testTask = {
      id: `task-${Date.now()}`,
      task_type: "CID_PARENT_APPROVAL",
      assigned_cid: "11105001234", // Father's CID
      assigned_at: new Date().toISOString(),
      application_id: testApp.id,
    };

    approvalTasks.push(testTask);
  }
};

const CIDIssuanceService = {
  getMyCidIssuanceApplications,
  AddSubmittedApplication,
  GetMyApprovalTasks,
  RemoveApprovalTask,
  GetApplicationById,
  UpdateApplicationStatus,
  SeedTestData,
};

export default CIDIssuanceService;
