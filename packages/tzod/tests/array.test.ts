import { TArray } from "@/array";

describe("Array Class", () => {
  let array: TArray;

  beforeEach(() => {
    array = new TArray();
  });

  describe("shuffle", () => {
    it("should shuffle an array", () => {
      const inputArray = [1, 2, 3, 4, 5];
      const shuffledArray = array.shuffle(inputArray);

      // Ensure the shuffled array has the same elements as the input array
      expect(shuffledArray).toHaveLength(inputArray.length);
      inputArray.forEach((item) => {
        expect(shuffledArray).toContain(item);
      });

      // Ensure the shuffled array is not the same as the input array
      expect(shuffledArray).not.toContainEqual(inputArray);
    });

    it("should handle an empty array", () => {
      const inputArray: number[] = [];
      const shuffledArray = array.shuffle(inputArray);

      expect(shuffledArray).toEqual([]);
    });

    it("should handle an array with a single element", () => {
      const inputArray = [42];
      const shuffledArray = array.shuffle(inputArray);

      expect(shuffledArray).toEqual(inputArray);
    });

    it("should handle an array with repeated elements", () => {
      const inputArray = [1, 1, 2, 2, 3, 3];
      const shuffledArray = array.shuffle(inputArray);

      // Ensure the shuffled array has the same elements as the input array
      expect(shuffledArray).toHaveLength(inputArray.length);
      inputArray.forEach((item) => {
        expect(shuffledArray).toContain(item);
      });

      // Ensure the shuffled array is not the same as the input array
      expect(shuffledArray).not.toContainEqual(inputArray);
    });
  });

  describe("random", () => {
    it("should return a random element from an array", () => {
      const inputArray = [1, 2, 3, 4, 5];
      const randomElement = array.random(inputArray);

      expect(inputArray).toContain(randomElement);
    });

    it("should handle an empty array", () => {
      const inputArray: number[] = [];
      const randomElement = array.random(inputArray);

      expect(randomElement).toBeUndefined();
    });

    it("should handle an array with a single element", () => {
      const inputArray = [42];
      const randomElement = array.random(inputArray);

      expect(randomElement).toBe(42);
    });

    it("should handle an array with repeated elements", () => {
      const inputArray = [1, 1, 2, 2, 3, 3];
      const randomElement = array.random(inputArray);

      expect(inputArray).toContain(randomElement);
    });
  });

  describe("clone", () => {
    it("should clone an array", () => {
      const inputArray = [1, 2, 3, 4, 5];
      const clonedArray = array.clone(inputArray);

      expect(clonedArray).toEqual(inputArray);
      expect(clonedArray).not.toBe(inputArray);
    });

    it("should handle an empty array", () => {
      const inputArray: number[] = [];
      const clonedArray = array.clone(inputArray);

      expect(clonedArray).toEqual([]);
      expect(clonedArray).not.toBe(inputArray);
    });

    it("should handle an array with a single element", () => {
      const inputArray = [42];
      const clonedArray = array.clone(inputArray);

      expect(clonedArray).toEqual(inputArray);
      expect(clonedArray).not.toBe(inputArray);
    });

    it("should handle an array with repeated elements", () => {
      const inputArray = [1, 1, 2, 2, 3, 3];
      const clonedArray = array.clone(inputArray);

      expect(clonedArray).toEqual(inputArray);
      expect(clonedArray).not.toBe(inputArray);
    });
  });

  describe("sort", () => {
    it("should sort an array of primitives", () => {
      const inputArray = [5, 4, 3, 2, 1];
      const sortedArray = array.sort(inputArray);

      expect(sortedArray).toEqual([1, 2, 3, 4, 5]);
    });

    it("should sort an array of objects by a key", () => {
      const inputArray = [
        { id: 5, name: "E" },
        { id: 4, name: "D" },
        { id: 3, name: "C" },
        { id: 2, name: "B" },
        { id: 1, name: "A" },
      ];
      const sortedArray = array.sort(inputArray, "id");

      expect(sortedArray).toEqual([
        { id: 1, name: "A" },
        { id: 2, name: "B" },
        { id: 3, name: "C" },
        { id: 4, name: "D" },
        { id: 5, name: "E" },
      ]);
    });

    it("should sort an array of objects by a key in descending order", () => {
      const inputArray = [
        { id: 1, name: "A" },
        { id: 2, name: "B" },
        { id: 3, name: "C" },
        { id: 4, name: "D" },
        { id: 5, name: "E" },
      ];
      const sortedArray = array.sort(inputArray, "id", "desc");

      expect(sortedArray).toEqual([
        { id: 5, name: "E" },
        { id: 4, name: "D" },
        { id: 3, name: "C" },
        { id: 2, name: "B" },
        { id: 1, name: "A" },
      ]);
    });

    it("should sort an array of objects by a key with repeated values", () => {
      const inputArray = [
        { id: 1, name: "A" },
        { id: 2, name: "B" },
        { id: 3, name: "C" },
        { id: 2, name: "D" },
        { id: 1, name: "E" },
      ];
      const sortedArray = array.sort(inputArray, "id");

      expect(sortedArray).toEqual([
        { id: 1, name: "A" },
        { id: 1, name: "E" },
        { id: 2, name: "B" },
        { id: 2, name: "D" },
        { id: 3, name: "C" },
      ]);
    });
  });
});
