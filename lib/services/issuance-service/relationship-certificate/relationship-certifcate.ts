import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_ISSUANCE_SERVICE_URL;

const getRelationshipExists = async (
  accessToken: string,
  cidA: string,
  cidB: string,
) => {
  const response = await axios.get(
    `${baseUrl}/relationship-certificate/find-is-close-relationship?cidA=${cidA}&cidB=${cidB}`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  return response.data;
};

const RelationshipCertificateService = {
  getRelationshipExists,
};

export default RelationshipCertificateService;
