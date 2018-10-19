import {createConnection} from 'typeorm';
import * as fs from 'fs';

/*
 * This script is inspired by https://github.com/jgordor
 * https://github.com/nestjs/nest/issues/409#issuecomment-364639051
*/
async function getEntities(connection) {
  console.log('===== GET ENTITIES =====');
  const entities = [];
  (await connection.entityMetadatas).forEach(entity => {
    console.log('Found entity ' + entity.name);
    entities.push({name: entity.name, tableName: entity.tableName});
  });
  return entities;
}

async function loadAll(connection, entities) {
  try {
    for (const entity of entities) {
      const repository = await connection.getRepository(entity.name);
      const fixtureFile = `src/fixtures/${entity.name}.json`;
      if (fs.existsSync(fixtureFile)) {
        const items = JSON.parse(fs.readFileSync(fixtureFile, 'utf8'));
        if (!(Object.keys(items).length === 0 && items.constructor === Object)) {
          console.log('Entity ' + entity.name + ' loading ' + JSON.stringify(items));
          await repository
            .createQueryBuilder(entity.name)
            .insert()
            .values(items)
            .execute();
        }
      }
    }
  } catch (error) {
    throw new Error(`ERROR Loading fixtures on test db: ${error}`);
  }
}

(async () => {
  console.log('===== LOAD DATA =====');
  try {
    const connection = await createConnection();

    connection.synchronize(true).then(async res => {
      const entities = await getEntities(connection);
      await loadAll(connection, entities);
      await connection.close();
    });
  } catch (error) {
    console.log(error);
  }
})();
