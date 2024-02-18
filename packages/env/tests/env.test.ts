import { z } from "zod";

import { define, Env } from "@/env";

describe("env", () => {
  describe("get", () => {
    const NON_EXISTING_KEY = "NON_EXISTING_KEY";
    const TEST_KEY = "TEST_KEY";
    it("should return the value of the environment variable", () => {
      const env = Env.init({ source: { [TEST_KEY]: "development" } });
      const result = env.get(TEST_KEY);
      expect(result).toBe("development");
    });

    it("should throw an error if the environment variable is not set", () => {
      const env = Env.init({ strict: true });
      expect(() => env.get(NON_EXISTING_KEY)).toThrow(
        `Environment variable "${NON_EXISTING_KEY}" is not set`,
      );
    });

    it("should not throw an error if the environment variable is not set and strict is false", () => {
      const env = Env.init({ strict: false });
      expect(() => env.get(NON_EXISTING_KEY)).not.toThrow();
    });

    it("should not throw an error if the environment variable is not set and strict is not set", () => {
      const env = Env.init();
      expect(() => env.get(NON_EXISTING_KEY)).not.toThrow();
    });

    it("should return undefined if the environment variable is not set and strict is false", () => {
      const env = Env.init({ strict: false });
      const result = env.get(NON_EXISTING_KEY);
      expect(result).toBeUndefined();
    });

    it("should return undefined if the environment variable is not set and strict is not set", () => {
      const env = Env.init();
      const result = env.get(NON_EXISTING_KEY);
      expect(result).toBeUndefined();
    });

    it("should return `undefined` false with custom source and strict is false", () => {
      const env = Env.init({ source: { KEY: undefined }, strict: false });
      const result = env.get("KEY");
      expect(result).toBeUndefined();
    });

    it("should throw with custom undefined source and strict is set to true", () => {
      const env = Env.init({ source: { [NON_EXISTING_KEY]: undefined }, strict: true });
      expect(() => env.get(NON_EXISTING_KEY)).toThrow(
        `Environment variable "${NON_EXISTING_KEY}" is not set`,
      );
    });

    it("should return `undefined` with custom undefined source and strict is set to false", () => {
      const env = Env.init({ source: { [TEST_KEY]: undefined }, strict: false });
      const result = env.get(TEST_KEY);
      expect(result).toBeUndefined();
    });

    it("should return `undefined` with custom undefined source and strict is not set", () => {
      const env = Env.init({ source: {} });
      const result = env.get(TEST_KEY);
      expect(result).toBeUndefined();
    });

    it("should test with default value", () => {
      const env = Env.init({ source: { [TEST_KEY]: "development" } });
      const result = env.get(NON_EXISTING_KEY, "development");
      expect(result).toBe("development");
    });

    it("should test with default value and strict is set to true", () => {
      const env = Env.init({ source: { [TEST_KEY]: "development" }, strict: true });
      const result = env.get(NON_EXISTING_KEY, "development");
      expect(result).toBe("development");
    });
  });

  describe("set", () => {
    const TEST_KEY = "TEST_KEY";
    const TEST_VALUE = "TEST_VALUE";
    it("should set the environment variable", () => {
      const env = Env.init();
      env.set(TEST_KEY, TEST_VALUE);
      const result = env.get(TEST_KEY);
      expect(result).toBe(TEST_VALUE);
    });

    it("should throw an error if the environment variable is already set and strict is set to true", () => {
      const env = Env.init({ source: { [TEST_KEY]: TEST_VALUE }, strict: true });
      expect(() => env.set(TEST_KEY, TEST_VALUE)).toThrow(
        `Environment variable "${TEST_KEY}" is already set`,
      );
    });

    it("should not throw an error if the environment variable is already set and strict is false", () => {
      const env = Env.init({ source: { [TEST_KEY]: TEST_VALUE }, strict: false });
      expect(() => env.set(TEST_KEY, TEST_VALUE)).not.toThrow();
    });

    it("should not throw an error if the environment variable is already set and strict is not set", () => {
      const env = Env.init({ source: { [TEST_KEY]: TEST_VALUE } });
      expect(() => env.set(TEST_KEY, TEST_VALUE)).not.toThrow();
    });

    it("should set the environment variable if the environment variable is already set and strict is false", () => {
      const env = Env.init({ source: { [TEST_KEY]: TEST_VALUE }, strict: false });
      env.set(TEST_KEY, TEST_VALUE);
      const result = env.get(TEST_KEY);
      expect(result).toBe(TEST_VALUE);
    });

    it("should set the environment variable if the environment variable is already set and strict is not set", () => {
      const env = Env.init({ source: { [TEST_KEY]: TEST_VALUE } });
      env.set(TEST_KEY, TEST_VALUE);
      const result = env.get(TEST_KEY);
      expect(result).toBe(TEST_VALUE);
    });
  });

  describe("Env", () => {
    it("should get from Env.get", () => {
      const result = Env.get("NON_EXISTING_KEY");
      expect(result).toBeUndefined();
    });

    it("should set from Env.set", () => {
      Env.set("TEST_KEY", "TEST_VALUE");
      const result = Env.get("TEST_KEY");
      expect(result).toBe("TEST_VALUE");
    });
  });

  describe("define", () => {
    const TEST_KEY = "TEST_KEY";
    const TEST_VALUE = "TEST_VALUE";
    it("should create a new env set", () => {
      const env = define({
        env: {
          [TEST_KEY]: z.string(),
        },
        source: { [TEST_KEY]: TEST_VALUE },
      });

      expect(env.TEST_KEY).toBe(TEST_VALUE);
    });
  });
});
