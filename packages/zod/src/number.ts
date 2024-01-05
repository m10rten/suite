export interface INumber {
  parse: <N extends string | number>(value: N) => ParseReturn<N>;
  constrain: (value: number, min: number, max: number) => number;
  is: ICheckers;
  percent: (value: number, total: number) => number;
}

type ParseReturn<T> = T extends string ? ParseNumber<T> : T extends number ? T : never;
type ParseNumber<T extends string> = T extends `${infer D extends number}` ? D : never;

export interface ICheckers {
  odd: (value: number) => boolean;
  even: (value: number) => boolean;
  between: (value: number, min: number, max: number) => boolean;
  /**
   * If the number is safe to use, eg NaN is not safe, Infinity is not safe, etc.
   * @param value
   * @returns
   */
  safe: (value: number) => boolean;
}
class Checkers implements ICheckers {
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

export class TNumber implements INumber {
  public is = new Checkers();
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
