import {createConnection} from 'typeorm';
import * as fs from 'fs';
/*
Hardcoded ids scheme:
Peer => 10000000-0000-0000-0000-XXXXXXXXXXXX
Tenant => 20000000-0000-0000-0000-XXXXXXXXXXXX
User => 30000000-0000-0000-0000-XXXXXXXXXXXX
Node (circle) => 40000000-1000-0000-0000-XXXXXXXXXXXX
Node (core-role) => 40000000-2000-0000-0000-XXXXXXXXXXXX
Node (role) => 40000000-3000-0000-0000-XXXXXXXXXXXX
*/

// WARNING: order of jsonFileNames is important due to foreign keys
const entitiesToLoad = [
  {name: 'Tenant', jsonFileNames: ['tenants']},
  {name: 'Peer', jsonFileNames: ['peers']},
  {name: 'Mission', jsonFileNames: ['missions']},
  {name: 'Node', jsonFileNames: ['coreRoles', 'circles/GC', 'circles/finances_admin']},
  {name: 'User', jsonFileNames: ['user']},
  {name: 'Token', jsonFileNames: ['token']},
  {name: 'RoleHolding', jsonFileNames: ['circles/GC_holders', 'circles/finances_admin_holders']}
];

/*
 * This script is inspired by https://github.com/jgordor
 * https://github.com/nestjs/nest/issues/409#issuecomment-364639051
*/

async function loadAll(connection) {
  console.log('===== LOAD DATA =====');
  try {
    for (const entityToLoad of entitiesToLoad) {
      const repository = await connection.getRepository(entityToLoad.name);
      for (const jsonFileName of entityToLoad.jsonFileNames) {
        const fixtureFile = `src/fixtures/${jsonFileName}.json`;
        if (fs.existsSync(fixtureFile)) {
          console.log(`Uploading content of ${jsonFileName}.json`);
          const items = JSON.parse(fs.readFileSync(fixtureFile, 'utf8'));
          await repository
            .createQueryBuilder(entityToLoad.name)
            .insert()
            .values(items)
            .execute();
        }
      }
      console.log(`Entity ${entityToLoad.name} loaded`);
    }
  } catch (error) {
    throw new Error(`ERROR Loading fixtures on test db: ${error}`);
  }
}

async function cleanAll(connection) {
  return connection.synchronize(true);
}

(async () => {
  try {
    const connection = await createConnection();
    try {
      await cleanAll(connection);
      await loadAll(connection);
      await connection.close();
    } catch (error) {
      await connection.close();
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
})();
