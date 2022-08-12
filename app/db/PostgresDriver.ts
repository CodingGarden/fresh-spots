// THANK YOU Omar2205! Code from here: https://gist.github.com/omar2205/cd42feccf25cff845b50ec2397eba18f
// TODO: Use a library or extract this to a reusable library instead

import { Client } from "postgres";
import {
  CompiledQuery,
  DatabaseConnection,
  Driver,
  QueryResult,
  TransactionSettings,
} from "kysely";

type QueryArguments = unknown[] | Record<string, unknown>;

export default class PostgresDriver implements Driver {
  readonly #connectionMutex = new ConnectionMutex();

  #client?: Client;
  #connection?: DatabaseConnection;

  db_conn_info: string; // db_conn_info postgres uri. Change to postgres connection info

  constructor(conn_info: string) {
    this.db_conn_info = conn_info;
  }

  init(): Promise<void> {
    this.#client = new Client(this.db_conn_info);
    this.#connection = new PgConnection(this.#client);
    return Promise.resolve();
  }

  async acquireConnection(): Promise<DatabaseConnection> {
    await this.#connectionMutex.lock();
    return this.#connection!;
  }

  async beginTransaction(
    connection: DatabaseConnection,
    _settings: TransactionSettings,
  ): Promise<void> {
    await connection.executeQuery(CompiledQuery.raw("begin"));
  }

  async commitTransaction(connection: DatabaseConnection): Promise<void> {
    await connection.executeQuery(CompiledQuery.raw("commit"));
  }

  async rollbackTransaction(connection: DatabaseConnection): Promise<void> {
    await connection.executeQuery(CompiledQuery.raw("rollback"));
  }

  releaseConnection(): Promise<void> {
    this.#connectionMutex.unlock();
    return Promise.resolve();
  }

  destroy(): Promise<void> {
    this.#client?.end();
    return Promise.resolve();
  }
}

class PgConnection implements DatabaseConnection {
  readonly #db: Client;

  constructor(c: Client) {
    this.#db = c;
  }

  async executeQuery<R>(compiledQuery: CompiledQuery): Promise<QueryResult<R>> {
    const { sql, parameters } = compiledQuery;
    const { rows } = await this.#db.queryObject(
      sql,
      parameters as QueryArguments,
    );

    return Promise.resolve({
      rows: rows as [],
    });
  }
}

class ConnectionMutex {
  #promise?: Promise<void>;
  #resolve?: () => void;

  async lock(): Promise<void> {
    while (this.#promise) {
      await this.#promise;
    }

    this.#promise = new Promise((resolve) => {
      this.#resolve = resolve;
    });
  }

  unlock(): void {
    const resolve = this.#resolve;

    this.#promise = undefined;
    this.#resolve = undefined;

    resolve?.();
  }
}
