import axios from "axios";

const serviceBaseUrl = process.env.NEXT_PUBLIC_COMMON_SERVICE_URL;

interface GetPurposesParams {
  page?: number;
  take?: number;
  search?: string;
}

export interface RelationshipCertificatePurpose {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface GetPurposesResponse {
  data: RelationshipCertificatePurpose[];
  meta?: {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

const GetAllRelationshipCertificatePurposes = async (
  accessToken: string,
  params?: GetPurposesParams,
): Promise<GetPurposesResponse> => {
  const queryParams = new URLSearchParams();

  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.take) queryParams.append("take", params.take.toString());
  if (params?.search) queryParams.append("q", params.search);

  const url = `${serviceBaseUrl}/relationship-certificate-purposes${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;

  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.data;
};

const RelationshipCertificatePurposeService = {
  GetAllRelationshipCertificatePurposes,
};

export default RelationshipCertificatePurposeService;
