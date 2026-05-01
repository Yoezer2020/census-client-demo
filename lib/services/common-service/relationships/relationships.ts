// Dummy RelationshipsService for demo
interface Relationship {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

const RelationshipsService = {
  GetAllRelationships: async (): Promise<Relationship[]> => [
    { id: "1", name: "Father" },
    { id: "2", name: "Mother" },
    { id: "3", name: "Uncle" },
    { id: "4", name: "Aunt" },
    { id: "5", name: "Brother" },
    { id: "6", name: "Sister" },
  ],
};

export default RelationshipsService;
