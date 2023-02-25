const { createdb, dropdb } = require("./");

const config = process.env.PG_CONNECTION_STRING || {
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || process.env.USER || "postgres",
};

function validateError(err, name) {
  if (!(err instanceof Error)) {
    throw new Error("The error should be an Error instance");
  }
  if (!err.message) {
    throw new Error("The error should have a message property");
  }
  if (err.name !== name) {
    throw new Error(`The error name should be ${name}`, { cause: err });
  }
}

async function test() {
  console.log("dropdb");
  await dropdb(config, "pgtools-test").catch(() => {
    // might throw an error if first time test is run
    // we can ignore
  });
  console.log("createdb");
  await createdb(config, "pgtools-test");
  try {
    console.log("createdb (error)");
    await createdb(config, "pgtools-test");
    throw new Error("Creating an existing database should return an error");
  } catch (err) {
    validateError(err, "duplicate_database");
  }
  console.log("dropdb");
  await dropdb(config, "pgtools-test");
  try {
    console.log("dropdb (error)");
    await dropdb(config, "pgtools-test");
    throw new Error("Dropping an nonexistent database should return an error");
  } catch (err) {
    validateError(err, "invalid_catalog_name");
  }
  console.log("All tests pass");
}

test().catch((err) => {
  console.error(err);
  process.exit(1);
});
