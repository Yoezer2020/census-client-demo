import axios from "axios";

const serviceBaseUrl = process.env.NEXT_PUBLIC_COMMON_SERVICE_URL;

export interface Gewog {
  id: string;
  name: string;
  [key: string]: unknown;
}

const GetAllGewogs = async (accessToken: string): Promise<Gewog[]> => {
  const response = await axios.get(`${serviceBaseUrl}/gewogs/all`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

const GewogsService = {
  GetAllGewogs,
};

export default GewogsService;
