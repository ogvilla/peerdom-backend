export const Node = `
  interface Node {
    id : ID!
    parentId: String
    type: String!
    name: String!
    purpose: String!
    accountabilities: [String]
    domains: [String]
    policies: [String]
    notes: String
    color: String
    createdAt: Date
    updatedAt: Date
  }
`;
