import {gql} from 'apollo-server-express';
import {GraphQLDateTime} from 'graphql-iso-date';

export const scalars = gql`
  scalar GraphQLDate
  scalar GraphQLDateTime
`;
