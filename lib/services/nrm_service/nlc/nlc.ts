import axios from "axios";

const serviceBaseUrl = process.env.NEXT_PUBLIC_NRM_SERVICE_URL;

const checkRuralPlotDetails = async (
  accessToken: string,
  cidNo: string,
): Promise<any> => {
  const response = await axios.get(`${serviceBaseUrl}/nlc/rural/${cidNo}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

const checkUrbanPlotDetails = async (
  accessToken: string,
  cidNo: string,
): Promise<any> => {
  const response = await axios.get(`${serviceBaseUrl}/nlc/urban/${cidNo}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

const NLCService = {
  checkRuralPlotDetails,
  checkUrbanPlotDetails,
};

export default NLCService;
