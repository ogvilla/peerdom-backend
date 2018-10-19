#! /usr/bin/env bash

# This check if we have a DATABASE URL in the environment.
# If so, that mean we are on dokku
if test ! -z ${DATABASE_URL+x};
then
  cp config/ormconfig.dokku.js ormconfig.js
# Otherwise we copy the ormconfig sample
elif ! test -f ormconfig.json; then
  cp config/ormconfig-example.json ormconfig.json;
fi
