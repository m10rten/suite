import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

export type IClientOptions = Parameters<typeof postgres>[0];
export interface IClient {}
export class Client implements IClient {
  private db: PostgresJsDatabase<typeof schema> | undefined;
  private connection: ReturnType<typeof postgres> | undefined;
  static init(options: IClientOptions) {
    return new Client(options);
  }
  private constructor(private readonly options: IClientOptions) {}

  async make() {
    if (!this.db || !this.connection) {
      this.db = await this.connect();
    }
    return this.db;
  }

  async connect() {
    this.connection = postgres(this.options);
    this.db = drizzle(this.connection, { schema });
    return this.db;
  }

  async close() {
    if (!this.connection) return;
    await this.connection.end();
    this.connection = undefined;
    this.db = undefined;
  }
}
