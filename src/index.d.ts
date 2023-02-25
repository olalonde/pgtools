import { ConnectionConfig, DatabaseError, QueryResult } from "pg";

export class PgtoolsError extends Error {
  constructor(cause: DatabaseError);
  name: string;
  message: string;
  cause: DatabaseError;
}

type Opts = string | ConnectionConfig;

export declare function createdb(
  opts_: Opts,
  dbName: string
): Promise<QueryResult<any>>;

export declare function dropdb(
  opts_: Opts,
  dbName: string
): Promise<QueryResult<any>>;
