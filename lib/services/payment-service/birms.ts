import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL;

/**
 * Generate a BIRMS payment advice for an application.
 * Returns: { paymentAdviceNo, redirectUrl }
 */
const generatePaymentAdvice = async (
  accessToken: string,
  applicationNo: string,
) => {
  const response = await axios.get(
    `${baseUrl}/svc/payment-aggregator/birms-payments/generate-payment-advice/${applicationNo}`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  return response.data;
};

/**
 * Get the BIRMS transaction record for an application.
 */
const getTransaction = async (accessToken: string, applicationNo: string) => {
  const response = await axios.get(
    `${baseUrl}/svc/payment-aggregator/birms-transactions/get-by-application/${applicationNo}`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  return response.data;
};

/**
 * Get available bank list from RMA via BIRMS.
 * Returns: { bankList: [{bankId, bankName}], orderNo, bfsTxnId, beneficiaryId }
 */
const getBankList = async (accessToken: string, paymentAdviceNo: string) => {
  const response = await axios.post(
    `${baseUrl}/svc/payment-aggregator/birms-payments/get-bank-list/${paymentAdviceNo}`,
    {},
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  return response.data;
};

/**
 * Request OTP from the selected bank.
 */
const requestOTP = async (
  accessToken: string,
  orderNo: string,
  data: { accountNo: string; bankId: string; bankName: string },
) => {
  const response = await axios.post(
    `${baseUrl}/svc/payment-aggregator/birms-payments/request-otp/${orderNo}`,
    data,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  return response.data;
};

/**
 * Submit OTP to complete payment.
 */
const submitOTP = async (
  accessToken: string,
  orderNo: string,
  data: { otp: string },
) => {
  const response = await axios.post(
    `${baseUrl}/svc/payment-aggregator/birms-payments/submit-otp/${orderNo}`,
    data,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  return response.data;
};

const BirmsService = {
  generatePaymentAdvice,
  getTransaction,
  getBankList,
  requestOTP,
  submitOTP,
};

export default BirmsService;
