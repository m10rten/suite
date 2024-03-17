/* eslint-disable no-console */
export * from "./fetch";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Web {
  const defaultOptions = {
    client: "NEXT_PUBLIC_API_URL",
    server: "API_URL",
    isClient: typeof window !== "undefined",
  } as const;
  type Options = {
    client?: string;
    server?: string;
    isClient?: boolean | (() => boolean);
  };
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Api {
    // private constructor() {} // not meant to be instantiated
    export class Origin {
      /**
       * Get the API URL from the environment variables
       *
       * Defaults to `NEXT_PUBLIC_API_URL` for the client and `API_URL` for the server.
       *
       * `isClient` is used to determine if the code is running on the client or server.
       * Defaults to `typeof window !== "undefined"`, can be overridden with a boolean or a function that returns a boolean.
       *
       * @param env - The environment key to use for the API URL
       * @param options - Options to override the defaults
       * @returns
       */
      public static fromEnv(
        env?: string | null | undefined,
        options?: Partial<Options>,
      ): string {
        const mergedOptions = { ...defaultOptions, ...options };
        const { client, server, isClient } = mergedOptions;

        const key =
          env ?? (typeof isClient === "function" ? isClient() : isClient)
            ? client
            : server;

        return process.env[key] ?? process.env[server] ?? process.env[client] ?? "";
      }
    }
  }
}

/**
 * Test code:
 */
// const main = async () => {
//   try {
//     console.log(Web.Api.Origin.fromEnv());

//     console.log("started");

//     const todo = await api("1//?q=1", {
//       origin: "https://jsonplaceholder.typicode.com//1",
//       path: "//todos//",
//       params: {
//         h: "2",
//       },
//     });
//     console.log(todo.status, todo.data);

//     const get = await api.get("https://jsonplaceholder.typicode.com/todos/2");
//     console.log(get.status, get.data);

//     const post = await api.post("https://jsonplaceholder.typicode.com/todos", {
//       body: JSON.stringify({
//         title: "foo",
//         body: "bar",
//         userId: 1,
//       }),
//     });
//     console.log(post.status, post.data);
//   } catch (error) {
//     if (HttpError.is(error)) {
//       console.log(error.response.statusText);
//     } else {
//       console.error(error);
//     }
//   }
// };
// main().then(() => console.log("done"));
