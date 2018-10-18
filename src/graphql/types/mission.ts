import {gql} from 'apollo-server-express';

export const Mission = gql`
  type Mission {
    id: ID!
    peerId: String!
    text: String!
    createdAt: GraphQLDateTime!
    updatedAt: GraphQLDateTime!
  }
`;
