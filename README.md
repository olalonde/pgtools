# pgtools

[![Build
Status](https://github.com/olalonde/pgtools/actions/workflows/nodejs.yml/badge.svg)](https://github.com/olalonde/pgtools/actions/workflows/nodejs.yml)
[![Coverage Status](https://coveralls.io/repos/github/olalonde/pgtools/badge.svg?branch=master)](https://coveralls.io/github/olalonde/pgtools?branch=master)

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

## Library Example

```javascript
const { createdb, dropdb } = require("pgtools");

// This can also be a connection string
// (in which case the database part is ignored and replaced with postgres)

const config = {
  user: "postgres",
  password: "some pass",
  port: 5432,
  host: "localhost",
};

await createdb(config, "test-db");
await dropdb(config, "test-db");
```

# Usage

`createdb(config, dbname): Promise<void>`

`dropdb(config, dbname): Promise<void>`

- _object_ **config**

  An object with user, password, port, and host properties. This can
  also be a node-postgres compatible connection string.

- _string_ **dbname**

  The name of the database to create.

## Bins

`pgtools` installs two useful binaries:

- `createdbjs`: which emulates pgtools' `createdb` functionality.
- `dropdbjs`: which emulates pgtools' `dropdb` functionality.

## Node.js support

We support all LTS versions from 10 and up. We try to keep up with the latest Node.js version.
