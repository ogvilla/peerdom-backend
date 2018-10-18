import {helloResolver} from './resolvers/hello';
import {messageResolver} from './resolvers/message';

export const resolvers = {
  Query: {
    ...helloResolver,
    ...messageResolver
  },

  Mutation: {}
};
