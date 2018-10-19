import * as uuid from 'uuid/v4';

import {getRepository} from 'typeorm';
import {Peer} from '../../entity/peer';

export const createPeerMutation = {
  async createPeer(_, {peer: attrs}, context) {
    const repository = getRepository(Peer);
    const peer = {
      id: uuid(),
      tenant: context.user.tenant,
      ...attrs
    };
    await repository.save(peer);
    return peer;
  }
};
