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

export const NodeNew = gql`
  input NodeNew {
    parentId: ID
    type: String!
    name: String!
    purpose: String
    accountabilities: [String]
    domains: [String]
    policies: [String]
    notes: String
    color: String
  }
`;

export const NodePatch = gql`
  input NodePatch {
    parentId: ID
    type: String
    name: String
    purpose: String
    accountabilities: [String]
    domains: [String]
    policies: [String]
    notes: String
    color: String
  }
`;

export const UpdateNodeInput = gql`
  input UpdateNodeInput {
    id: ID!
    patch: NodePatch
  }
`;

export const CreateNodeInput = gql`
  input CreateNodeInput {
    newNode: NodeNew
  }
`;

export const DeleteNodeInput = gql`
  input DeleteNodeInput {
    id: ID!
  }
`;

export const CreateNodePayload = gql`
  type CreateNodePayload {
    node: Node
  }
`;

export const UpdateNodePayload = gql`
  type UpdateNodePayload {
    node: Node
  }
`;

export const DeleteNodePayload = gql`
  type DeleteNodePayload {
    node: Node
  }
`;
