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
  log(...data: unknown[]): void;
  error(...data: unknown[]): void;
  warn(...data: unknown[]): void;
  info(...data: unknown[]): void;
  debug(...data: unknown[]): void;
}
export class Logger implements ILogger {
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
        return "\x1b[32m";
      default:
        return "\x1b[0m";
    }
  };

  private _do = (
    fn: (...arg: unknown[]) => void,
    level: LogType,
    ...meta: unknown[]
  ) => {
    const prefix = `${this._prefix(level)}`;
    if (this._options.level === "silent") return;
    const first = meta.shift();
    fn(`${prefix} ${first}`, ...meta);
  };

  private _prefix = (level: LogType) => {
    const color = this._colorize(level);
    const ts = this._options.timestamp ? new Date().toISOString() : "";
    return `${ts} [${color}${level}${ec}]:`.trim();
  };

  public log(...data: unknown[]) {
    return this._do(console.log, "log", ...data);
  }

  public error(...data: unknown[]) {
    return this._do(console.error, "error", ...data);
  }

  public warn(...data: unknown[]) {
    return this._do(console.warn, "warn", ...data);
  }

  public info(...data: unknown[]) {
    return this._do(console.info, "info", ...data);
  }

  public debug(...data: unknown[]) {
    return this._do(console.debug, "debug", ...data);
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
