import { logger } from "@mvdlei/log";

/* eslint-disable no-console */
export interface IgloI {
  fish<TError extends Error>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: new (...args: any[]) => TError,
    callback: (error: unknown) => unknown,
  ): void;

  /**
   * stop catching errors and exit the process or let the errors bubble up
   * @param code optional exit code for `process.exit`
   * @param stop if true, exit the process (does not apply to browser environments)
   */
  melt(code?: number, stop?: boolean): void;

  /**
   * trigger an error to be caught by the error handler, best used when in a scenario you would not expect.
   * @param error the error to be caught
   *
   * @example
   * ```ts
   * iglo.panic(new Error("I did not expect this to happen"));
   * ```
   */
  panic<TError extends Error>(error?: TError | string): void;

  /**
   * Create a safe shell around your code, like an iglo
   *
   * Be aware that the shell will catch all errors, including unhandled rejections and uncaught exceptions
   *
   * The shell will then return either the result of the callback or undefined if an error was caught, or throw the error if the error was not caught by a .fish handler
   * @param callback the code to be executed
   * @param options optional options for the shell
   * @returns the result of the callback
   * @example
   * ```ts
   * const result = await iglo.shell(() => {
   *    const iffy = Math.random() > 0.5;
   *    if (iffy) throw new Error("Iffy error");
   *    return "Iffy result";
   * });
   * console.log(result);
   * ```
   */
  shell<T>(callback: () => T, options?: ShellOptions): Promise<T>;
}

export interface ShellOptions {}

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  log?: (...data: any[]) => unknown;
}
const defaultOptions = {
  runtime: "node",
  catchGlobal: true,
  // eslint-disable-next-line no-console
  log: logger.error,
} satisfies IgloOptions;

export class Iglo implements IgloI {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _handlers: Map<new (...args: any[]) => Error, (error: Error) => unknown> =
    new Map();

  static init(options?: Partial<IgloOptions>): Iglo {
    const merged = Object.assign({}, defaultOptions, options);
    return new Iglo(merged);
  }
  private constructor(private readonly options: IgloOptions = defaultOptions) {
    const log = this.options.log || logger.error;

    if (this.options.catchGlobal) {
      if (this.options.runtime === "node" || typeof window === "undefined") {
        process.on("unhandledRejection", (error) => {
          log(error);
        });
        process.on("uncaughtException", (error) => {
          log(error);
        });
      } else {
        window.addEventListener("unhandledrejection", (event) => {
          log(event.reason);
        });
        window.addEventListener("error", (event) => {
          log(event.error);
        });
      }
    }
  }

  onExit() {
    const log = this.options.log || logger.error;
    // remove event listeners
    if (this.options.runtime === "node" || typeof window === "undefined") {
      process.off("unhandledRejection", (error) => {
        log(error);
      });
      process.off("uncaughtException", (error) => {
        log(error);
      });
    } else {
      window.removeEventListener("unhandledrejection", (event) => {
        log(event.reason);
      });
      window.removeEventListener("error", (event) => {
        log(event.error);
      });
    }
  }

  fish<TError extends Error>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: new (...args: any[]) => TError,
    callback: (error: TError) => unknown,
  ): void {
    this._handlers.set(error, callback as (error: Error) => unknown);
  }

  melt(code?: 0 | 1, stop?: boolean): void {
    this._handlers.clear();
    if (this.options?.runtime === "node") {
      if (stop !== true) return;
      return process.exit(code);
    }
  }

  panic<TError extends Error>(error?: TError | string): void {
    if (typeof error === "string") {
      throw new Error(error);
    }
    throw error;
  }

  async shell<T>(callback: () => T): Promise<T> {
    try {
      return await callback();
    } catch (error) {
      if (error instanceof Error) {
        for await (const [ErrorType, handler] of this._handlers) {
          if (error?.name === ErrorType.name || error instanceof ErrorType) {
            handler(error);
            return undefined as T;
          }
        }
        return undefined as T;
      } else throw error;
    }
  }
}

/**
 * Test code:
 */

// const iglo = Iglo.init();
// class MyError extends Error {
//   name = "MyError";
//   constructor(
//     message: string,
//     public code = 0,
//   ) {
//     super(message);
//   }
// }
// iglo.fish(MyError, (error) => {
//   logger.error("Iffy caught a MyError", error.message, error.code);
// });
// const iffy = async () => {
//   logger.log("Hello, Iglo!");
//   if (Math.random() > 0.4) {
//     throw new MyError("Iffy error", 420);
//   }
//   return "Iffy result";
// };

// iglo.shell(iffy).then((result) => logger.log("Iffy: ", result));
