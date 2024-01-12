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

export const create = (options: LoggerOptions = defaultOptions) => {
  return createLogger({ ...options, ...defaultOptions });
};
