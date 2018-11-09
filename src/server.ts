import * as express from 'express';
import * as passport from 'passport';
import bodyParser = require('body-parser');
import 'reflect-metadata';
import {ApolloServer, AuthenticationError} from 'apollo-server-express';
import {createConnection} from 'typeorm';

import {localStrategy, loginHandler, addUserToRequest} from './controllers/auth';
import {typeDefs, resolvers} from 'graphql/schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => {
    // Check that we have a user and a tenant
    const user = req.user;
    if (!user || !user.tenant) {
      throw new AuthenticationError('Auth required');
    }

    // Add the user to the context
    return {user};
  }
});

const app = express();

// Set up passport and login route
passport.use(localStrategy);
app.use(passport.initialize());
app.use(bodyParser.json());
app.post(
  '/login',
  passport.authenticate('local', {
    session: false
  }),
  loginHandler
);

// Try to add the user to the request (checking the auth header)
app.use(addUserToRequest);

// Initialise Apollo
server.applyMiddleware({app});

const port = 3000;

createConnection()
  .then(async () => {
    app.listen({port}, () => {
      console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
    });
  })
  .catch(error => console.log(error));
