# pgtools

[![Build
Status](https://travis-ci.org/olalonde/pgtools.svg?branch=master)](https://travis-ci.org/olalonde/pgtools)

Pure Node.js implementation of PostgreSQL's
[createdb](http://www.postgresql.org/docs/9.4/static/app-createdb.html)
and
[dropdb](http://www.postgresql.org/docs/9.4/static/app-dropdb.html)
tools.

Only supports connection options and database name at the moment.

# Install

```bash
npm install --save pgtools
```

# Example

```javascript
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

pgtools.cloneTemplate(config, dbname, templateName [, cb(err)])

* _object_ __config__

    An object with user, password, port, and host properties.

* _string_ __dbname__

    The name of the database to create.

* _string_ __templateName__
    
    Name of the template to clone from.

* _function_ __cb__

    A callback that takes an error argument.
