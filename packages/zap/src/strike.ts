/* eslint-disable no-console */
import type { WithRequired } from "@mvdlei/types";
import { z } from "zod";

import { DefineOptions, RestMethods, Zap, type IZapOptions } from "./zap";

export interface IStrike {
  /**
   * Create a new StrikeRequest instance to make requests on a model.
   * @param path - Path to the endpoint for this model, e.g. `/users` for User model
   * @param model - Zod model for this model, e.g. `z.object({ id: z.string(), name: z.string() })` for User model
   * @returns {IStrikeRequest<TModel>} - StrikeRequest instance
   */
  make: <TModel extends Azod>(path: string, model: TModel) => IStrikeRequest<TModel>;
}

export type NotAvailableOrOptions<I extends Azod, O extends Azod> =
  | {
      available: false;
    }
  | ({
      available?: true | null | undefined;
    } & Partial<DefineOptions<I, O>>);

export type StrikeRequestOptions<I extends Azod, O extends Azod> = Partial<
  RoutesOptions<I, O>
>;

export type RoutesOptions<I extends Azod, O extends Azod> = {
  get?: NotAvailableOrOptions<I, O>;
  new?: NotAvailableOrOptions<I, O>;
  list?: NotAvailableOrOptions<I, O>;
  update?: NotAvailableOrOptions<I, O>;
  delete?: NotAvailableOrOptions<I, O>;
};

export type IStrikeOptions = WithRequired<Partial<IZapOptions>, "baseUrl">;

/**
 * Strike is a class that allows you to make requests to a single endpoint.
 *
 * @class Strike
 * @implements {IStrike}
 */
export class Strike {
  private zap: Zap;

  constructor(options?: IStrikeOptions) {
    this.zap = new Zap(options);
  }

  make<TModel extends Azod, TInput extends Azod = TModel, TOutput extends Azod = TModel>(
    path: string,
    model: TModel,
    options?: RoutesOptions<TInput, TOutput>,
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
type Azod = z.ZodTypeAny;

class StrikeRequest<
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
    if (this.options?.get?.available === false)
      throw new Error("Get method not available");
    return this.zap.define({
      url: `${this.path}/${id}`,
      method: RestMethods.GET,
      input: z.string(),
      output: this.options?.get?.output ?? this.model,
    })();
  };

  new = async (input: Omit<z.infer<TModel>, "id">) => {
    if (this.options?.new?.available === false)
      throw new Error("New method not available");
    return this.zap.define({
      url: this.path,
      method: RestMethods.POST,
      input,
      output: this.options?.new?.output ?? this.model,
    })(input);
  };

  list = async (options: Partial<ListOptions>) => {
    const res = await this.zap.define({
      url: this.path,
      method: RestMethods.GET,
      output: z.array(this.model),
    })(options);
    if (!options?.offset && !options?.limit) return res;
    if (!options?.offset) return res.slice(0, options.limit);
    if (!options?.limit) return res.slice(options.offset);
    return res.slice(options.offset, options.offset + options.limit);
  };

  delete = async (id: string) => {
    return this.zap.define({
      url: `${this.path}/${id}`,
      method: RestMethods.DELETE,
      input: z.string(),
      output: z.undefined(),
    })();
  };

  update = async (id: string, input: Partial<z.infer<TModel>>) => {
    return this.zap.define({
      url: `${this.path}/${id}`,
      method: RestMethods.PATCH,
      input,
      output: this.model,
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
  baseUrl: "https://jsonplaceholder.typicode.com",
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
    get: {
      input: z.string(),
    },
  },
);

const main = async () => {
  const getted = await a.get("1");
  console.log("getted", getted);
  const posted = await a.new({ title: "test", completed: false, userId: 1 });
  console.log("posted", posted);

  const listed = await a.list({ limit: 2, offset: 3 });
  console.log("listed", listed);

  const updated = await a.update("1", { title: "test2" });
  console.log("updated", updated);
};

main();
