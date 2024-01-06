import { TObject } from "@/object";

describe("TObject Class", () => {
  let tObject: TObject;

  beforeEach(() => {
    tObject = new TObject();
  });

  describe("merge", () => {
    it("should merge two objects", () => {
      const a = { a: 1 };
      const b = { b: 2 };
      const result = tObject.merge(a, b);
      expect(result).toEqual({ a: 1, b: 2 });
    });
  });

  describe("keys", () => {
    it("should return keys of an object", () => {
      const a = { a: 1, b: 2 };
      const result = tObject.keys(a);
      expect(result).toEqual(["a", "b"]);
    });
  });

  describe("freeze", () => {
    it("should freeze an object", () => {
      const a = { a: 1, b: 2 };
      const result = tObject.freeze(a);
      expect(Object.isFrozen(result)).toBe(true);
    });
  });

  describe("unfreeze", () => {
    it("should unfreeze a frozen object", () => {
      const a = { a: 1, b: 2 };
      const frozenObj = Object.freeze(a);
      const result = tObject.unfreeze(frozenObj);
      expect(Object.isFrozen(result)).toBe(false);
    });
  });

  describe("filter", () => {
    it("should filter an object based on the provided function", () => {
      const a = { a: 1, b: 2, c: 3 };
      const result = tObject.filter(a, (_key, value) => value > 1);
      expect(result).toEqual({ b: 2, c: 3 });
    });
  });

  describe("select", () => {
    it("should select specified keys from an object", () => {
      const a = { a: 1, b: 2, c: 3 };
      const result = tObject.select(a, ["a", "c"]);
      expect(result).toEqual({ a: 1, c: 3 });
    });
  });

  describe("exclude", () => {
    it("should exclude specified keys from an object", () => {
      const a = { a: 1, b: 2, c: 3 };
      const result = tObject.exclude(a, ["b"]);
      expect(result).toEqual({ a: 1, c: 3 });
    });
  });

  // describe("flatten", () => {
  //   it("should flatten a nested object", () => {
  //     const nested = { a: { b: { c: 1 } } };
  //     const result = tObject.flatten(nested);
  //     expect(result).toEqual({ "a.b.c": 1 });
  //   });
  // });
});
