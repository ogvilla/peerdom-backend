import * as jest from 'ts-jest';
import * as request from 'superagent';

test('graphql: retrieve peers', done => {
  request
    .post('http://localhost:3000/graphql')
    .send({
      operationName: null,
      variables: {},
      query: `
        {
          peers {
            id
            displayName
            firstName
            lastName
          }
        }
      `
    })
    .set('Authorization', '63d919543f568fcb89b280eb2eb2c5')
    .end((err, res) => {
      expect(res.status).toBe(200);
      const data = res.body.data;
      expect(data.peers).toBeDefined();
      expect(data.peers.length).toBe(10);

      for (const peer of data.peers) {
        expect(typeof peer.id).toEqual('string');
        expect(typeof peer.displayName).toEqual('string');
        expect(typeof peer.firstName).toEqual('string');
        expect(typeof peer.lastName).toEqual('string');
        expect(Object.keys(peer).length).toEqual(4);
      }

      done();
    });
});
