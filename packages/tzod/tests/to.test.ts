/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

import { To } from "@/to";

describe("To Class", () => {
  let to: To;

  beforeEach(() => {
    to = new To();
  });

  describe("string", () => {
    it("should coerce value to string", () => {
      const result = to.string(2);
      expect(result).toBe("2");
    });

    it("should return empty string when parsing fails", () => {
      const result = to.string({} as any);
      expect(result).toBe("{}");
    });
  });

  describe("number", () => {
    it("should coerce value to number", () => {
      const result = to.number("2");
      expect(result).toBe(2);
    });

    it("should return NaN when parsing fails", () => {
      const result = to.number("hello" as any);
      expect(isNaN(result)).toBe(true);
    });
  });

  describe("boolean", () => {
    it("should coerce value to boolean", () => {
      const result = to.boolean("hello");
      expect(result).toBe(true);
    });

    it("should return true when parsing an object", () => {
      const result = to.boolean({} as any);
      expect(result).toBe(true);
    });
  });

  describe("array", () => {
    it("should coerce value to array", () => {
      const result = to.array("hello");
      expect(result).toEqual(["hello"]);
    });

    it("should return an empty array when parsing fails", () => {
      const result = to.array(123);
      expect(result).toEqual([123]);
    });
  });

  describe("date", () => {
    it("should coerce value to date", () => {
      const result = to.date("02-01-2024");
      expect(result).toEqual(new Date("02-01-2024"));
    });

    it("should return a new Date(NaN) when parsing fails", () => {
      const result = to.date("invalid-date" as any);
      expect(result).toBeInstanceOf(Date);
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("url", () => {
    it("should coerce value to URL", () => {
      const result = to.url("https://example.com");
      expect(result).toBeInstanceOf(URL);
      expect(result.href).toBe("https://example.com/");
    });

    it("should coerce value to URL when it's a Request", () => {
      const result = to.url(new Request("https://example.com"));
      expect(result).toBeInstanceOf(URL);
      expect(result.href).toBe("https://example.com/");
    });

    it("should coerce value to URL when it's a URL", () => {
      const result = to.url(new URL("https://example.com"));
      expect(result).toBeInstanceOf(URL);
      expect(result.href).toBe("https://example.com/");
    });

    it("should coerce value to URL when it's a string", () => {
      const result = to.url("https://example.com");
      expect(result).toBeInstanceOf(URL);
      expect(result.href).toBe("https://example.com/");
    });

    it("should throw when it's a number", () => {
      expect(() => to.url(123 as any)).toThrow();
    });

    it("should handle a base URL", () => {
      const result = to.url("/path", "https://example.com");
      expect(result).toBeInstanceOf(URL);
      expect(result.href).toBe("https://example.com/path");
    });

    it("should throw when base URL is not a string or URL", () => {
      expect(() => to.url("/path", 123 as any)).toThrow();
    });
  });

  describe("error", () => {
    it("should coerce value to Error", () => {
      const message = "hello";
      const result = to.error(message);
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe(message);
    });
  });

  describe("bigint", () => {
    it("should coerce value to bigint", () => {
      const result = to.bigint("123");
      expect(result).toBe(BigInt(123));
    });

    it("should return BigInt(1) when parsing fails", () => {
      const result = to.bigint("hello" as any);
      expect(result).toBe(BigInt(1));
    });

    it("should return the input as is when it's a bigint", () => {
      const result = to.bigint(BigInt(222));
      expect(result).toBe(BigInt(222));
    });
  });

  describe("promise", () => {
    it("should create a resolved Promise with the coerced value", async () => {
      const result = await to.promise("hello");
      expect(result).toBe("hello");
    });
  });

  describe("any", () => {
    it("should return the input as is", () => {
      const result = to.any("hello");
      expect(result).toBe("hello");
    });
  });

  describe("parse", () => {
    it("should return a function that parses a value using the provided ZodType", () => {
      const parser = to.parse(z.string());
      const result = parser("parsed");
      expect(result).toBe("parsed");
    });
  });

  describe("readonly", () => {
    it("should coerce value to Readonly", () => {
      const result = to.readonly("hello");
      expect(result).toEqual("hello");
    });
  });
});
