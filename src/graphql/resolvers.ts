import {createPeerMutation} from './mutations/create-peer';
import {deletePeerMutation} from './mutations/delete-peer';
import {updatePeerMutation} from './mutations/update-peer';
import {peersResolver} from './resolvers/peers';
import {mapResolver} from './resolvers/map';
import {coreRolesResolver} from './resolvers/coreRoles';
import {tenantResolver} from './resolvers/tenant';
import {nodesResolver} from './resolvers/nodes';

export const resolvers = {
  Query: {
    ...tenantResolver,
    ...peersResolver,
    ...mapResolver,
    ...nodesResolver,
    ...coreRolesResolver
  },

  Mutation: {
    ...createPeerMutation,
    ...deletePeerMutation,
    ...updatePeerMutation
  }
};
