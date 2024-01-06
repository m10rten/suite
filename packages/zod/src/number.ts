export interface INumber {
  /**
   * Parse a string or number into a number
   */
  parse: <N extends string | number>(value: N) => ParseReturn<N>;
  /**
   * Constrain a number between a min and max value
   * @returns Number between min and max or min or max
   */
  constrain: (value: number, min: number, max: number) => number;
  /**
   * NumberChecks for numbers
   */
  is: INumberChecks;
  /**
   * Get a percentage of a number relative to a total
   * @returns Percentage of value relative to total (0-100) up to 2 decimal places, ! Does not include % symbol
   */
  percent: (value: number, total: number) => number;
}

type ParseReturn<T> = T extends string ? ParseNumber<T> : T extends number ? T : never;
type ParseNumber<T extends string> = T extends `${infer D extends number}` ? D : never;

export interface INumberChecks {
  /**
   * Check if a number is odd
   */
  odd: (value: number) => boolean;
  /**
   * Check if a number even
   */
  even: (value: number) => boolean;
  /**
   * Check if a number is between a min and max value
   */
  between: (value: number, min: number, max: number) => boolean;
  /**
   * If the number is safe to use, eg NaN is not safe, Infinity is not safe, etc.
   */
  safe: (value: number) => boolean;
}

/**
 * NumberChecks class for number related checks
 */
class NumberChecks implements INumberChecks {
  odd(value: number): boolean {
    return !this.even(value);
  }
  even(value: number): boolean {
    return value % 2 === 0;
  }
  between(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  }
  safe(value: number): boolean {
    return (
      !isNaN(value) &&
      isFinite(value) &&
      Number.isSafeInteger(value) &&
      Number.MAX_SAFE_INTEGER >= value &&
      Number.MIN_SAFE_INTEGER <= value
    );
  }
}

/**
 * TNumber class for number related functions and utilities
 */
export class TNumber implements INumber {
  public is = new NumberChecks();
  public parse<N extends string | number>(value: N): ParseReturn<N> {
    return (typeof value === "string" ? parseInt(value) : value) as ParseReturn<N>;
  }

  public constrain(value: number, min: number, max: number): number {
    return Math.max(Math.min(value, max), min);
  }

  public percent(value: number, total: number): number {
    const res = (value / total) * 100;
    return parseFloat(parseFloat(res.toString()).toFixed(2));
  }

  public toSafe(value: number): number {
    return this.is.safe(value) ? value : 0;
  }
}
