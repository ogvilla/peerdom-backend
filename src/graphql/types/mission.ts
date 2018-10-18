import {gql} from 'apollo-server-express';

export const Mission = gql`
  type Mission {
    id: ID!
    text: String!
    createdAt: GraphQLDateTime!
    updatedAt: GraphQLDateTime!
  }
`;
