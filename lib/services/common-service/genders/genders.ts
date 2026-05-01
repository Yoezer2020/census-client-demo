import axios from "axios";

const serviceBaseUrl = process.env.NEXT_PUBLIC_COMMON_SERVICE_URL;

export interface Gender {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const GetAllGenders = async (accessToken: string): Promise<Gender[]> => {
  const response = await axios.get(`${serviceBaseUrl}/genders/all`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

const GendersService = {
  GetAllGenders,
};

export default GendersService;
