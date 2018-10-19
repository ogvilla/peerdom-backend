import {createPeerMutation} from './mutations/create-peer';
import {peersResolver} from './resolvers/peers';
import {mapResolver} from './resolvers/map';
import {coreRolesResolver} from './resolvers/coreRoles';

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
    ...peersResolver,
    ...mapResolver,
    ...coreRolesResolver
  },

  Mutation: {
    ...createPeerMutation
  }
};
