import { TNumber } from "@/number";

describe("Number Class", () => {
  let number: TNumber;

  beforeEach(() => {
    number = new TNumber();
  });

  describe("parse", () => {
    it("should parse a string to a number", () => {
      const result = number.parse("1");
      expect(result).toBe(1);
    });

    it("should return a number unchanged", () => {
      const result = number.parse(1);
      expect(result).toBe(1);
    });
  });

  describe("constrain", () => {
    it("should constrain a number within a specified range", () => {
      const result = number.constrain(2, 1, 3);
      expect(result).toBe(2);
    });

    it("should constrain a number to the minimum value", () => {
      const result = number.constrain(0, 1, 3);
      expect(result).toBe(1);
    });

    it("should constrain a number to the maximum value", () => {
      const result = number.constrain(4, 1, 3);
      expect(result).toBe(3);
    });
  });

  describe("percent", () => {
    it("should calculate the percentage of a value relative to a total", () => {
      const result = number.percent(14.5, 100);
      expect(result).toBe(14.5);
    });

    it("should check the percentage of a value relative to a total", () => {
      const result = number.percent(2, 8);
      expect(result).toBe(25);
    });
  });

  describe("toSafe", () => {
    it("should return the original value for a safe integer", () => {
      const result = number.toSafe(42);
      expect(result).toBe(42);
    });

    it("should return 0 for a non-safe integer", () => {
      const result = number.toSafe(Number.MAX_SAFE_INTEGER + 1);
      expect(result).toBe(0);
    });
  });

  describe("is", () => {
    describe("even", () => {
      it("should return true for an even number", () => {
        const result = number.is.even(2);
        expect(result).toBe(true);
      });

      it("should return false for an odd number", () => {
        const result = number.is.even(3);
        expect(result).toBe(false);
      });
    });

    describe("odd", () => {
      it("should return true for an odd number", () => {
        const result = number.is.odd(3);
        expect(result).toBe(true);
      });

      it("should return false for an even number", () => {
        const result = number.is.odd(2);
        expect(result).toBe(false);
      });
    });

    describe("between", () => {
      it("should return true if the number is between the specified range", () => {
        const result = number.is.between(2, 1, 3);
        expect(result).toBe(true);
      });

      it("should return false if the number is outside the specified range", () => {
        const result = number.is.between(4, 1, 3);
        expect(result).toBe(false);
      });
    });

    describe("safe", () => {
      it("should return true for a safe integer", () => {
        const result = number.is.safe(42);
        expect(result).toBe(true);
      });

      it("should return false for NaN", () => {
        const result = number.is.safe(NaN);
        expect(result).toBe(false);
      });

      it("should return false for Infinity", () => {
        const result = number.is.safe(Infinity);
        expect(result).toBe(false);
      });

      it("should return false for non-safe integer", () => {
        const result = number.is.safe(Number.MAX_SAFE_INTEGER + 1);
        expect(result).toBe(false);
      });
    });
  });
});
