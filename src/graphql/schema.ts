import {makeExecutableSchema, gql} from 'apollo-server-express';

import {resolvers} from './resolvers';
import {Mutation} from './types/mutation';
import {Query} from './types/query';
import {types} from './types';

const SchemaDefinition = gql`
  schema {
    query: Query
    mutation: Mutation
  }
`;

// export const typeDefs = [Query, Mutation, ...types];
export const typeDefs = [SchemaDefinition, Query, Mutation, ...types];
export * from './resolvers';
export default makeExecutableSchema({
  typeDefs,
  resolvers
});
