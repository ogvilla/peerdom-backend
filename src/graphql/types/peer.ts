import {gql} from 'apollo-server-express';

export const Peer = gql`
  type Peer {
    id: ID!
    firstName: String
    lastName: String
    displayName: String!
    mission: Mission
    roles: [Node]
    mapStructure: Node
    createdAt: GraphQLDateTime!
    updatedAt: GraphQLDateTime!
  }
`;

export const PeerNew = gql`
  input PeerNew {
    firstName: String!
    lastName: String!
    displayName: String!
  }
`;

export const PeerPatch = gql`
  input PeerPatch {
    firstName: String
    lastName: String
    displayName: String
  }
`;

export const UpdatePeerInput = gql`
  input UpdatePeerInput {
    id: ID!
    patch: PeerPatch
  }
`;

export const CreatePeerInput = gql`
  input CreatePeerInput {
    newPeer: PeerNew
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
