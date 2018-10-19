# peerdom-backend

ecosystem of digital tools that helps organisations evolve as a decentralized, values-based collective of peers (backend)

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

If get `'function uuid_generate_v4() does not exist'.` Connect to 'peerdom-test' and execute `CREATE EXTENSION "uuid-ossp";`

## Config

Edit ormconfig.json and add the DB settings (user & password)

## Testing on the graphql playground

Here are proposed queries and mutations to test the data on the graphql playground


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
