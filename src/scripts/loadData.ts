import {createConnection} from 'typeorm';
import * as fs from 'fs';

const entitiesNameToLoad = ['Tenant', 'Peer', 'Mission'];

/*
 * This script is inspired by https://github.com/jgordor
 * https://github.com/nestjs/nest/issues/409#issuecomment-364639051
*/
async function getEntities(connection) {
  console.log('===== GET ENTITIES =====');
  const entities = [];
  (await connection.entityMetadatas).forEach(entity => {
    if (!entitiesNameToLoad.includes(entity.name)) {
      console.log('Entity ' + entity.name + ' has no fixtures');
    }
  });
  return entities;
}

async function loadAll(connection, entities) {
  console.log('===== LOAD DATA =====');
  try {
    for (const entityName of entitiesNameToLoad) {
      const repository = await connection.getRepository(entityName);
      const fixtureFile = `src/fixtures/${entityName}.json`;
      if (fs.existsSync(fixtureFile)) {
        const items = JSON.parse(fs.readFileSync(fixtureFile, 'utf8'));
        await repository
          .createQueryBuilder(entityName)
          .insert()
          .values(items)
          .execute();
        console.log('Entity ' + entityName + ' loaded');
      }
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
      const entities = await getEntities(connection);
      await cleanAll(connection);
      await loadAll(connection, entities);
      await connection.close();
    } catch (error) {
      await connection.close();
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
})();
