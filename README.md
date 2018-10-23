# Peerdom backend

Ecosystem of digital tools that helps organisations evolve as a decentralized, values-based collective of peers (backend)

## Setup

### Install deps

- NodeJS (see .nvmrc for which version) & run npm install
- PostgreSQL (10.x)

### Setup PostgreSQL user and Table

#### On Linux
```
sudo apt-get install postgresql
sudo su - postgres
createuser --pwprompt peerdom
createdb -O peerdom peerdom-test
```

#### On macOS
```
brew install postgresql
brew services start postgresql
createuser --pwprompt peerdom
createdb -O peerdom peerdom-test
```

### Enable plugins
```
CREATE EXTENSION "uuid-ossp";
CREATE EXTENSION pgcrypto;
```

## Config

Edit ormconfig.json and add the DB settings (user & password)

## Generating `schema.json`

```
apollo schema:download --endpoint=localhost:3000
```

## Generating TypeScript types from GraphQL schema

```
apollo codegen:generate --target typescript --addTypename --queries "./src/graphql/types/*.ts" --schema ./src/graphql/schema.ts
```

## Testing on the graphql playground

Here are proposed queries and mutations to test the data on the graphql playground

### Set auth header in the "Http Headers" tab (at the bottom)
```
{
  "Authorization": "63d919543f568fcb89b280eb2eb2c5"
}
```


### Read the `firstName` of all `peers`
```
{
  peers {firstName}
}
```


### Create a new `peer`
```
mutation {
  createPeer(
    peer: {firstName: "x", lastName: "x", displayName: "x"}
  ) {firstName}
}
```

## Running tests
- Make sure the server is running: `npm start`
- Run the tests `npm test`

## Deployment

The app is deployed via a `git push` to our deployment server (you need to be
on our :rocket: IP range to access the server, so hop in a VPN near by if
necessary).

When deploying the server will execute:
- `npm install`
- `npm start`

So any `pre` and `post` related command from the `package.json` will also be
executed.

Anything that should be done during the deployment should be part of those
command. Feel free to use the `scripts` folder to store complex script there.

## License

This work is currently all right reserved by Nothing AG. When we will be close
to a release we will license this work under the Business Source License 1.1.
You can [subscribe to this pull
request](https://github.com/peerdom/peerdom-backend/pull/2) if you want to
follow the situation.

The gist of the BSL 1.1 is:
* The source code will always remain available
* Each version of the software will be proprietary and under an usage limit
  **for 3 years**
* At the 3 years anniversary of the version, the version will **automatically
  be relicensed under the AGPLv3**
