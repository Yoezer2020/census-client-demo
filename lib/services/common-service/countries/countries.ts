import axios from "axios";

const serviceBaseUrl = process.env.NEXT_PUBLIC_COMMON_SERVICE_URL;

export interface Country {
  id: string;
  name: string;
  [key: string]: unknown;
}

const GetAllCountries = async (accessToken: string): Promise<Country[]> => {
  const response = await axios.get(`${serviceBaseUrl}/countries/all`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

const CountriesService = {
  GetAllCountries,
};

export default CountriesService;
