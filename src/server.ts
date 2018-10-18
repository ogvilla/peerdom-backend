import * as express from 'express';
import 'reflect-metadata';
import {ApolloServer} from 'apollo-server-express';
import {createConnection} from 'typeorm';

import {resolvers} from 'graphql/resolvers';
import {Mutation} from 'graphql/types/mutation';
import {Query} from 'graphql/types/query';
import {types} from 'graphql/types';

const typeDefs = [Query, Mutation, ...types];

const server = new ApolloServer({typeDefs, resolvers});

const app = express();
server.applyMiddleware({app});

const port = 3000;

createConnection()
  .then(async connection => {
    // import {User} from './entity/User';
    // console.log('Inserting a new user into the database...');
    // const user = new User();
    // user.firstName = 'Timber';
    // user.lastName = 'Saw';
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log('Saved a new user with id: ' + user.id);
    //
    // console.log('Loading users from the database...');
    // const users = await connection.manager.find(User);
    // console.log('Loaded users: ', users);

    app.listen({port}, () => {
      console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
    });
  })
  .catch(error => console.log(error));
