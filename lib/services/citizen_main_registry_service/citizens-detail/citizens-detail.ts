import axios from "axios";

const serviceBaseUrl =
  process.env.NEXT_PUBLIC_CITIZEN_MAIN_REGISTRY_SERVICE_URL;

const GetAllCitizensDetailByCIDNo = async (
  accessToken: string,
  cid: string,
): Promise<any[]> => {
  const response = await axios.get(
    `${serviceBaseUrl}/citizens-detail/cid/${cid}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  return response.data;
};

const GetCitizenSummaryByCIDNo = async (
  accessToken: string,
  cidNo: string,
): Promise<any> => {
  const response = await axios.get(
    `${serviceBaseUrl}/citizens-detail/summary/${cidNo}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  return response.data;
};

const GetHouseHoldDetailsoflocation = async (
  accessToken: string,
  householdNo: string,
): Promise<any> => {
  const response = await axios.get(
    `${serviceBaseUrl}/citizens-detail/house-detail-information/${householdNo}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  return response.data;
};

const GetHouseHoldMembersFromHouseHoldNumber = async (
  accessToken: string,
  householdNo: string,
): Promise<any> => {
  const response = await axios.get(
    `${serviceBaseUrl}/citizens-detail/household/${householdNo}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  return response.data;
};
const CitizensDetailService = {
  GetAllCitizensDetailByCIDNo,
  GetCitizenSummaryByCIDNo,
  GetHouseHoldDetailsoflocation,
  GetHouseHoldMembersFromHouseHoldNumber,
};

export default CitizensDetailService;
