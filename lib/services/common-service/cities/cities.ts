import axios from "axios";

const serviceBaseUrl = process.env.NEXT_PUBLIC_COMMON_SERVICE_URL;

export interface City {
  id: string;
  name: string;
  country_id?: string;
  [key: string]: unknown;
}

const GetAllCities = async (accessToken: string): Promise<City[]> => {
  const response = await axios.get(`${serviceBaseUrl}/cities/all`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

const CitiesService = {
  GetAllCities,
};

export default CitiesService;
