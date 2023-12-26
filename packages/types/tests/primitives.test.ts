import {
  Falsy,
  Maybe,
  NonMaybe,
  Nullable,
  Nullish,
  Possitive,
  Primitive,
  Tuple,
  Undefinable,
} from "@/primitives";

describe("Primitives", () => {
  test("Possitive", () => {
    const value: Possitive<number> = 1;
    expect(value).toBe(1);
  });
  test("Nullable", () => {
    const value: Nullable<number> = null;
    expect(value).toBe(null);
  });
  test("Undefinable", () => {
    const value: Undefinable<number> = undefined;
    expect(value).toBe(undefined);
  });
  test("Maybe", () => {
    const value: Maybe<number> = null;
    expect(value).toBe(null);
  });
  test("NonMaybe", () => {
    const value: NonMaybe<number> = 1;
    expect(value).toBe(1);
  });
  test("Primitive", () => {
    const value: Primitive = 1;
    expect(value).toBe(1);
  });
  test("Falsy", () => {
    const value: Falsy = false;
    expect(value).toBe(false);
  });
  test("Tuple", () => {
    const value: Tuple<number> = [1, 3];
    expect(value).toStrictEqual([1, 3]);
  });
  test("Nullish", () => {
    const value: Nullish = null;
    expect(value).toBe(null);
  });
});
