import {gql} from 'apollo-server-express';

export const Query = gql`
  type Query {
    tenant: Tenant
    peers(id: ID): [Peer]
    map: Map
    nodes(ids: [ID]): [Node]
    coreRoles: [Node]
  }
`;
