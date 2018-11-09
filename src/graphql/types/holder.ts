import {gql} from 'apollo-server-express';

export const Holder = gql`
  type Holder {
    focus: String
    electedUntil: GraphQLDate
    peer: Peer
    createdAt: GraphQLDateTime!
    updatedAt: GraphQLDateTime!
  }
`;
