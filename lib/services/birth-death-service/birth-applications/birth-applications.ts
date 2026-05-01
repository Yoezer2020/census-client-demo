import { simulateApiDelay } from "@/lib/dummy-data";

const serviceBaseUrl = process.env.NEXT_PUBLIC_BIRTH_DEATH_SERVICE_URL;

// In-memory store for submitted applications (lost on page refresh)
let submittedApplications: any[] = [];

export interface BirthApplication {
  application_no: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  applicant_cid: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  status: string;
  applicant_is: string;
  father_approval: string;
  mother_approval: string;
  hoh_approval: string;
  guarantor_approval: string;
  father_cid?: string;
  mother_cid?: string;
}

export interface ApprovalTask {
  id: string;
  createdAt: string;
  updatedAt: string;
  application_id: string;
  assigned_cid: string;
  task_type: string;
  assigned_at: string;
  birth_application: BirthApplication;
}

const GetMyApplications = async (
  accessToken: string,
  userCid?: string,
): Promise<BirthApplication[]> => {
  // DEMO: Return from in-memory store
  await simulateApiDelay(150);

  // Filter by current user's CID
  return submittedApplications.filter(
    (app: any) => !userCid || app.applicant_cid === userCid,
  );
};

const AddSubmittedApplication = (application: any) => {
  submittedApplications.push(application);
};

const GetMyApprovalList = async (
  accessToken: string,
  userCid?: string,
): Promise<ApprovalTask[]> => {
  // DEMO: Only return pending approvals if logged in as father (11105001234)
  await simulateApiDelay(150);

  if (userCid !== "11105001234") {
    return [];
  }

  // DEMO: Always show a sample pending task for father
  // This helps demonstrate the approval workflow
  return [
    {
      id: "task-sample-demo",
      createdAt: "2026-04-15T10:00:00Z",
      updatedAt: "2026-04-15T10:00:00Z",
      application_id: "sample-demo-app",
      assigned_cid: "11105001234",
      task_type: "FATHER_APPROVAL",
      assigned_at: "2026-04-15T10:00:00Z",
      birth_application: {
        application_no: "BR-2026-DEMO",
        id: "sample-demo-app",
        createdAt: "2026-04-15T10:00:00Z",
        updatedAt: "2026-04-15T10:00:00Z",
        applicant_cid: "11234567890",
        first_name: "Sample",
        middle_name: "Demo",
        last_name: "Child",
        date_of_birth: "2026-03-20",
        gender: "male",
        status: "PENDING",
        applicant_is: "MOTHER",
        father_approval: "PENDING",
        mother_approval: "APPROVED",
        hoh_approval: "PENDING",
        guarantor_approval: "N/A",
        father_cid: "11105001234",
        mother_cid: "11234567890",
      },
    },
  ];
};

const BirthApplicationService = {
  GetMyApplications,
  GetMyApprovalList,
  AddSubmittedApplication,
};

export default BirthApplicationService;
