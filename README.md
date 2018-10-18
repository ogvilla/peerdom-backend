# peerdom-backend

ecosystem of digital tools that helps organisations evolve as a decentralized, values-based collective of peers (backend)

# Setup

## Install deps

- NodeJS (see .nvmrc for which version) & run npm install
- PostgreSQL (10.x)

## Setup PostgreSQL user and Table

    sudo su - postgres
    createuser --pwprompt peerdom
    createdb -O peerdom peerdom-test

### On macOS

```
brew install postgresql
brew services start postgresql
createuser --pwprompt peerdom
createdb -O peerdom peerdom-test
```

If get `'function uuid_generate_v4() does not exist'.` Connect to 'peerdom-test' and execute `CREATE EXTENSION "uuid-ossp";`

## Config

Edit ormconfig.json and add the DB settings (user & password)
