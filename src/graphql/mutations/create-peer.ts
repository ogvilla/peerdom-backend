import * as uuid from 'uuid/v4';

import {getRepository} from 'typeorm';
import {Peer} from '../../entity/peer';

export const createPeerMutation = {
  async createPeer(_, {peer: attrs}) {
    const repository = getRepository(Peer);
    const peer = {
      id: uuid(),
      ...attrs
    };
    await repository.save(peer);
    return peer;
  }
};
