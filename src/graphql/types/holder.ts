import {gql} from 'apollo-server-express';

export const Holder = gql`
  type Holder {
    peerId: ID!
    focus: String
    electedUntil: Date
    createdAt: Date!
    updatedAt: Date!
  }
`;
