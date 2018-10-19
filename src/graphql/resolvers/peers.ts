import {getRepository} from 'typeorm';
import {Peer} from '../../entity/peer';

export const peersResolver = {
  async peers(root, args, context) {
    const repository = getRepository(Peer);
    return await repository.find({
      where: {
        tenant: context.user.tenant
      },
      relations: ['mission']
    });
  }
};
