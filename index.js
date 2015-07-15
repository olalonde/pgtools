var pg = require('pg');
var Client = pg.Client;

var errNames = {
  '42P04': 'duplicate_database',
  '3D000': 'invalid_catalog_name'
};

function createOrDropDatabase(action) {
  action = action.toUpperCase();
  return function (config, dbName, cb) {
    config.database = 'postgres';
    var client = new Client(config);
    //disconnect client when all queries are finished
    client.on('drain', client.end.bind(client));
    client.on('error', function () {});
    client.connect();

    var escapedDbName = dbName.replace(/\"/g, '""');
    client.query(action + ' DATABASE "' + escapedDbName + '"', function (pgErr, res) {
      var err;
      if (pgErr) {
        err = new Error();
        err = {
          name: errNames[pgErr.code],
          pgErr: pgErr
        };
      }
      cb(err, res);
    });
  };
};

module.exports = {
  createdb: createOrDropDatabase('create'),
  dropdb: createOrDropDatabase('drop')
};
