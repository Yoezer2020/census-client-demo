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
    // Create a test move-in-out application from another household member
    const testApp = {
      id: `mio-seed-001`,
      application_no: `MIO-2026-SEED001`,
      applicantCidNo: "11209876543", // Different household member
      applicantName: "Tashi Wangchuk",
      applicantContactNo: "17987654",
      currentHouseholdNo: "HH-2024-001",
      currentHohCidNo: "11105001234", // Father is current HoH
      currentDzongkhagId: "1",
      currentDzongkhag: "Thimphu",
      currentGewogId: "101",
      currentGewog: "Chang Gewog",
      currentChiwogId: "1",
      currentChiwog: "Chiwog 1",
      currentVillageId: "1001",
      currentVillage: "Motithang",
      moveInDzongkhagId: "2",
      moveInDzongkhag: "Paro",
      moveInGewogId: "201",
      moveInGewog: "Doteng Gewog",
      moveInChiwogId: "5",
      moveInChiwog: "Chiwog 5",
      moveInVillageId: "2001",
      moveInVillage: "Satsam",
      moveType: "new_household",
      willBecomeHoh: true,
      status: "PENDING",
      createdAt: new Date("2026-04-15T10:30:00").toISOString(),
      updatedAt: new Date("2026-04-15T10:30:00").toISOString(),
    };

    submittedApplications.push(testApp);

    // Create approval task for father (current HoH) - Relieving HoH approval
    const testTask = {
      id: `task-seed-father-001`,
      household_no: "HH-2024-001",
      cid: "11105001234", // Father (current HoH)
      name: "Karma Tenzin Dorji",
      relation: "Head of Household",
      task_type: "RELIEVING_HOH_APPROVAL",
      task_description:
        "Approve member leaving household and becoming new HoH elsewhere",
      status: "PENDING",
      application_id: testApp.id,
      application_no: testApp.application_no,
      applicant_name: testApp.applicantName,
      applicant_cid: testApp.applicantCidNo,
      move_from: `${testApp.currentVillage}, ${testApp.currentGewog}, ${testApp.currentDzongkhag}`,
      move_to: `${testApp.moveInVillage}, ${testApp.moveInGewog}, ${testApp.moveInDzongkhag}`,
      move_type: "New Household",
      created_at: new Date("2026-04-15T10:30:00").toISOString(),
    };

    approvalTasks.push(testTask);
  }
};

// Initialize seed data on module load
SeedTestData();

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
