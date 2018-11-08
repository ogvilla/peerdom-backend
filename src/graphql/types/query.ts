import {gql} from 'apollo-server-express';

export const Query = gql`
  type Query {
    tenant: Tenant
    peers: [Peer]
    peer(id: String!): Peer
    map: Map
    coreRoles: [Role]
  }
`;
