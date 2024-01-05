export interface IArray {
  shuffle: <T>(array: T[]) => T[];
}

export class Array implements IArray {
  public shuffle<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
