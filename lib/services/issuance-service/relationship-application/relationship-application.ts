// Mock delay helper
const simulateApiDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// In-memory store for submitted applications
let submittedApplications: RelationshipApplicationResponse[] = [];

export interface CreateRelationshipApplicationPayload {
  applicant_cid: string;
  applicant_name: string;
  relationship_to_cid: string;
  purpose_id: string;
  purpose_name: string;
  payment_service_type_id: string;
  payment_type_name: string;
  payment_amount: string;
  applicant_contact_no: string;
}

export interface RelationshipApplicationResponse {
  id: string;
  application_no: string;
  applicant_name: string;
  applicant_cid: string;
  applicant_contact_no: string;
  relationship_to_cid: string;
  relationship_to_name: string;
  purpose_id: string;
  payment_type_id: string | null;
  payment_service_type_id: string;
  application_status: string;
  createdAt: string;
  updatedAt: string;
  purpose: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface GetRelationshipApplicationsResponse {
  data: RelationshipApplicationResponse[];
  meta: {
    itemCount: number;
    pageCount: number | null;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

const CreateRelationshipApplication = async (
  accessToken: string,
  payload: CreateRelationshipApplicationPayload,
): Promise<any> => {
  await simulateApiDelay(800);

  const applicationNo = `REL-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  const application: RelationshipApplicationResponse = {
    id: `rel-${Date.now()}`,
    application_no: applicationNo,
    applicant_name: payload.applicant_name,
    applicant_cid: payload.applicant_cid,
    applicant_contact_no: payload.applicant_contact_no,
    relationship_to_cid: payload.relationship_to_cid,
    relationship_to_name: "Karma Tenzin Dorji", // Father's name
    purpose_id: payload.purpose_id,
    payment_type_id: payload.payment_service_type_id,
    payment_service_type_id: payload.payment_service_type_id,
    application_status: "APPROVED", // Auto-approve for demo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    purpose: {
      id: payload.purpose_id,
      name: payload.purpose_name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };

  submittedApplications.push(application);

  return {
    success: true,
    data: application,
    message: "Relationship certificate application submitted successfully",
  };
};

const GetApplicationsForRelationship = async (
  accessToken: string,
): Promise<GetRelationshipApplicationsResponse> => {
  await simulateApiDelay(300);

  return {
    data: submittedApplications,
    meta: {
      itemCount: submittedApplications.length,
      pageCount: 1,
      hasPreviousPage: false,
      hasNextPage: false,
    },
  };
};

const RelationshipApplicationService = {
  createRelationshipApplication: CreateRelationshipApplication,
  getApplicationsForRelationship: GetApplicationsForRelationship,
};

export default RelationshipApplicationService;
