/* eslint-disable @typescript-eslint/no-explicit-any */

import { Iglo } from "@/iglo"; // Assuming you export Iglo and MyError from your file

class MyError extends Error {
  name = "MyError";
  constructor(
    message: string,
    public code = 0,
  ) {
    super(message);
  }
}

jest.mock("@mvdlei/log", () => ({
  logger: {
    log: jest.fn(),
    error: jest.fn(),
  },
}));

describe("Iglo", () => {
  let iglo: Iglo;

  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
    iglo = Iglo.init(); // Initialize a new Iglo instance before each test
  });

  describe("fish", () => {
    it("should add a handler for a specific error type", () => {
      const handler = jest.fn();
      iglo.fish(MyError, handler);

      expect(iglo["_handlers"].size).toBe(1); // One handler added
      expect(iglo["_handlers"].get(MyError)).toBe(handler); // Handler is the one added
    });
  });

  describe("melt", () => {
    it("should clear all handlers when called", () => {
      const handler = jest.fn();
      iglo.fish(MyError, handler);

      expect(iglo["_handlers"].size).toBe(1); // One handler added

      iglo.melt();

      expect(iglo["_handlers"].size).toBe(0); // All handlers cleared
    });

    it("should exit the process if running in Node.js environment and stop parameter is true", () => {
      const processExitSpy = jest
        .spyOn(process, "exit")
        .mockImplementationOnce(jest.fn() as any);
      iglo.melt(0, true);
      expect(processExitSpy).toHaveBeenCalledWith(0);
      processExitSpy.mockRestore();
    });

    it("should not exit the process if running in Node.js environment and stop parameter is false or undefined", () => {
      const processExitSpy = jest
        .spyOn(process, "exit")
        .mockImplementationOnce(jest.fn() as any);
      iglo.melt(0, false);
      expect(processExitSpy).not.toHaveBeenCalled();
      iglo.melt(0);
      expect(processExitSpy).not.toHaveBeenCalled();
      processExitSpy.mockRestore();
    });
  });

  describe("panic", () => {
    it("should throw an error if the argument is a string", () => {
      expect(() => {
        iglo.panic("Test error");
      }).toThrow("Test error");
    });

    it("should throw the provided error", () => {
      const myError = new MyError("Test error", 500);
      expect(() => {
        iglo.panic(myError);
      }).toThrow(myError);
    });
  });

  describe("shell", () => {
    it("should execute the callback and return its result if no error occurs", async () => {
      const callback = jest.fn().mockReturnValue("Test result");
      const result = await iglo.shell(callback);
      expect(callback).toHaveBeenCalled();
      expect(result).toBe("Test result");
    });

    it("should call the appropriate error handler if an error occurs", async () => {
      const error = new MyError("Test error", 500);
      const handler = jest.fn();
      iglo.fish(MyError, handler);
      const callback = jest.fn().mockRejectedValue(error);
      await iglo.shell(callback);
      expect(handler).toHaveBeenCalledWith(error);
    });
  });
});
