var BPromise = require('bluebird');
var parse = require('pg-connection-string').parse;
var pg = require('pg');
var Client = pg.Client;

var errNames = {
  '42P04': 'duplicate_database',
  '3D000': 'invalid_catalog_name'
};

function createOrDropDatabase(action) {
  action = action.toUpperCase();
  return function (opts, dbName, cb) {
    var config
    if (typeof opts === 'string') {
      config = parse(opts);
      config.database = 'postgres';
    } else {
      if (!opts.database) {
        opts.database = 'postgres';
      }
      config = opts;
    }
    return new BPromise(function (resolve, reject) {
      var client = new Client(config);
      //disconnect client when all queries are finished
      client.on('drain', client.end.bind(client));
      client.on('error', function (err) {
        reject(err);
      });
      client.connect();

      var escapedDbName = dbName.replace(/\"/g, '""');
      var sql = action + ' DATABASE "' + escapedDbName + '"';
      client.query(sql, function (pgErr, res) {
        var err;
        if (pgErr) {
          err = new Error();
          err = {
            name: errNames[pgErr.code],
            pgErr: pgErr
          };
        }
        if (err) return reject(err);
        resolve(res);
      });
    }).nodeify(cb);
  };
};

module.exports = {
  createdb: createOrDropDatabase('create'),
  dropdb: createOrDropDatabase('drop')
};
