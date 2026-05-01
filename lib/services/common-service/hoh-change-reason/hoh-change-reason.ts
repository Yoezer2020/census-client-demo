import axios from "axios";

const serviceBaseUrl = process.env.NEXT_PUBLIC_COMMON_SERVICE_URL;

export interface HohChangeReason {
  id: string;
  name: string;
  [key: string]: unknown;
}

const GetAllChangeOfHOHReasons = async (
  accessToken: string,
  params?: { page?: number; take?: number; q?: string },
): Promise<HohChangeReason[]> => {
  const response = await axios.get(`${serviceBaseUrl}/hoh-change-reason`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: {
      page: params?.page ?? 1,
      take: params?.take ?? 10,
      ...(params?.q ? { q: params.q } : {}),
    },
  });
  const raw = response.data;
  return Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : [];
};

const HohChangeReasonService = {
  GetAllChangeOfHOHReasons,
};

export default HohChangeReasonService;
