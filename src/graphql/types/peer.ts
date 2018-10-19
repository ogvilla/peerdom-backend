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
