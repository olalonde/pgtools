const assert = require("assert");
const { createdb, dropdb, PgtoolsError } = require("../");

const config = process.env.PG_CONNECTION_STRING || {
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || process.env.USER || "postgres",
};

/**
 * @param {string} name
 */
function validateError(name) {
  /**
   * @param {PgtoolsError} err
   */
  return (err) => {
    assert.ok(err instanceof PgtoolsError);
    assert.equal(err.name, name);
    return true;
  };
}

async function test() {
  console.log("dropdb");
  await dropdb(config, "pgtools-test").catch(() => {
    // might throw an error if first time test is run
    // we can ignore
  });
  console.log("createdb");
  await createdb(config, "pgtools-test");
  console.log("createdb (db already exists error)");
  await assert.rejects(
    createdb(config, "pgtools-test"),
    validateError("duplicate_database")
  );
  console.log("dropdb");
  await dropdb(config, "pgtools-test");
  console.log("dropdb (db does not exist error)");
  await assert.rejects(
    dropdb(config, "pgtools-test"),
    validateError("invalid_catalog_name")
  );
  console.log("All tests pass");
}

test().catch((err) => {
  console.error(err);
  process.exit(1);
});
