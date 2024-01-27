/* eslint-disable @typescript-eslint/no-explicit-any */
import { Is } from "@/is";

describe("Is Class", () => {
  let is: Is;

  beforeEach(() => {
    is = new Is();
  });

  describe("string", () => {
    it("should return true if value is a string", () => {
      const result = is.string("NaN");
      expect(result).toBe(true);
    });

    it("should return false if value is not a string", () => {
      const result = is.string(123 as any);
      expect(result).toBe(false);
    });
  });

  describe("number", () => {
    it("should return true if value is a number", () => {
      const result = is.number(2);
      expect(result).toBe(true);
    });

    it("should return false if value is not a number", () => {
      const result = is.number("hello" as any);
      expect(result).toBe(false);
    });
  });

  describe("null", () => {
    it("should return true if value is null", () => {
      const result = is.null(null);
      expect(result).toBe(true);
    });

    it("should return false if value is not null", () => {
      const result = is.null("hello" as any);
      expect(result).toBe(false);
    });
  });

  describe("undefined", () => {
    it("should return true if value is undefined", () => {
      const result = is.undefined(undefined);
      expect(result).toBe(true);
    });

    it("should return false if value is not undefined", () => {
      const result = is.undefined("hello" as any);
      expect(result).toBe(false);
    });
  });

  describe("boolean", () => {
    it("should return true if value is a boolean", () => {
      const result = is.boolean(true);
      expect(result).toBe(true);
    });

    it("should return false if value is not a boolean", () => {
      const result = is.boolean("hello" as any);
      expect(result).toBe(false);
    });
  });

  describe("bigint", () => {
    it("should return true if value is a bigint", () => {
      const result = is.bigint(BigInt(2));
      expect(result).toBe(true);
    });

    it("should return false if value is not a bigint", () => {
      const result = is.bigint("hello" as any);
      expect(result).toBe(false);
    });
  });

  describe("symbol", () => {
    it("should return true if value is a symbol", () => {
      const result = is.symbol(Symbol("hello world"));
      expect(result).toBe(true);
    });

    it("should return false if value is not a symbol", () => {
      const result = is.symbol("hello" as any);
      expect(result).toBe(false);
    });
  });

  describe("object", () => {
    it("should return true if value is an object", () => {
      const result = is.object({ hello: "world" });
      expect(result).toBe(true);
    });

    it("should return false if value is not an object", () => {
      const result = is.object("hello" as any);
      expect(result).toBe(false);
    });
  });

  describe("array", () => {
    it("should return true if value is an array", () => {
      const result = is.array(["1", "2", "3"]);
      expect(result).toBe(true);
    });

    it("should return false if value is not an array", () => {
      const result = is.array("hello" as any);
      expect(result).toBe(false);
    });
  });

  describe("function", () => {
    it("should return true if value is a function", () => {
      const result = is.function(() => {});
      expect(result).toBe(true);
    });

    it("should return false if value is not a function", () => {
      const result = is.function("hello" as any);
      expect(result).toBe(false);
    });
  });

  describe("any", () => {
    it("should always return true", () => {
      const result = is.any("hello");
      expect(result).toBe(true);
    });
  });

  describe("date", () => {
    it("should return true if value is a Date", () => {
      const result = is.date(new Date());
      expect(result).toBe(true);
    });

    it("should return false if value is not a Date", () => {
      const result = is.date("hello" as any);
      expect(result).toBe(false);
    });
  });

  describe("error", () => {
    it("should return true if value is an Error", () => {
      const result = is.error(new Error("hello world"));
      expect(result).toBe(true);
    });

    it("should return false if value is not an Error", () => {
      const result = is.error("hello" as any);
      expect(result).toBe(false);
    });
  });

  describe("promise", () => {
    it("should return true if value is a Promise", () => {
      const result = is.promise(new Promise(() => {}));
      expect(result).toBe(true);
    });

    it("should return false if value is not a Promise", () => {
      const result = is.promise("hello" as any);
      expect(result).toBe(false);
    });
  });

  describe("falsy", () => {
    it("should return true if value is falsy", () => {
      const result = is.falsy(null);
      expect(result).toBe(true);
    });

    it("should return false if value is not falsy", () => {
      const result = is.falsy("hello" as any);
      expect(result).toBe(false);
    });
  });

  describe("of", () => {
    it("should return true if value is of", () => {
      class MyClass {
        public constructor(public readonly name: string) {}
      }
      const result = is.of(MyClass, new MyClass("MyInstance of myClass"));
      expect(result).toBe(true);
    });

    it("should return false if value is not of", () => {
      class MyClass {
        public constructor(public readonly name: string) {}
      }
      const result = is.of(MyClass, "hello" as any);
      expect(result).toBe(false);
    });

    it("should work for objects with no constructor", () => {
      const result = is.of(Object, {});
      expect(result).toBe(true);
    });

    it("should error for non-callable objects", () => {
      expect(() => is.of({ test: "test" }, { test: "test" })).toThrow();
    });
    it("should not throw for Object", () => {
      expect(() => is.of(Object, { test: "test" })).not.toThrow();
    });
  });

  describe("browser", () => {
    it("should always return false", () => {
      const result = is.browser();
      expect(result).toBe(false);
    });
  });
  describe("server", () => {
    it("should always return true", () => {
      const result = is.server();
      expect(result).toBe(true);
    });
  });
});
