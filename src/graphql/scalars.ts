import {gql} from 'apollo-server-express';

export const scalars = gql`
  scalar GraphQLDate
  scalar GraphQLDateTime
  scalar GraphQLJSON
`;
