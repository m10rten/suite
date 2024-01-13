import winston, { createLogger } from "winston";

export type Level = "error" | "warn" | "info" | "verbose" | "debug" | "silly";
export interface LoggerOptions extends winston.LoggerOptions {
  level?: Level;
}

export const defaultOptions = {
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
    winston.format.timestamp(),
    winston.format.printf((info) => {
      const { timestamp, level, message, ...rest } = info;
      return `${timestamp} [${level}]: ${message} ${
        Object.keys(rest).length ? JSON.stringify(rest, null, 2) : ""
      }`;
    }),
    winston.format.errors({ stack: true }),
  ),
  transports: [new winston.transports.Console()] as const,
  level: "debug",
} satisfies LoggerOptions;

let _logger: winston.Logger | undefined = undefined;

/**
 * Will always return a new logger instance, use `assert` to get the same instance every time
 * @param options
 * @returns
 */
export const create = (options: LoggerOptions = defaultOptions) => {
  return createLogger({ ...options, ...defaultOptions });
};

/**
 * Will save the logger instance and return it every time or create a new one if it doesn't exist
 * @param options
 * @returns
 */
export const assert = (options: LoggerOptions) => {
  if (_logger) return _logger;
  _logger = create(options);
  return _logger;
};

/**
 * Logger instance to easily log messages
 */
export const logger = assert(defaultOptions);
