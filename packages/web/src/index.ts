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
