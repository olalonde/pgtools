module.exports = function () {
  return require("yargs")
    .usage("$0 [options] <dbname>")
    .option("host", {
      alias: "h",
      default: "127.0.0.1",
      describe: "database server host or socket directory",
    })
    .option("port", {
      alias: "p",
      default: 5432,
      describe: "database server port",
    })
    .option("user", {
      alias: "u",
      default: "postgres",
      describe: "user name to connect as",
    })
    .option("password", {
      describe: "password to use when connecting",
    })
    .option("silent", {
      default: false,
      describe: "should we output to stdout",
    })
    .demand(1, "you must provide a database name")
    .help()
    .version();
};
