import {gql} from 'apollo-server-express';

export const Holder = gql`
  type Holder {
    focus: String
    electedUntil: GraphQLDate
    peer: Peer
    createdAt: GraphQLDateTime!
    updatedAt: GraphQLDateTime!
  }
`;

export const RoleHoldingNew = gql`
  input RoleHoldingNew {
    peer: ID!
    role: ID!
    circle: ID
    focus: String
    electedUntil: GraphQLDate
  }
`;

export const RoleHoldingPatch = gql`
  input RoleHoldingPatch {
    peer: ID
    role: ID
    circle: ID
    focus: String
    electedUntil: GraphQLDate
  }
`;

export const UpdateRoleHoldingInput = gql`
  input UpdateRoleHoldingInput {
    id: ID!
    patch: RoleHoldingPatch
  }
`;

export const CreateRoleHoldingInput = gql`
  input CreateRoleHoldingInput {
    newRoleHolding: RoleHoldingNew
  }
`;

export const DeleteRoleHoldingInput = gql`
  input DeleteRoleHoldingInput {
    id: ID!
  }
`;

export const CreateRoleHoldingPayload = gql`
  type CreateRoleHoldingPayload {
    holder: Holder
  }
`;

export const UpdateRoleHoldingPayload = gql`
  type UpdateRoleHoldingPayload {
    holder: Holder
  }
`;

export const DeleteRoleHoldingPayload = gql`
  type DeleteRoleHoldingPayload {
    holder: Holder
  }
`;
