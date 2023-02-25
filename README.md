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

```typescript
createdb(config: string | pg.ConnectionConfig, dbname: string): Promise<pg.QueryResult<any>>;
dropdb(config:  string | pg.ConnectionConfig, dbname: string): Promise<pg.QueryResult<any>>;
```

See [./src/index.d.ts](./scr/index.d.ts) for types.

See [pg documentation](https://node-postgres.com/apis/client) for `ConnectionConfig` format.

More usage examples in [./src/test.js](./src/test.js).

## Bins

`pgtools` installs two useful binaries:

- `createdbjs`: which emulates pgtools' `createdb` functionality.
- `dropdbjs`: which emulates pgtools' `dropdb` functionality.

## Node.js support

We support all LTS versions from 10 and up. We try to keep up with the latest Node.js version.
