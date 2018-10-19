import {gql} from 'apollo-server-express';

export const Query = gql`
  type Query {
    peers: [Peer]
    map: Map
    coreRoles: [Role]
  }
`;
