import {gql} from 'apollo-server-express';

export const NewPeerPatch = gql`
  input NewPeerPatch {
    firstName: String!
    lastName: String!
    displayName: String!
    createdAt: GraphQLDateTime!
    updatedAt: GraphQLDateTime!
  }
`;
