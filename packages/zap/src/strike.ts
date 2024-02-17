/* eslint-disable no-console */
import type { WithRequired } from "@mvdlei/types";
import { z } from "zod";

import { HttpMethods, Zap, type ZapOptions } from "./zap";

type Azod = z.ZodTypeAny;

export interface IStrike {
  /**
   * Create a new StrikeRequest instance to make requests on a model.
   * @param path - Path to the endpoint for this model, e.g. `/users` for User model
   * @param model - Zod model for this model, e.g. `z.object({ id: z.string(), name: z.string() })` for User model
   * @returns {IStrikeRequest<TModel>} - StrikeRequest instance
   */
  make: <TModel extends Azod>(path: string, model: TModel) => IStrikeRequest<TModel>;
}

// export type NotAvailableOrOptions<I extends Azod, O extends Azod> =
//   | {
//       available: false;
//     }
//   | ({
//       available?: true | null | undefined;
//     } & Partial<DefineOptions<I, O>>);

export type StrikeRequestOptions<I extends Azod, O extends Azod> = RoutesOptions<I, O>;

type Route<I extends Azod, O extends Azod> = {
  input?: I;
  output?: O;
};

export type RoutesOptions<I extends Azod, O extends Azod> = {
  get?: Partial<Route<I, O>>;
  new?: Partial<Route<I, O>>;
  list?: Partial<Route<I, O>>;
  update?: Partial<Route<I, O>>;
  delete?: Partial<Route<I, O>>;
};

export type IStrikeOptions = WithRequired<Partial<ZapOptions>, "origin">;

/**
 * Strike is a class that allows you to make requests to a single endpoint.
 *
 * @class Strike
 * @implements {IStrike}
 */
export class Strike {
  private zap: Zap;

  constructor(options?: IStrikeOptions) {
    this.zap = Zap.init(options);
  }

  make<TModel extends Azod, TInput extends Azod = TModel, TOutput extends Azod = TModel>(
    path: string,
    model: TModel,
    options?: Partial<RoutesOptions<TInput, TOutput>>,
  ) {
    return new StrikeRequest(this.zap, path, model, options);
  }
}

export interface IStrikeRequest<
  TModel extends Azod,
  // TInput extends Azod = TModel,
  // TOutput extends Azod = TModel,
> {
  /**
   * Get a single item
   * @param id - Item id
   * @returns {Promise<z.TypeOf<TModel>>} - Item
   */
  get: (id: string) => Promise<z.TypeOf<TModel>>;

  /**
   * Create a new item
   * @param input - Item input
   * @returns {Promise<z.TypeOf<TModel>>} - Created item
   */
  new: (input: z.infer<TModel>) => Promise<z.TypeOf<TModel>>;

  /**
   * List items
   * @param options - List options (limit, offset)
   * @returns {Promise<z.TypeOf<TModel>[]>} - List of items
   */
  list: (options: Partial<ListOptions>) => Promise<z.TypeOf<TModel>[]>;

  /**
   * Update an item
   * @param id - Item id
   * @param input - Item input
   * @returns {Promise<z.TypeOf<TModel>>} - Updated item
   */
  update: (id: string, input: Partial<TModel>) => Promise<z.TypeOf<TModel>>;

  /**
   * Delete an item
   * @param id - Item id
   * @returns {Promise<void>} - Void
   */
  delete: (id: string) => Promise<void>;
}
export interface ListOptions {
  limit?: number;
  offset?: number;
}

export class StrikeRequest<
  TModel extends Azod,
  TInput extends Azod = TModel,
  TOutput extends Azod = TModel,
> implements IStrikeRequest<TModel>
{
  constructor(
    private zap: Zap,
    private path: string,
    private model: TModel,
    private options?: StrikeRequestOptions<TInput, TOutput>,
  ) {}

  get = async (id: string) => {
    return this.zap.define(`${this.path}/${id}`, {
      method: HttpMethods.GET,
      output: this.options?.get?.output ?? this.model,
    })();
  };

  new = async (input: Omit<z.infer<TModel>, "id">) => {
    return this.zap.define(this.path, {
      method: HttpMethods.POST,
      input: this.options?.new?.input ?? this.model,
      output: this.options?.new?.output ?? this.model,
    })(input);
  };

  list = async (options?: Partial<ListOptions>) => {
    const res = await this.zap.define(this.path, {
      method: HttpMethods.GET,
      output: z.array(this.model),
    })();
    if (!options?.offset && !options?.limit) return res;
    if (!options?.offset) return res.slice(0, options.limit);
    if (!options?.limit) return res.slice(options.offset);
    return res.slice(options.offset, options.offset + options.limit);
  };

  delete = async (id: string) => {
    return this.zap.define(`${this.path}/${id}`, {
      method: HttpMethods.DELETE,
      output: z.void(),
    })();
  };

  update = async (id: string, input: Partial<z.infer<TModel>>) => {
    return this.zap.define(`${this.path}/${id}`, {
      method: HttpMethods.PUT,
      input: this.model.optional(),
      output: this.options?.update?.output ?? this.model,
    })(input);
  };
}

/**
 * Makes a new Strike instance
 *
 * There is no singleton instance of Strike as `zap`, because you are required to pass the `baseUrl` option and it should be unique per instance and should not be changed after initialization.
 *
 * @param {WithRequired<Partial<IZapOptions>, "baseUrl">} options - Zap options
 * @returns {Strike} - Strike instance
 */
export default Strike;

/**
 * Test code:
 */
const s = new Strike({
  origin: "https://jsonplaceholder.typicode.com",
});

const a = s.make(
  "/todos",
  z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    completed: z.boolean(),
  }),
  {
    new: {
      input: z.object({
        userId: z.number(),
        title: z.string(),
        completed: z.boolean(),
      }),
      output: z.object({
        id: z.number(),
      }),
    },
    update: {
      output: z.object({
        id: z.number(),
      }),
    },
  },
);

const cloud = {
  todos: a,
};

const main = async () => {
  const getted = await cloud.todos.get("1");
  console.log("getted", getted);
  const posted = await cloud.todos.new({ title: "test", completed: false, userId: 1 });
  console.log("posted", posted);

  const listed = await cloud.todos.list({ limit: 2, offset: 3 });
  console.log("listed", listed, `Query: limit: 2, offset: 3`);

  const updated = await cloud.todos.update("1", { title: "test2" });
  console.log("updated", updated);
};

main();
