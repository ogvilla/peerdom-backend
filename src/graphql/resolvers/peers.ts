import {getRepository} from 'typeorm';
import {Peer} from '../../entity/peer';

export const peersResolver = {
  async peers() {
    const repository = getRepository(Peer);
    return await repository.find({relations: ['mission']});
  }
};
