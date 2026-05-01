// Dummy CidCollectionPointsService for demo
export interface CidCollectionPoint {
  id: string;
  createdAt: string;
  updatedAt: string;
  sl_no: number;
  name: string;
}

const CidCollectionPointsService = {
  getCidCollectionPoints: async () => [
    { id: "1", createdAt: "", updatedAt: "", sl_no: 1, name: "Thimphu" },
    { id: "2", createdAt: "", updatedAt: "", sl_no: 2, name: "Paro" },
    { id: "3", createdAt: "", updatedAt: "", sl_no: 3, name: "Punakha" },
  ],
};

export default CidCollectionPointsService;
