# pgtools

Pure Node.js implementation of PostgreSQL's
[createdb](http://www.postgresql.org/docs/9.4/static/app-createdb.html)
and
[dropdb](http://www.postgresql.org/docs/9.4/static/app-dropdb.html)
tools.

Only supports connection options and database name at the moment.

# Install

```
npm install --save pgtools
```

# Example

```
var pgtools = require('pgtools');
pgtools.createdb({
  user: 'postgres',
  password: 'some pass',
  port: 5432,
  host: 'localhost'
}, 'test-db', function (err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(res);
});
```

# Usage

pgtools.createdb(config, dbname [, cb(err)])
pgtools.dropdb(config, dbname [, cb(err)])

* _object_ __config___

    An object with user, password, port, and host properties.

* _string_ __dbname__

    The name of the database to create.

* _function __cb__

    A callback that takes an error argument.
