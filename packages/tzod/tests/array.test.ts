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
});
