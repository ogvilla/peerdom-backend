import * as uuid from 'uuid/v4';

import {getRepository} from 'typeorm';
import {RoleHolding} from '../../entity/role_holding';

export const createRoleHoldingMutation = {
  async createRoleHolding(_, {input: attrs}, context) {
    const repository = getRepository(RoleHolding);
    const holder = {
      id: uuid(),
      ...attrs.newRoleHolding
    };
    await repository.save(holder);
    console.log(JSON.stringify(attrs.newRoleHolding));
    return {holder: holder};
  }
};

export const updateRoleHoldingMutation = {
  async updateRoleHolding(_, {input: attrs}, context) {
    const repository = getRepository(RoleHolding);
    // need to cast to Object because graphql objects returned from apollo server are not recognized
    // see https://github.com/typeorm/typeorm/issues/679
    await repository.update(attrs.id, {...attrs.patch});
    const holder = await repository.findOne(attrs.id);
    return {holder: holder};
  }
};

export const deleteRoleHoldingMutation = {
  async deleteRoleHolding(_, {input: attrs}, context) {
    const repository = getRepository(RoleHolding);
    const holder = await repository.findOne(attrs.id);
    await repository.remove(holder);
    return {holder: holder};
  }
};
