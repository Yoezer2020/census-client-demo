// Dummy CidApplicationReasonsService for demo
const CidApplicationReasonsService = {
  GetAllCidApplicationReasons: async () => {
    return {
      data: [
        { id: "1", name: "New Application", createdAt: "", updatedAt: "" },
        { id: "2", name: "Lost Card", createdAt: "", updatedAt: "" },
        { id: "3", name: "Damaged Card", createdAt: "", updatedAt: "" },
      ],
      meta: undefined,
    };
  },
};

export default CidApplicationReasonsService;
