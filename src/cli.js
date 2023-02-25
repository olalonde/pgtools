const yargs = require("yargs");
var { createdb, dropdb, PgtoolsError } = require("./");
const { env } = process;

function buildYargs() {
  return yargs
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
      // https://github.com/postgres/postgres/blob/master/src/bin/scripts/createdb.c#L176
      default: env.PGUSER || "",
      describe: "user name to connect as",
    })
    .option("password", {
      describe: "password to use when connecting",
    })
    .demand(1, "you must provide a database name")
    .help()
    .version();
}

function createCli(fn) {
  return () => {
    async function main() {
      const { argv } = buildYargs();
      const [dbName] = argv._;
      await fn(
        {
          host: argv.host,
          port: argv.port,
          user: argv.user,
          password: argv.password,
        },
        dbName
      );
    }
    main().catch((err) => {
      if (err instanceof PgtoolsError) {
        console.error(err.toString());
      } else {
        console.error(err);
      }
      process.exit(1);
    });
  };
}

module.exports = { createdb: createCli(createdb), dropdb: createCli(dropdb) };
