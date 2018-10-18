export const Mutation = `
    type Mutation {
        createPeer (
            peer: NewPeerPatch!
        ): Peer
    }
`;
