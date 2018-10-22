import {getRepository} from 'typeorm';
import {Tenant} from '../../entity/tenant';

export const tenantResolver = {
  async tenant(root, args, context) {
    const repository = getRepository(Tenant);
    return await repository.findOne({
      where: {
        id: context.user.tenant
      }
    });
  }
};
