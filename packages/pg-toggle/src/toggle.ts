import { logger } from "@mvdlei/log";
import { Retry } from "@mvdlei/retry";
import { eq } from "drizzle-orm";

import { Client, IClientOptions } from "./client";
import { Migrator } from "./migrate";
import * as schema from "./schema";

export interface IToggle {
  /**
   * Create a set of toggles, creates the entities in the database provided
   * @param toggles
   */
  create<T extends Record<string, boolean>>(
    toggles: T,
  ): Promise<T & Record<string, boolean>>;

  /**
   * Get a toggle by name
   *
   * Returns false if the toggle does not exist, will log an error
   * @param name
   */
  get(name: string): Promise<boolean>;

  /**
   * Set a toggle by name, updates if it exists, creates if it does not
   * @param name
   * @param enabled
   */
  set(name: string, enabled: boolean): Promise<boolean>;
}

export class Toggle implements IToggle {
  private readonly client: Client;

  /**
   * This will run the required migrations and return a Toggle instance
   *
   * Make sure that your database is running and created before running this
   *
   * @example
   * ```ts
   * const t = await Toggle.init("postgres://postgres:postgres@localhost:5433/database");
   * ```
   * @param options
   * @returns
   */
  static async init(options: IClientOptions) {
    const migrator = Migrator.init(options);
    const r = Retry.init();
    await r.retry(
      async () => {
        logger.info("Attempting to run migrations");
        await migrator.migrate();
        logger.info("Successfully migrated");
      },
      { attempts: 3, delay: 1000 },
    );
    return new Toggle(options);
  }

  private constructor(options: IClientOptions) {
    this.client = Client.init(options);
  }

  async create<T extends Record<string, boolean>>(
    toggles: T,
  ): Promise<T & Record<string, boolean>> {
    const db = await this.client.make();
    const toggleNames = Object.keys(toggles);

    // if toggle does not exist, create it
    const mapInput = toggleNames.map((name) => ({ name, enabled: toggles[name] }));
    await db
      .insert(schema.toggle)
      .values([...mapInput])
      .onConflictDoNothing();

    const existingToggles = await db.query.toggle.findMany({});

    const mapped = existingToggles.map((t) => ({ [t.name]: t.enabled }));
    const merged = Object.assign({}, ...mapped);
    await this.client.close();
    return merged satisfies T & Record<string, boolean>;
  }

  async get(name: string): Promise<boolean> {
    try {
      const db = await this.client.make();
      const [toggle] = await db
        .select({
          enabled: schema.toggle.enabled,
        })
        .from(schema.toggle)
        .where(eq(schema.toggle.name, name))
        .limit(1);

      if (!toggle) throw new Error(`Toggle ${name} does not exist`);
      await this.client.close();
      return toggle.enabled;
    } catch (error) {
      logger.error(error);
      await this.client.close();
      return false;
    }
  }

  async set(name: string, enabled: boolean): Promise<boolean> {
    try {
      const db = await this.client.make();

      await db.insert(schema.toggle).values([{ name, enabled }]).onConflictDoUpdate({
        target: schema.toggle.name,
        set: {
          enabled,
        },
      });

      await this.client.close();
      return enabled;
    } catch (error) {
      logger.error(error);
      await this.client.close();
      return false;
    }
  }
}

// /**
//  * Test code:
//  */

// const main = async () => {
//   console.log("start");

//   const t = await Toggle.init(
//     "postgres://postgres:postgres@localhost:5433/suite-toggle",
//   );
//   const toggles = await t.create({
//     TEST_TOGGLE: false,
//   });

//   console.log(toggles);

//   const maybe = await t.get("NON_EXISTENT_TOGGLE");
//   console.log(maybe);

//   const newly = await t.set("NEW_TOGGLE", true);
//   console.log(newly);
// };
// main();
