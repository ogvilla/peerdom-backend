import {helloResolver} from './resolvers/hello';
import {messageResolver} from './resolvers/message';

export const resolvers = {
  Node: {
    __resolveType(obj, context, info) {
      if (obj.holders) {
        return 'Role';
      }

      if (obj.children) {
        return 'Circle';
      }

      return null;
    }
  },
  Query: {
    ...helloResolver,
    ...messageResolver
  },

  Mutation: {}
};
