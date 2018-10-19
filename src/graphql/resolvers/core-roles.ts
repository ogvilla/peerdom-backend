import {getRepository} from 'typeorm';
import {Node} from '../../entity/node';

export const coreRolesResolver = {
  async coreRoles() {
    const repository = getRepository(Node);
    // TODO: filter for one tenant
    const coreRoles = await repository.find({where: {type: 'core_role'}}); // TODO use enums?
    return coreRoles;
  }
};
