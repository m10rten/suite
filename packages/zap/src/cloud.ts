/**
 * @module @mvdlei/zap/cloud
 * @description
 * This submodule will contain a cloud insntance to make an intuitive and easy to use API.
 *
 */

import { ExtractKeys } from "@mvdlei/types";
import { z } from "zod";

import Strike, { IStrikeOptions, IStrikeRequest } from "./strike";

export type IStormStructure<S extends string> = Record<S, StormItem<Azod>>;

type Azod = z.ZodTypeAny;

type StormItem<I extends Azod> = {
  schema: I;
  path: string;
};

// export interface IStorm {}

// export interface ICloud {
//   storm: (structure: IStormStructure) => IStorm;
// }

export type IStorm = Record<string, IStrikeRequest<Azod>>;

export type ICloudInitOptions = IStrikeOptions;

export class Cloud {
  private readonly options: ICloudInitOptions;
  static init(options: ICloudInitOptions): Cloud {
    return new Cloud(options);
  }

  public constructor(options: ICloudInitOptions) {
    this.options = options;
  }

  storm<S extends string, T extends IStormStructure<S>>(structure: T) {
    const strike = new Strike(this.options);

    const storm: Record<ExtractKeys<T>, IStrikeRequest<Azod>> = {} as Record<
      ExtractKeys<T>,
      IStrikeRequest<Azod>
    >;

    for (const [key, value] of Object.entries(structure)) {
      const typed: StormItem<Azod> = value as StormItem<Azod>;
      storm[key as ExtractKeys<T>] = strike.make(typed.path, typed.schema);
    }

    return storm;
  }
}

export default Cloud;

/**
 * Test code:
 */

// const user = z.object({
//   id: z.string(),
//   name: z.string(),
// });

// const todoSchema = z.object({
//   id: z.number(),
//   title: z.string(),
//   completed: z.boolean(),
// });

// const c = Cloud.init({
//   baseUrl: "https://jsonplaceholder.typicode.com",
// });

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const cloud = c.storm({
//   // user: {
//   //   schema: user,
//   //   routes: {
//   //     update: {
//   //       available: false,
//   //     },
//   //   },
//   // },
//   todo: {
//     schema: todoSchema,
//     path: "/todos",
//   },
//   user: {
//     schema: todoSchema,
//     path: "/todos",
//   },
// });

// const main = async () => {
//   // const user = await cloud.user.get({ id: "1" });
//   // console.log(user);

//   const todo = await cloud.todo.get("1");
//   // eslint-disable-next-line no-console
//   console.log("CLOUD TODO: ", todo);
// };

// main();

// // cloud.user.get({ id: "1" });
// // cloud.user.update({ id: "1", name: "John" }); // should not be available
