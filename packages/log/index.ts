/* eslint-disable no-console */
export type LogLevel =
  | "error"
  | "warn"
  | "info"
  | "verbose"
  | "debug"
  | "silly"
  | "http"
  | "silent";
export type LogType = "error" | "warn" | "info" | "log" | "debug";

export interface LoggerOptions {
  level?: LogLevel;
  timestamp?: boolean;
}

export const defaultOptions = {
  level: "debug",
  timestamp: true,
} satisfies LoggerOptions;

/**
 * Will always return a new logger instance, use `assert` to get the same instance every time
 * @param options
 * @returns {Logger}
 */
export const create = (options: LoggerOptions = defaultOptions): Logger => {
  return new Logger(options);
};

let _logger: Logger | undefined = undefined;
/**
 * Will save the logger instance and return it every time or create a new one if it doesn't exist
 * @param options
 * @returns {Logger}
 */
export const assert = (options: LoggerOptions): Logger => {
  if (_logger) return _logger;
  _logger = create(options);
  return _logger;
};

const ec = "\x1b[0m" as const;

export interface ILogger {
  log(message: string, meta?: unknown): void;
  error(message: string, meta?: unknown): void;
  warn(message: string, meta?: unknown): void;
  info(message: string, meta?: unknown): void;
  debug(message: string, meta?: unknown): void;
}
export class Logger {
  constructor(private readonly _options: LoggerOptions) {}

  private _colorize = (level: LogType) => {
    switch (level) {
      case "error":
        return "\x1b[31m";
      case "warn":
        return "\x1b[33m";
      case "info":
        return "\x1b[36m";
      case "debug":
        return "\x1b[35m";
      case "log":
      default:
        return "\x1b[37m";
    }
  };

  private _do = (
    fn: (msg: string, ...arg: unknown[]) => void,
    msg: string,
    meta?: unknown,
  ) => {
    if (this._options.level === "debug" || this._options.level === "verbose") {
      if (meta) fn(msg, meta);
      else fn(msg);
    } else {
      fn(msg);
    }
  };

  private _prefix = (level: LogType) => {
    const color = this._colorize(level);
    const ts = this._options.timestamp ? new Date().toISOString() : "";
    return `${ts} [${color}${level}${ec}]:`.trim();
  };

  public log(message: string, meta?: unknown) {
    return this._do(console.log, `${this._prefix("log")} ${message}`, meta);
  }

  public error(message: string, meta?: unknown) {
    return this._do(console.error, `${this._prefix("error")} ${message}`, meta);
  }

  public warn(message: string, meta?: unknown) {
    return this._do(console.warn, `${this._prefix("warn")} ${message}`, meta);
  }

  public info(message: string, meta?: unknown) {
    return this._do(console.info, `${this._prefix("info")} ${message}`, meta);
  }

  public debug(message: string, meta?: unknown) {
    return this._do(console.debug, `${this._prefix("debug")} ${message}`, meta);
  }
}

/**
 * Logger instance to easily log messages
 */
export const logger = assert(defaultOptions);

/**
 * Test code:
 */

// const main = () => {
//   const log = create({ level: "debug", timestamp: true });
//   log.log("Hello log");
//   log.error("Hello error", new Error("Hello World"));
//   log.warn("Hello warn");
//   log.info("Hello info");
//   log.debug("Hello debug", { foo: "bar" });
// };

// main();
