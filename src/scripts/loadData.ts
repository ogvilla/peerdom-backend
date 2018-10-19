import {createConnection} from 'typeorm';
import * as fs from 'fs';

const entitiesToLoad = [
  {name: 'Tenant', jsonFileNames: ['tenants']},
  {name: 'Peer', jsonFileNames: ['peers']},
  {name: 'Mission', jsonFileNames: ['missions']},
  {name: 'Node', jsonFileNames: ['coreRoles']},
  {name: 'User', jsonFileNames: ['user']},
  {name: 'Token', jsonFileNames: ['token']}
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
