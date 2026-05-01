import axios from "axios";

const serviceBaseUrl = process.env.NEXT_PUBLIC_COMMON_SERVICE_URL;

export interface PaymentServiceType {
  id: string;
  createdAt: string;
  updatedAt: string;
  payment_type: string;
  service_code: string;
  currency: string;
  amount: string;
}

export interface PaymentServiceTypesResponse {
  data: PaymentServiceType[];
  meta: {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

const getPaymentServiceTypes = async (
  accessToken: string,
  page: number = 1,
  take: number = 10,
): Promise<PaymentServiceTypesResponse> => {
  const response = await axios.get(`${serviceBaseUrl}/payment-service-types`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: { page, take },
  });
  return response.data;
};

const PaymentServiceTypesService = {
  getPaymentServiceTypes,
};

export default PaymentServiceTypesService;
