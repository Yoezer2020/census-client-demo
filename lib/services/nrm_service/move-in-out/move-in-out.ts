import { simulateApiDelay } from "@/lib/dummy-data";

// In-memory store for submitted applications
let submittedApplications: any[] = [];
let approvalTasks: any[] = [];

const CreateMoveInOutApplication = async (
  accessToken: string,
  payload: any,
): Promise<any> => {
  await simulateApiDelay(800);

  const applicationNo = `MIO-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  const application = {
    id: `mio-${Date.now()}`,
    application_no: applicationNo,
    ...payload,
    status: "SUBMITTED",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  submittedApplications.push(application);

  return {
    success: true,
    data: application,
    message: "Move in/out application submitted successfully",
  };
};

const PostHouseholdMembersToMoveWithApplication = async (
  accessToken: string,
  payload: any,
): Promise<any> => {
  await simulateApiDelay(500);

  // Store household members who need approval
  if (Array.isArray(payload)) {
    payload.forEach((member: any) => {
      const task = {
        id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        ...member,
        status: "PENDING",
        created_at: new Date().toISOString(),
      };
      approvalTasks.push(task);
    });
  }

  return {
    success: true,
    message: "Household members recorded successfully",
  };
};

const GetMyMoveInOutApplications = async (
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

const GetMyMoveInOutApprovalTaskList = async (
  accessToken: string,
  userCid?: string,
): Promise<any[]> => {
  await simulateApiDelay(300);

  // Filter tasks by user's CID
  return userCid
    ? approvalTasks.filter((task: any) => task.cid === userCid)
    : approvalTasks;
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

const UpdateApprovalTaskStatus = (taskId: string, status: string) => {
  const taskIndex = approvalTasks.findIndex((task: any) => task.id === taskId);
  if (taskIndex !== -1) {
    approvalTasks[taskIndex].status = status;
  }
};

const SeedTestData = () => {
  if (submittedApplications.length === 0) {
    // Create a test move-in-out application
    const testApp = {
      id: `mio-${Date.now()}`,
      application_no: `MIO-2026-TEST001`,
      applicantCidNo: "11234567890", // Mother
      applicantName: "Pema Deki Wangmo",
      applicantContactNo: "17123456",
      currentHouseholdNo: "HH-001-2024",
      currentDzongkhagId: "1",
      currentDzongkhag: "Thimphu",
      currentGewogId: "101",
      currentGewog: "Changzamtok",
      currentVillageId: "1001",
      currentVillage: "Motithang",
      moveInDzongkhagId: "2",
      moveInDzongkhag: "Paro",
      moveInGewogId: "201",
      moveInGewog: "Shaba",
      moveInVillageId: "2001",
      moveInVillage: "Bondey",
      moveType: "existing_household",
      status: "SUBMITTED",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    submittedApplications.push(testApp);

    // Create approval task for father
    const testTask = {
      id: `task-${Date.now()}`,
      household_no: "HH-001-2024",
      cid: "11105001234", // Father
      name: "Karma Tenzin Dorji",
      relation: "Spouse",
      status: "PENDING",
      application_id: testApp.id,
      created_at: new Date().toISOString(),
    };

    approvalTasks.push(testTask);
  }
};

const MoveInOutApplicationService = {
  createMoveInOutApplication: CreateMoveInOutApplication,
  postHouseholdMembers: PostHouseholdMembersToMoveWithApplication,
  getMyMoveInOutApplications: GetMyMoveInOutApplications,
  getMyMoveInOutApprovalTaskList: GetMyMoveInOutApprovalTaskList,
  GetApplicationById,
  UpdateApplicationStatus,
  UpdateApprovalTaskStatus,
  SeedTestData,
};

export default MoveInOutApplicationService;
