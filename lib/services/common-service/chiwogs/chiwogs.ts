import axios from "axios";

const serviceBaseUrl = process.env.NEXT_PUBLIC_COMMON_SERVICE_URL;

export interface Chiwog {
  id: string;
  name: string;
  [key: string]: unknown;
}

const GetAllChiwogs = async (accessToken: string): Promise<Chiwog[]> => {
  const response = await axios.get(`${serviceBaseUrl}/chiwogs/all`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

const ChiwogsService = {
  GetAllChiwogs,
};

export default ChiwogsService;
