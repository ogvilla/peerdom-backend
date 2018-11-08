import {getRepository} from 'typeorm';
import {Peer} from '../../entity/peer';

export const peerResolver = {
  async peer(root, args, context) {
    const repository = getRepository(Peer);
    return await repository.findOne(args.id);
  }
};
