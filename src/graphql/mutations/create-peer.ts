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
