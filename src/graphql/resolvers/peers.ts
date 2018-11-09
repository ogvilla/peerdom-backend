import {FindConditions, getRepository} from 'typeorm';
import {Peer} from '../../entity/peer';

export const peersResolver = {
  async peers(root, args, context) {
    const repository = getRepository(Peer);

    const where: FindConditions<Peer> = {
      tenant: context.user.tenant
    };

    if (args.id) {
      where.id = args.id;
    }

    return await repository.find({
      where,
      relations: ['mission']
    });
  }
};
