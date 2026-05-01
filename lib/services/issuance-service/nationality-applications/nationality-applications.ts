// Mock delay helper
const simulateApiDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// In-memory store for submitted applications
let submittedApplications: NationalityApplication[] = [];

export interface CreateNationalityApplicationPayload {
  applicant_is: string;
  applicant_cid_no: string;
  applicant_contact_no: string;
  minor_cid: string;
  minor_name: string;
  dob: string;
  payment_service_type_id: string;
  certificate?: File[];
}

const CreateNationalityApplication = async (
  accessToken: string,
  payload: CreateNationalityApplicationPayload,
): Promise<any> => {
  await simulateApiDelay(800);

  const applicationNo = `NAT-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  const application: NationalityApplication = {
    id: `nat-${Date.now()}`,
    application_no: applicationNo,
    applicant_cid_no: payload.applicant_cid_no,
    applicant_contact_no: payload.applicant_contact_no,
    applicant_is: payload.applicant_is,
    minor_cid: payload.minor_cid,
    minor_name: payload.minor_name,
    dob: payload.dob,
    half_photo: payload.certificate?.[0]?.name || null,
    payment_type_id: payload.payment_service_type_id,
    payment_service_type_id: payload.payment_service_type_id,
    parent_approval: "APPROVED",
    application_status: "APPROVED", // Auto-approve for demo
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    actions: [],
    rejections: [],
    fees: [],
  };

  submittedApplications.push(application);

  return {
    success: true,
    data: application,
    message: "Nationality certificate application submitted successfully",
  };
};

export interface NationalityApplication {
  id: string;
  application_no: string;
  applicant_cid_no: string;
  applicant_contact_no: string;
  applicant_is: string;
  minor_cid: string;
  minor_name: string;
  dob: string;
  half_photo: string | null;
  payment_type_id: string | null;
  payment_service_type_id: string;
  parent_approval: string;
  application_status: string;
  created_at: string;
  updated_at: string;
  actions: any[];
  rejections: any[];
  fees: any[];
}

const GetMyNationalityApplications = async (
  accessToken: string,
): Promise<NationalityApplication[]> => {
  await simulateApiDelay(300);

  return submittedApplications;
};

const NationalityApplicationService = {
  CreateNationalityApplication,
  GetMyNationalityApplications,
};

export default NationalityApplicationService;
