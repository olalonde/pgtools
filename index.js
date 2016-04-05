var BPromise = require('bluebird');
var pg = require('pg');
var Client = pg.Client;

var errNames = {
  '42P04': 'duplicate_database',
  '3D000': 'invalid_catalog_name'
};

function createOrDropDatabase(action) {
  action = action.toUpperCase();
  return function (config, dbName) {

    var args = Array.prototype.slice.call(arguments);
    var cb;

    if(typeof args[args.length - 1] === 'function') {
      cb  = args.pop();
    }

    return new BPromise(function (resolve, reject) {
      if (!config.database) {
        config.database = 'postgres';
      }
      var client = new Client(config);
      //disconnect client when all queries are finished
      client.on('drain', client.end.bind(client));
      client.on('error', function (err) {
        reject(err);
      });
      client.connect();

      var escapedDbName = dbName.replace(/\"/g, '""');
      var sql = action + ' DATABASE "' + escapedDbName + '"';
      if(action === 'CLONE_TEMPLATE') {
        sql = 'CREATE DATABASE "' + escapedDbName + '" WITH TEMPLATE "' + args[args.length - 1].replace(/\"/g, '""') + '"';
      }
      client.query(sql, function (pgErr, res) {
        var err;
        if (pgErr) {
          err = new Error();
          err = {
            name: errNames[pgErr.code],
            pgErr: pgErr
          };
        }
        client.end();
        if (err) return reject(err);
        resolve(res);
      });
    }).nodeify(cb);
  };
};

module.exports = {
  createdb: createOrDropDatabase('create'),
  dropdb: createOrDropDatabase('drop'),
  cloneTemplate: createOrDropDatabase('clone_template')
};
