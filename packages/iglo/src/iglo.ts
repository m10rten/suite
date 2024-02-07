export interface IgloI {
  fish<TError extends Error>(error: TError, callback: (error: TError) => void): void;
  fish<TError extends Error, TResult>(
    error: TError,
    callback: (error: TError) => TResult,
  ): TResult;

  /**
   * stop catching errors and exit the process or let the errors bubble up
   * @param code optional exit code for `process.exit`
   * @param stop if true, exit the process (does not apply to browser environments)
   */
  melt(code?: number, stop?: boolean): void;
  /**
   * stop catching errors and let them bubble up, defaulting to `process.exit(1)`
   * @param stop if true, stop catching errors and let them bubble up (does not apply to browser environments)
   */
  melt(stop?: boolean): void;

  /**
   * stop catching errors and freeze the error fishing
   * @param reason optional reason for freezing
   */
  freeze(reason?: string): void;

  /**
   * trigger an error to be caught by the error handler, best used when in a scenario you would not expect.
   * @param error the error to be caught
   *
   * @example
   * ```ts
   * iglo.panic(new Error("I did not expect this to happen"));
   * ```
   */
  panic<TError extends Error>(error: TError): void;
  /**
   * When you need to panic, but don't want to provide an error, you can use this method.
   *
   * We then default to `new Error("Unknown Error was thrown")`
   */
  panic(): void;
  /**
   * trigger an error with a message
   *
   * We then default to `new Error(message)`
   * @param error the message to be caught
   */
  panic(error: string): void;
}

export interface IgloOptions {
  /**
   * Runtime
   * @default "node"
   */
  runtime?: "node" | "browser";
  /**
   * If true, Iglo will catch unhandledRejection and uncaughtException
   * @default true
   */
  catchGlobal?: boolean;

  /**
   * Destination for the error to be logged
   * @default console.error
   * @example
   */
  log?: (error: Error) => void;
}
const defaultOptions = {
  runtime: "node",
  catchGlobal: true,
  // eslint-disable-next-line no-console
  log: console.error,
} satisfies IgloOptions;

export class Iglo implements IgloI {
  static init(options?: Partial<IgloOptions>): Iglo {
    const merged = Object.assign({}, defaultOptions, options);
    return new Iglo(merged);
  }
  private constructor(private readonly options?: Partial<IgloOptions>) {
    // eslint-disable-next-line no-console
    console.info(`Thanks for using Iglo!
    At the moment, Iglo is not yet implemented.
    Please come back later.
    `);
  }

  fish<TError extends Error>(error: TError, callback: (error: TError) => void): void;
  fish<TError extends Error, TResult>(
    error: TError,
    callback: (error: TError) => TResult,
  ): TResult;
  fish<TError extends Error, TResult>(
    error: TError,
    callback: (error: TError) => TResult,
  ): TResult | void {
    throw new Error(`Method not implemented. ${error} ${callback}`);
  }
  melt(code?: number | undefined, stop?: boolean | undefined): void;
  melt(stop?: boolean | undefined): void;
  melt(code?: unknown, stop?: unknown): void {
    throw new Error(`Method not implemented. ${code} ${stop}`);
  }
  freeze(reason?: string | undefined): void {
    throw new Error(`Method not implemented. ${reason}`);
  }
  panic<TError extends Error>(error: TError): void;
  panic(): void;
  panic(message: string): void;
  panic(error?: unknown): void {
    if (error instanceof Error) {
      throw new Error("Method not implemented.");
    }
    if (typeof error === "string") {
      throw new Error("Method not implemented.");
    }
    throw new Error(`Method not implemented. ${error} ${this.options?.runtime}`);
  }
}
