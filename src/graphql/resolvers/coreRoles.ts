import {getRepository} from 'typeorm';
import {Node} from '../../entity/node';

export const coreRolesResolver = {
  async coreRoles() {
    const repository = getRepository(Node);
    // TODO: filter for one tenant
    return await repository.find({where: {type: 'coreRole'}}); // TODO use enums?
  }
};
