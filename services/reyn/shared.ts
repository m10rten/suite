import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace r {
  // API built-in types
  export type Event<TData extends Record<string, unknown>> = {
    name: string;
    data: TData;
  };
  export type Infer<T> = T extends Event<infer U> ? U : never;

  // export type CreateEvent<TName
}

const make = <ZodSchema extends z.ZodTypeAny>(schema: ZodSchema) => {
  return async (
    name: string,
    input: Readonly<unknown>,
  ): Promise<r.Event<z.infer<ZodSchema>>> => {
    const result = schema.safeParse(input);
    if (!result.success) {
      throw result.error;
    }
    return {
      name,
      data: result.data,
    };
  };
};

// This will likely be done by the event-handler that then calls the webhook
export const validateEvent = make(
  z.object({
    name: z.string(),
  }),
);
export type Data = r.Infer<Awaited<ReturnType<typeof validateEvent>>>;

// const exampleEvent = createEvent("user_created", {
//   name: "John Doe",
// });

// export const mySchema = z.object({
//   name: z.string(),
// });
// type Schema = z.infer<typeof mySchema>;

// export type MyEvent = r.Event<Schema>;
// const exampleEvent: r.Event<Schema> = {
//   event: "user_created",
//   data: {
//     name: "John Doe",
//   },
// };
// export type Data = r.Infer<MyEvent>;
