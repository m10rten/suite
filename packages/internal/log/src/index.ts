import winston from "winston";

export const defaultOptions: winston.LoggerOptions = {
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [new winston.transports.Console()],
};

export const create = (options: winston.LoggerOptions = defaultOptions) => {
  return Logger.create(options);
};

export class Logger {
  private static _logger: winston.Logger;
  private static _instance: Logger;

  public static log = Logger._logger.log;
  public static error = Logger._logger.error;
  public static warn = Logger._logger.warn;
  public static info = Logger._logger.info;
  public static verbose = Logger._logger.verbose;
  public static debug = Logger._logger.debug;
  public static silly = Logger._logger.silly;

  public log = Logger._logger.log;
  public error = Logger._logger.error;
  public warn = Logger._logger.warn;
  public info = Logger._logger.info;
  public verbose = Logger._logger.verbose;
  public debug = Logger._logger.debug;
  public silly = Logger._logger.silly;

  public static create = (options: winston.LoggerOptions = defaultOptions) => {
    const _logger = Logger.getInstance(options);
    return _logger;
  };

  public static getInstance = (options: winston.LoggerOptions = defaultOptions) => {
    if (!Logger._instance) {
      Logger._logger = winston.createLogger(options);
      Logger._instance = new Logger(options);
    }
    return Logger._instance;
  };

  constructor(options: winston.LoggerOptions = defaultOptions) {
    Logger.getInstance(options);
  }
}

export default Logger;
