import axios from "axios";

const serviceBaseUrl = process.env.NEXT_PUBLIC_COMMON_SERVICE_URL;

export interface Dzongkhag {
  id: string;
  name: string;
  [key: string]: unknown;
}

const GetAllDzongkhags = async (accessToken: string): Promise<Dzongkhag[]> => {
  const response = await axios.get(`${serviceBaseUrl}/dzongkhags/all`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

const DzongkhagsService = {
  GetAllDzongkhags,
};

export default DzongkhagsService;
