import {gql} from 'apollo-server-express';

export const Peer = gql`
  type Peer {
    id: ID!
    firstName: String
    lastName: String
    displayName: String!
    mission: Mission
    roles: [Role]
    mapStructure: Circle
    createdAt: GraphQLDateTime!
    updatedAt: GraphQLDateTime!
  }
`;

export const PeerInput = gql`
  input PeerInput {
    firstName: String!
    lastName: String!
    displayName: String!
  }
`;

export const UpdatePeerInput = gql`
  input UpdatePeerInput {
    id: ID!
    patch: PeerInput
  }
`;

export const CreatePeerInput = gql`
  input CreatePeerInput {
    peer: PeerInput
  }
`;

export const DeletePeerInput = gql`
  input DeletePeerInput {
    id: ID!
  }
`;

export const CreatePeerPayload = gql`
  type CreatePeerPayload {
    peer: Peer
  }
`;

export const UpdatePeerPayload = gql`
  type UpdatePeerPayload {
    peer: Peer
  }
`;

export const DeletePeerPayload = gql`
  type DeletePeerPayload {
    peer: Peer
  }
`;
