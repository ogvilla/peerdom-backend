import {getRepository} from 'typeorm';
import {Peer} from '../../entity/peer';

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
