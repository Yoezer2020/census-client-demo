import axios from "axios";

const serviceBaseUrl = process.env.NEXT_PUBLIC_NRM_SERVICE_URL;

interface ResettlementResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Array<{
    id: string;
    createdAt: string;
    updatedAt: string;
    cid_no: string;
  }>;
}

const checkIfApartOfResettlement = async (
  accessToken: string,
  cidNo: string,
): Promise<ResettlementResponse> => {
  const response = await axios.get(
    `${serviceBaseUrl}/resettlement/by-cid/${cidNo}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  return response.data;
};

const ResettlementService = {
  checkIfApartOfResettlement,
};

export default ResettlementService;
