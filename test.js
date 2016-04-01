var createdb = require('./').createdb;
var dropdb = require('./').dropdb;
var cloneTemplate = require('./').cloneTemplate;

function die(err) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
}

var config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

dropdb(config, 'pgtools-test', function(err, res) {
  // ignore errors in case test was never run before
  createdb(config, 'pgtools-test', function(err, res) {
    die(err);
    createdb(config, 'pgtools-test', function(err, res) {
      if (!err || err.name !== 'duplicate_database') {
        die('Creating an existing database should return an error');
      }
      cloneTemplate(config, 'pgtools-test-template', 'sanderman_db_template', function(err, res) {
        die(err);
        dropdb(config, 'pgtools-test-template', function(err, res) {
          die(err);
          dropdb(config, 'pgtools-test', function(err, res) {
            die(err);
            dropdb(config, 'pgtools-test', function(err, res) {
              if (!err || err.name !== 'invalid_catalog_name') {
                die('Dropping an nonexistent database should return an error');
              }
              console.log('tests pass');
              process.exit();
            });
          });
        });
      });
    });
  });
});
