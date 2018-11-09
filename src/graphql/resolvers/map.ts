import {getRepository} from 'typeorm';
import {Node} from '../../entity/node';

export const mapResolver = {
  async map() {
    const repository = getRepository(Node);
    // TODO: filter for one tenant
    const nodes = await repository.find({
      select: ['id', 'type', 'parent'],
      relations: ['parent']
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

    return {
      map: circleStructure
    };
  }
};

const populateChildren = (node, nodes) => {
  // Remove attributes that were useful to build the tree structure but that we don't want in the result
  node.parent = undefined;
  node.type = undefined;
  const children = nodes
    .filter(child => child.parent && child.parent.id === node.id)
    .map(child => populateChildren(child, nodes));

  return {
    id: node.id,
    children: children.length > 0 ? children : undefined
  };
};
