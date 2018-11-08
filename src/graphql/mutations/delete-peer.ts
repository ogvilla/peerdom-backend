import {getRepository} from 'typeorm';
import {Peer} from '../../entity/peer';

export const deletePeerMutation = {
  async deletePeer(_, {input: attrs}, context) {
    const repository = getRepository(Peer);
    const peer = await repository.findOne(attrs.id);
    await repository.remove(peer);
    return {peer: peer};
  }
};
