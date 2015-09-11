var pg = require('pg');
var Client = pg.Client;

var errNames = {
  '42P04': 'duplicate_database',
  '3D000': 'invalid_catalog_name',
  '28000': 'connection_error'
};

function error(pgErr) {
  var err = new Error();
  err = {
    name: errNames[pgErr.code],
    pgErr: pgErr
  };
  return err;
}

function createOrDropDatabase(action) {
  var err;
  action = action.toUpperCase();
  return function (config, dbName, cb) {
    if (!config.database) {
      config.database = 'postgres';
    }
    var client = new Client(config);
    //disconnect client when all queries are finished
    client.on('drain', client.end.bind(client));
    client.on('error', function (pgErr) {
      if (pgErr) {
        err = error(pgErr);
        cb(err);
      }
    });
    client.connect();

    var escapedDbName = dbName.replace(/\"/g, '""');
    client.query(action + ' DATABASE "' + escapedDbName + '"', function (pgErr, res) {
      if (pgErr) {
        err = error(pgErr);
      }
      cb(err, res);
    });
  };
};

module.exports = {
  createdb: createOrDropDatabase('create'),
  dropdb: createOrDropDatabase('drop')
};
