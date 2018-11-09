import {gql} from 'apollo-server-express';

export const Node = gql`
  type Node {
    id: ID!
    parentId: ID
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
    children: [Node]
    peerIds: [String]
    directPeerIds: [String]
    holders: [Holder]
  }
`;
