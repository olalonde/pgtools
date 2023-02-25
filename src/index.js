const { once } = require("events");
const parse = require("pg-connection-string").parse;
const pg = require("pg");
const Client = pg.Client;
const ADMIN_DB = "postgres";

const knownErrors = {
  "42P04": {
    name: "duplicate_database",
    message: "Attempted to create a duplicate database.",
  },
  "3D000": {
    name: "invalid_catalog_name",
    message: "Attempted to drop a database that does not exist.",
  },
  23505: {
    name: "unique_violation",
    message: "Attempted to create a database concurrently.",
  },
  55006: {
    name: "drop_database_in_use",
    message:
      "Attempted to drop a database that is being accessed by other users",
  },
};

class PgError extends Error {
  constructor(error) {
    super();
    this.cause = error;
    const { name, message } = knownErrors[error.code] || {
      name: "PgError",
      message: error.message,
    };
    this.message = message;
    this.name = name;
  }
}

function isPgError(err) {
  return err instanceof Error && "code" in err && "message" in err;
}

function createFunction(action) {
  return async function (opts_, dbName) {
    if (!dbName) throw new TypeError("dbName not set");
    const opts = typeof opts_ === "string" ? parse(opts_) : opts_;

    const config = {
      database: ADMIN_DB,
      ...opts,
    };
    const client = new Client(config);
    try {
      await client.connect();
      const escapedDatabaseName = dbName.replace(/\"/g, '""');
      const sql = `${action} DATABASE "${escapedDatabaseName}"`;
      const result = await client.query(sql);
      return result;
    } catch (err) {
      // wrap errors
      if (isPgError(err)) {
        throw new PgError(err);
      }
      throw err;
    } finally {
      client.end();
    }
  };
}

module.exports = {
  PgError,
  createdb: createFunction("CREATE"),
  dropdb: createFunction("DROP"),
};