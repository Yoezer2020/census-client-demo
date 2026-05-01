import axios from "axios";

const serviceBaseUrl =
  process.env.NEXT_PUBLIC_CITIZEN_MAIN_REGISTRY_SERVICE_URL;

const GetCidIssuanceType = async (
  accessToken: string,
  cidNo: string,
): Promise<any> => {
  const response = await axios.get(
    `${serviceBaseUrl}/cid-cards/check-type/${cidNo}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  return response.data;
};

const CIDCardsService = {
  GetCidIssuanceType,
};

export default CIDCardsService;
