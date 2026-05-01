import axios from "axios";

const serviceBaseUrl = process.env.NEXT_PUBLIC_COMMON_SERVICE_URL;

export interface Village {
  id: string;
  name: string;
  [key: string]: unknown;
}

const GetAllVillages = async (accessToken: string): Promise<Village[]> => {
  const response = await axios.get(`${serviceBaseUrl}/villages/all`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

const VillagesService = {
  GetAllVillages,
};

export default VillagesService;
