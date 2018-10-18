import {gql} from 'apollo-server-express';

export const Holder = gql`
  type Holder {
    peerId: ID!
    focus: String
    electedUntil: GraphQLDate
    createdAt: GraphQLDateTime!
    updatedAt: GraphQLDateTime!
  }
`;
