# pgtools

[![Build
Status](https://github.com/olalonde/pgtools/actions/workflows/nodejs.yml/badge.svg)](https://github.com/olalonde/pgtools/actions/workflows/nodejs.yml)
[![Coverage Status](https://coveralls.io/repos/github/olalonde/pgtools/badge.svg?branch=master)](https://coveralls.io/github/olalonde/pgtools?branch=master)
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)
![Standard Version](https://img.shields.io/badge/ethics-contribute%20instead%20of%20complaining-brightgreen.svg)


Pure Node.js implementation of PostgreSQL's
[createdb](https://www.postgresql.org/docs/current/app-createdb.html)
and
[dropdb](https://www.postgresql.org/docs/current/app-dropdb.html)
tools.

Only supports connection options and database name at the moment.

## Install

```bash
npm install --save -g pgtools
```

## CLI Example

```bash
createdbjs my_awesome_db --user=admin --password=admin
```

## Programatic Example

```javascript
const pgtools = require('pgtools');

// This can also be a connection string
// (in which case the database part is ignored and replaced with postgres)

const config = {
  user: 'postgres',
  password: 'some pass',
  port: 5432,
  host: 'localhost'
}

pgtools.createdb(config, 'test-db', function (err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(res);

  pgtools.dropdb(config, 'test-db', function (err, res) {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    console.log(res);
  });
});
// a promise API is also available if cb is omitted
```

# Usage

`pgtools.createdb(config, dbname [, cb(err)])`

`pgtools.dropdb(config, dbname [, cb(err)])`

* _object_ __config__

    An object with user, password, port, and host properties. This can
    also be a node-postgres compatible connection string.

* _string_ __dbname__

    The name of the database to create.

* _function_ __cb__

    A callback that takes an error argument. If cb is omitted the
    function will return a Promise.

## Bins

`pgtools` installs two useful binaries:

* `createdbjs`: which emulates pgtools' `createdb` functionality.
* `dropdbjs`: which emulates pgtools' `dropdb` functionality.

## Node.js support

We support all LTS versions from 6 and up. We try to keep up with the latest Node.js version.

## Releasing

Rather than manually running `npm version <patch|minor|major>`, instead run:

```
npm run release
```

This will automatically generating a CHANGELOG, and bump your package version
based on [the angular commit format](https://github.com/conventional-changelog/conventional-changelog-angular/blob/master/convention.md).
