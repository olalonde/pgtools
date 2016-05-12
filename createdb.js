#!/usr/bin/env node
var createdb = require('./').createdb;
var program = require('commander');

program
  .usage('[options] <dbname>')
  .option('-h, --host', 'database server host or socket directory')
  .option('-p, --port', 'database server port')
  .option('-U, --username', 'user name to connect as')
  .parse(process.argv);

function die (err) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
}

