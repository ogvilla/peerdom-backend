export const Mutation = `
    type Mutation {
      createPeer(input: CreatePeerInput!): CreatePeerPayload
      deletePeer(input: DeletePeerInput!): DeletePeerPayload
      updatePeer(input: UpdatePeerInput!): UpdatePeerPayload
    }
`;
