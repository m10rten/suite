export interface IArray {
  /**
   * Shuffle an array
   * @param array
   * @returns Shuffled array
   */
  shuffle: <T>(array: T[]) => T[];
}

export class TArray implements IArray {
  public shuffle<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
