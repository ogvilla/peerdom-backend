import * as crypto from 'crypto';
import {Strategy as LocalStrategy} from 'passport-local';
import {getRepository, getManager} from 'typeorm';
import {Token} from 'entity/token';

/*
TODO: create a way to add users. Need to use raw SQL queries:
const entityManager = getManager();
await entityManager.query('INSERT INTO "user" (email, password) VALUES ($1, crypt($2, gen_salt(\'bf\', 8)));', [
  'example@peerdom.org',
  'password'
]);
 */

/**
 * Check if there is a user with the given email and password,
 * and if there is, create a new token for that user.
 * @param email
 * @param password
 */
const localStrategyResolver = async (email, password) => {
  // Try to find the user with the given email and pw
  const entityManager = getManager();
  // TODO: Could be done with less raw SQL, see https://github.com/typeorm/typeorm/blob/master/docs/find-options.md
  const users = await entityManager.query('SELECT * FROM "user" WHERE email = $1 AND password = crypt($2, password)', [
    email,
    password
  ]);

  if (!users || users.length !== 1) {
    // If no user found, return empty
    return null;
  }
  const user = users[0];

  // Create a new token
  const tokenRepo = getRepository(Token);
  const token = {
    id: crypto.randomBytes(15).toString('hex'),
    user: {
      id: user.id
    }
  };
  await tokenRepo.save(token);

  return {
    id: user.id,
    tenantId: user.tenant,
    token: token.id
  };
};

export const localStrategy = new LocalStrategy((email, password, done) => {
  // Map async/await method to express callbacks
  localStrategyResolver(email, password)
    .then(userInfo => {
      if (userInfo) {
        done(null, userInfo);
      } else {
        done(null, false, {message: 'Wrong credentials'});
      }
    })
    .catch(done);
});

/**
 * Respond to the login POST request
 * @param req
 * @param res
 */
export const loginHandler = (req, res) => {
  res.json({
    token: req.user.token
  });
};

/**
 * Express middleware that checks the headers for an auth token
 * and adds the user info to the req object if the token is valid.
 * TODO: Use async/await
 * @param req
 * @param res
 * @param next
 */
export const addUserToRequest = (req, res, next) => {
  const receivedToken = req.get('Authorization');
  if (typeof receivedToken === 'string' && receivedToken.length > 0) {
    const tokenRepo = getRepository(Token);
    tokenRepo
      .findOne({
        where: {
          id: receivedToken
        },
        relations: ['user', 'user.tenant'] // TODO: Only load the parts we really need: the user id and tenant id
      })
      .then(token => {
        if (token && token.id === receivedToken) {
          req.user = {
            id: token.user.id,
            tenant: token.user.tenant.id
          };
        }
        next();
      })
      .catch(next);
  } else {
    next();
  }
};
