import {getRepository, In} from 'typeorm';
import {Node} from '../../entity/node';

export const nodesResolver = {
  async nodes(root, args, context) {
    const repository = getRepository(Node);
    // TODO: filter for one tenant
    const nodes = await repository.find({
      where: {
        id: In(args.ids)
      },
      relations: ['roleHoldings', 'roleHoldings.peer', 'coreRoleHoldings', 'coreRoleHoldings.peer']
    });

    // console.log(nodes);
    console.log(nodes[2].roleHoldings);
    console.log(nodes[2].coreRoleHoldings);

    const formattedNodes: any = nodes.map(node => {
      const formattedNode: any = node;
      if (node.type === 'circle') {
        // Nothing to do
      } else if (node.type === 'role') {
        formattedNode.holders = node.roleHoldings;
      } else if (node.type === 'coreRole') {
        formattedNode.holder = node.coreRoleHoldings;
      }
      formattedNode.roleHoldings = undefined;

      return formattedNode;
    });

    // nodesAugmented = nodesAugmented.map(node => {
    //   node.roleHoldings = node.roleHoldings.map(roleHolding => {
    //     const newRoleHolding = roleHolding;
    //     // newRoleHolding.roleId = newRoleHolding.role.id;
    //     // newRoleHolding.role = undefined;
    //     return newRoleHolding;
    //   });
    // });

    return formattedNodes;
  }
};
