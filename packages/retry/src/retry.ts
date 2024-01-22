/* eslint-disable no-console */
export type IRetryDelay =
  | number
  | {
      min: number;
      max: number;
      default: number;
    };

export interface IRetryOptions {
  attempts: number;
  delay: IRetryDelay;
  factor: number;
  minDelay: number;
  maxDelay: number;
  exponential: boolean;
  forever: boolean;
  randomize: boolean;
}
const defaultOptions: IRetryOptions = {
  attempts: 3,
  delay: 1000,
  factor: 2,
  minDelay: 1000,
  maxDelay: 10000,
  exponential: true,
  forever: false,
  randomize: false,
};
export interface IRetry {
  retry<T>(fn: () => Promise<T>, options?: IRetryOptions): Promise<T>;
}

export class Retry implements IRetry {
  private constructor(private readonly options?: Partial<IRetryOptions>) {}
  static init(options?: Partial<IRetryOptions>): IRetry {
    return new Retry(options);
  }

  private getDelayTime(
    attempt: number,
    delay: IRetryDelay,
    factor: number,
    minDelay: number,
    maxDelay: number,
    exponential: boolean,
    randomize: boolean = false,
  ): number {
    if (typeof delay === "number") return delay;

    if (typeof delay === "object") {
      const { min, max, default: defaultDelay } = delay;
      const delayTime = exponential
        ? Math.pow(factor, attempt) * defaultDelay
        : defaultDelay;
      return Math.min(Math.max(delayTime, min), max);
    }
    return Math.min(Math.max(0, minDelay), maxDelay) * (randomize ? Math.random() : 1);
  }

  /**
   * Retry a function, it will call itself until the function returns a value or the number of attempts is reached
   * @param fn
   * @param options
   */
  async retry<T>(
    fn: () => Promise<T>,
    options: Partial<IRetryOptions> = defaultOptions,
  ): Promise<T> {
    const { attempts, delay, factor, minDelay, maxDelay, exponential, randomize } = {
      ...defaultOptions,
      ...this.options,
      ...options,
    };

    const delayTime = this.getDelayTime(
      attempts,
      delay,
      factor,
      minDelay,
      maxDelay,
      exponential,
      randomize,
    );

    try {
      return await fn();
    } catch (error) {
      const newAttempts = attempts - 1;
      if (newAttempts <= 0 && options.forever !== true) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, delayTime));
      return this.retry(fn, {
        ...options,
        ...this.options,
        attempts: newAttempts,
      });
    }
  }
}

/**
 * Test code:
 */
const main = async () => {
  const r = Retry.init({
    forever: true,
  });

  const fn = async () => {
    console.log("start");
    const random = Math.random();
    if (random > 0.3) {
      throw new Error("error");
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("end");
    return "ok";
  };

  const res = await r.retry(fn);
  console.log(res);
};
main();
