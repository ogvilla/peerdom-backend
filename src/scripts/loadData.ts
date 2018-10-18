import {createConnection} from 'typeorm';
import {Tenant} from '../entity/tenant';

createConnection()
  .then(async connection => {
    const tenant = new Tenant();
    tenant.id = '00000000-0000-0000-0000-000000000000';
    tenant.tenantName = 'Test';
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tenant)
      .values(tenant)
      .onConflict(`("id") DO NOTHING`)
      .execute();

    console.log('Loading tenants from the database...');
    const tenants = await connection.manager.find(Tenant);
    console.log('Loaded tenants: ', tenants);
    await connection.close();
  })
  .catch(error => console.log(error));
