import * as uuid from 'uuid/v4';

import {getRepository} from 'typeorm';
import {Peer} from '../../entity/peer';

export const createPeerMutation = {
  async createPeer(_, {input: attrs}, context) {
    const repository = getRepository(Peer);
    const peer = {
      id: uuid(),
      tenant: context.user.tenant,
      ...attrs.peer
    };
    await repository.save(peer);
    return {peer: peer};
  }
};

export const updatePeerMutation = {
  async updatePeer(_, {input: attrs}, context) {
    const repository = getRepository(Peer);
    // need to cast to Object because graphql objects returned from apollo server are not recognized
    // see https://github.com/typeorm/typeorm/issues/679
    await repository.update(attrs.id, {...attrs.patch});
    const peer = await repository.findOne(attrs.id);
    return {peer: peer};
  }
};

export const deletePeerMutation = {
  async deletePeer(_, {input: attrs}, context) {
    const repository = getRepository(Peer);
    const peer = await repository.findOne(attrs.id);
    await repository.remove(peer);
    return {peer: peer};
  }
};
