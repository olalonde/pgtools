#!/usr/bin/env node
var dropdb = require('./').dropdb;
var yargs = require('./lib/build-yargs')()
var argv = yargs.argv;

dropdb({
  host: argv.host,
  port: argv.port,
  user: argv.user,
  password: argv.password
}, argv._[0], function (err, res) {
  if (err) die(err, argv)
  else if (!argv.silent) console.log('dropped database "' + argv._[0] + '"')
})

function die (err, argv) {
  if (err) {
    if (!argv.silent) console.log(err.pgErr ? err.pgErr.toString() : err.toString());
    process.exit(-1);
  }
}
