import {gql} from 'apollo-server-express';

export const Role = gql`
  type Role implements Node {
    id: ID!
    parentId: String
    type: String!
    name: String!
    purpose: String
    accountabilities: [String]
    domains: [String]
    policies: [String]
    notes: String
    color: String
    createdAt: GraphQLDateTime
    updatedAt: GraphQLDateTime
    holders: [Holder]
  }
`;
