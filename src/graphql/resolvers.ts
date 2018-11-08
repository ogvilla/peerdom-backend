import {createPeerMutation} from './mutations/create-peer';
import {deletePeerMutation} from './mutations/delete-peer';
import {updatePeerMutation} from './mutations/update-peer';
import {peersResolver} from './resolvers/peers';
import {mapResolver} from './resolvers/map';
import {coreRolesResolver} from './resolvers/coreRoles';
import {tenantResolver} from './resolvers/tenant';
import {peerResolver} from './resolvers/peer';

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
    ...tenantResolver,
    ...peersResolver,
    ...peerResolver,
    ...mapResolver,
    ...coreRolesResolver
  },

  Mutation: {
    ...createPeerMutation,
    ...deletePeerMutation,
    ...updatePeerMutation
  }
};
