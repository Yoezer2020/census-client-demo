import axios from "axios";

const serviceBaseUrl = process.env.NEXT_PUBLIC_BIRTH_DEATH_SERVICE_URL;

const getEPISDeathByCIDNo = async (
  accessToken: string,
  cid: string,
): Promise<any> => {
  const response = await axios.get(`${serviceBaseUrl}/epis/death/${cid}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

const getEPISBirthByMotherCIDNo = async (
  accessToken: string,
  cid: string,
): Promise<any> => {
  const response = await axios.get(`${serviceBaseUrl}/epis/birth/${cid}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

// const GetMyApprovalList = async (accessToken: string): Promise<any[]> => {
//   const response = await axios.get(
//     `${serviceBaseUrl}/birth-approval-list/my-approval-list`,
//     { headers: { Authorization: `Bearer ${accessToken}` } },
//   );
//   return response.data;
// };

const EPISService = {
  getEPISDeathByCIDNo,
  getEPISBirthByMotherCIDNo,
};

export default EPISService;
