import {createPeerMutation} from './mutations/create-peer';
import {peersResolver} from './resolvers/peers';

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
    ...peersResolver
  },

  Mutation: {
    ...createPeerMutation
  }
};
