import {FindManyOptions, getRepository, In} from 'typeorm';
import {Node} from '../../entity/node';

export const nodesResolver = {
  async nodes(root, args, context, info) {
    const repository = getRepository(Node);

    const requestedFields = info.fieldNodes[0].selectionSet.selections.map(sel => sel.name.value);
    const resolveChildren = requestedFields.indexOf('children') !== -1;
    const resolveDirectPeers = requestedFields.indexOf('directPeers') !== -1;

    const findOptions: FindManyOptions = {
      where: {
        id: In(args.ids)
      },
      relations: ['roleHoldings', 'roleHoldings.peer', 'coreRoleHoldings', 'coreRoleHoldings.peer']
    };

    // Retrieve children only if the GraphQL query asks for it.
    if (resolveChildren || resolveDirectPeers) {
      findOptions.relations = findOptions.relations.concat([
        'children',
        'children.roleHoldings',
        'children.roleHoldings.peer',
        'children.coreRoleHoldings',
        'children.coreRoleHoldings.peer'
      ]);
    }

    // TODO: filter for one tenant
    const nodes = await repository.find(findOptions);

    return nodes.map(node => {
      const formattedNode: any = node; // TODO: replace type with Node as soon as we have TS types
      if (node.type === 'circle') {
        if (resolveDirectPeers) {
          formattedNode.directPeers = getDirectPeers(node);
        }
      } else if (node.type === 'role') {
        formattedNode.holders = node.roleHoldings;
      } else if (node.type === 'coreRole') {
        formattedNode.holders = node.coreRoleHoldings;
      }
      formattedNode.roleHoldings = undefined;

      return formattedNode;
    });
  }
};

const getDirectPeers = function(node) {
  if (!node.children) {
    return [];
  }

  return node.children.reduce((acc, child) => {
    if (child.type === 'role') {
      return acc.concat(child.roleHoldings.map(roleHolding => roleHolding.peer));
    } else if (child.type === 'coreRole') {
      return acc.concat(child.coreRoleHoldings.map(coreRoleHolding => coreRoleHolding.peer));
    } else {
      return acc;
    }
  }, []);
};
