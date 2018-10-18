import {gql} from 'apollo-server-express';

export const Node = gql`
  interface Node {
    id: ID!
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
