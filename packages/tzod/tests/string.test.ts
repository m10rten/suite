/* eslint-disable @typescript-eslint/no-explicit-any */
import { TString } from "@/string";

describe("String Class", () => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  let str: TString;

  beforeEach(() => {
    str = new TString();
  });

  describe("upper", () => {
    it("should transform string to uppercase", () => {
      const result = str.upper("hello");
      expect(result).toBe("HELLO");
    });

    it("should return input as is when parsing fails", () => {
      const result = str.upper(123 as any);
      expect(result).toBe(123);
    });
  });

  describe("lower", () => {
    it("should transform string to lowercase", () => {
      const result = str.lower("HeLLo");
      expect(result).toBe("hello");
    });

    it("should return input as is when parsing fails", () => {
      const result = str.lower(123 as any);
      expect(result).toBe(123);
    });
  });

  describe("reverse", () => {
    it("should reverse the characters of the string", () => {
      const result = str.reverse("hello");
      expect(result).toBe("olleh");
    });

    it("should return input as is when parsing fails", () => {
      const result = str.reverse(123 as any);
      expect(result).toBe(123);
    });
  });

  describe("empty", () => {
    it("should return true for an empty string", () => {
      const result = str.empty("");
      expect(result).toBe(true);
    });

    it("should return false for a non-empty string", () => {
      const result = str.empty("hello");
      expect(result).toBe(false);
    });
  });

  describe("has", () => {
    it("should return true if the string contains the specified substring", () => {
      const result = str.has("hello", "el");
      expect(result).toBe(true);
    });

    it("should return false if the string does not contain the specified substring", () => {
      const result = str.has("hello", "le");
      expect(result).toBe(false);
    });
  });

  describe("quote", () => {
    it("should wrap the string in double quotes", () => {
      const result = str.quote("hello");
      expect(result).toBe('"hello"');
    });

    it("should return input as is when parsing fails", () => {
      const result = str.quote(123 as any);
      expect(result).toBe(123);
    });
  });

  describe("email", () => {
    it("should return true for a valid email address", () => {
      const result = str.email("test@test.ts");
      expect(result).toBe(true);
    });

    it("should return false for an invalid email address", () => {
      const result = str.email("test@test");
      expect(result).toBe(false);
    });
  });
});
