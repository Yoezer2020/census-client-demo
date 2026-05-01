import axios from "axios";

const serviceBaseUrl =
  process.env.NEXT_PUBLIC_CITIZEN_MAIN_REGISTRY_SERVICE_URL;

const GetHouseHoldInformationByHOHCidNO = async (
  accessToken: string,
  hohCidNo: string,
): Promise<any[]> => {
  const response = await axios.get(
    `${serviceBaseUrl}/house_hold_information/hoh-cid/${hohCidNo}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  return response.data;
};

const GetHouseHoldInformationByHouseholdNo = async (
  accessToken: string,
  householdNo: string,
): Promise<any[]> => {
  const response = await axios.get(
    `${serviceBaseUrl}/house_hold_information/household/${householdNo}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  return response.data;
};

const GetEligibleHohChange = async (
  accessToken: string,
  hohCidNo: string,
): Promise<any> => {
  const response = await axios.get(
    `${serviceBaseUrl}/house_hold_information/eligible_hoh_change/${hohCidNo}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  return response.data;
};

const HouseHoldInformationService = {
  GetHouseHoldInformationByHOHCidNO,
  GetHouseHoldInformationByHouseholdNo,
  GetEligibleHohChange,
};

export default HouseHoldInformationService;
