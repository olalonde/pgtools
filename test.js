var createdb = require('./').createdb;
var dropdb = require('./').dropdb;

function die (err) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
}

var config = {
  hostname: 'localhost'
};

dropdb(config, 'pgtools-test', function (err, res) {
  // ignore errors in case test was never run before
  createdb(config, 'pgtools-test', function (err, res) {
    die(err);
    createdb(config, 'pgtools-test', function (err, res) {
      if (!err || err.name !== 'duplicate_database') {
        die('Creating an existing database should return an error');
      }
      dropdb(config, 'pgtools-test', function (err, res) {
        die(err);
        dropdb(config, 'pgtools-test', function (err, res) {
          if (!err || err.name !== 'invalid_catalog_name') {
            die('Dropping an nonexistent database should return an error');
          }
          process.exit();
        });
      });
    });
  });
});

