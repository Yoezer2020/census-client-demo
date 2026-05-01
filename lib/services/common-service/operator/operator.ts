// Dummy OperatorService for demo
const OperatorService = {
  CheckIfOperatorAPI: async (_accessToken: string, cidNo: string) => {
    // Always return true for demo CID
    if (cidNo === "11234567890") return [{ valid: true }];
    return [{ valid: false }];
  },
};

export default OperatorService;
