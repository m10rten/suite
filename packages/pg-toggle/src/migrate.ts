import { migrate } from "drizzle-orm/postgres-js/migrator";

import { Client, IClientOptions } from "./client";

export class Migrator {
  private readonly client: Client;
  static init(options: IClientOptions) {
    return new Migrator(options);
  }

  constructor(options: IClientOptions) {
    this.client = Client.init(options);
  }

  async migrate() {
    const db = await this.client.connect();
    await migrate(db, {
      migrationsFolder: "./drizzle",
    });
  }
}
