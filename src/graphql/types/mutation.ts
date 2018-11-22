export const Mutation = `
    type Mutation {
      createPeer(input: CreatePeerInput!): CreatePeerPayload
      deletePeer(input: DeletePeerInput!): DeletePeerPayload
      updatePeer(input: UpdatePeerInput!): UpdatePeerPayload
      createNode(input: CreateNodeInput!): CreateNodePayload
      deleteNode(input: DeleteNodeInput!): DeleteNodePayload
      updateNode(input: UpdateNodeInput!): UpdateNodePayload
    }
`;
