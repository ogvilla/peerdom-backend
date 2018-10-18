import * as express from 'express';
import {ApolloServer, gql} from 'apollo-server-express';
import {resolvers} from './graphql/resolvers';
import {Mutation} from './graphql/types/mutation';
import {Query} from './graphql/types/query';

const typeDefs = [Query, Mutation];

const server = new ApolloServer({typeDefs, resolvers});

const app = express();
server.applyMiddleware({app});

const port = 3000;

app.listen({port}, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`));
