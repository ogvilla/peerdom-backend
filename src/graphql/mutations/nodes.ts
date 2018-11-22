import * as uuid from 'uuid/v4';

import {getRepository} from 'typeorm';
import {Node} from '../../entity/node';

export const createNodeMutation = {
  async createNode(_, {input: attrs}, context) {
    const repository = getRepository(Node);
    const node = {
      id: uuid(),
      tenant: context.user.tenant,
      ...attrs.newNode
    };
    await repository.save(node);
    return {node: node};
  }
};

export const updateNodeMutation = {
  async updateNode(_, {input: attrs}, context) {
    const repository = getRepository(Node);
    // need to cast to Object because graphql objects returned from apollo server are not recognized
    // see https://github.com/typeorm/typeorm/issues/679
    await repository.update(attrs.id, {...attrs.patch});
    const node = await repository.findOne(attrs.id);
    return {node: node};
  }
};

export const deleteNodeMutation = {
  async deleteNode(_, {input: attrs}, context) {
    const repository = getRepository(Node);
    const node = await repository.findOne(attrs.id);
    await repository.remove(node);
    return {node: node};
  }
};
