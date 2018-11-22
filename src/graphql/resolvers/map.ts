import {getRepository, IsNull, Not} from 'typeorm';
import {Node} from '../../entity/node';
import {RoleHolding} from '../../entity/role_holding';

export const mapResolver = {
  async map(root, args, context) {
    // Retrieving all nodes
    const nodeRepository = getRepository(Node);
    const nodes = await nodeRepository.find({
      where: {
        tenant: context.user.tenant
      },
      select: ['id', 'type', 'parent'],
      relations: ['parent']
    });
    let circleStructure: any = {};

    // Retrieving role holdings (useful to know which core roles are in which circle)
    const roleHoldingRepository = getRepository(RoleHolding);
    const coreRoleHoldings = await roleHoldingRepository.find({
      where: {
        tenant: context.user.tenant,
        circle: Not(IsNull())
      },
      select: ['id', 'circle'],
      relations: ['circle', 'role']
    });

    console.log(coreRoleHoldings);

    // Adding root node
    const nodesWithoutParent = nodes.filter(node => node.type === 'circle' && node.parent === null); // TODO use enums?

    // TODO: handle errors (return 500 and handle in frontend as well)
    if (nodesWithoutParent.length < 1) {
      throw new Error('No root node found');
    } else if (nodesWithoutParent.length > 1) {
      throw new Error('More than 1 root node found');
    }

    circleStructure = nodesWithoutParent[0];

    // Populating children
    // TODO: Should we check for circular relationship before or during populating?
    circleStructure = populateChildren(circleStructure, nodes, coreRoleHoldings);

    return {
      map: circleStructure
    };
  }
};

const populateChildren = (node, nodes, coreRoleHoldings) => {
  // Remove attributes that were useful to build the tree structure but that we don't want in the result
  node.parent = undefined;
  node.type = undefined;
  let children = nodes
    .filter(child => child.parent && child.parent.id === node.id)
    .map(child => populateChildren(child, nodes, coreRoleHoldings));

  const coreRoleChildren = coreRoleHoldings
    .filter(coreRoleHolding => coreRoleHolding.circle.id === node.id)
    .map(coreRoleHolding => {
      return {id: coreRoleHolding.role.id};
    });

  children = [...children, ...coreRoleChildren];

  return {
    id: node.id,
    children: children.length > 0 ? children : undefined
  };
};
