import {gql} from 'apollo-server-express';
import {Node} from './node';

export const Circle = gql`
  type Circle implements Node {
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
    children: [Node]!
    peerIds: [String]!
    directPeerIds: [String]!
  }
`;
