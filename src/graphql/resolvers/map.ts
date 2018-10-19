import {getRepository} from 'typeorm';
import {Node} from '../../entity/node';

export const mapResolver = {
  async map() {
    const repository = getRepository(Node);
    // TODO: filter for one tenant
    const nodes = await repository.find({
      relations: [
        'parent',
        'roleHoldings',
        'roleHoldings.peer',
        'coreRoleHoldings',
        'coreRoleHoldings.peer',
        'coreRoleHoldings.role'
      ]
    });
    let circleStructure: any = {};
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
    circleStructure = populateChildren(circleStructure, nodes);

    console.log('\nPopulated:');
    console.log(circleStructure);

    return {
      map: circleStructure
    };
  }
};

const populateChildren = (node, nodes) => {
  const children = nodes.filter(child => child.parent && child.parent.id === node.id).map(child => {
    const populatedChild = populateChildren(child, nodes);
    // We don't need the reference to the parent in the map structure
    populatedChild.parent = undefined;
    populatedChild.coreRoleHoldings = populatedChild.coreRoleHoldings.map(coreRoleHolding => {
      const newCoreRoleHolding = coreRoleHolding;
      newCoreRoleHolding.roleId = newCoreRoleHolding.role.id;
      newCoreRoleHolding.role = undefined;
      return newCoreRoleHolding;
    });
    return populatedChild;
  });

  return {
    ...node,
    children
  };
};
