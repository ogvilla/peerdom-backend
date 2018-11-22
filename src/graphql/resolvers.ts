import {createPeerMutation, deletePeerMutation, updatePeerMutation} from './mutations/peers';
import {createNodeMutation, deleteNodeMutation, updateNodeMutation} from './mutations/nodes';
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
    ...updatePeerMutation,
    ...createNodeMutation,
    ...deleteNodeMutation,
    ...updateNodeMutation
  }
};
