import { simulateApiDelay } from "@/lib/dummy-data";

const serviceBaseUrl = process.env.NEXT_PUBLIC_BIRTH_DEATH_SERVICE_URL;

export interface CreateDeathApplicationPayload {
  [key: string]: unknown;
  certificate?: File[];
}

// In-memory store for submitted applications (lost on page refresh)
let submittedApplications: any[] = [];

const AddSubmittedApplication = (application: any) => {
  submittedApplications.push(application);
};

const CreateDeathApplication = async (
  accessToken: string,
  payload: CreateDeathApplicationPayload,
): Promise<any> => {
  // DEMO: Simulate death application submission
  await simulateApiDelay(1500);

  const applicationId = `DR-2026-${Math.floor(Math.random() * 10000)}`;

  return {
    success: true,
    application_id: applicationId,
    message: "Death registration submitted successfully",
    status: "SUBMITTED",
    submitted_at: new Date().toISOString(),
  };
};

const GetMyDeathApplications = async (
  accessToken: string,
  userCid?: string,
): Promise<any[]> => {
  // DEMO: Return submitted applications from in-memory store
  await simulateApiDelay(150);

  // Filter by current user's CID
  return submittedApplications.filter(
    (app: any) => !userCid || app.applicant_cid === userCid,
  );
};

const DeathApplicationService = {
  CreateDeathApplication,
  GetMyDeathApplications,
  AddSubmittedApplication,
};

export default DeathApplicationService;
