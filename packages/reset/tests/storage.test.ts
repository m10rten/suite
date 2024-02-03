/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { doNotExecute, Equal, Expect } from "@mvdlei/types";

describe("Storage", () => {
  it("should test true", () => {
    expect(true).toBe(true);
  });
  // Ensure that arbitrary access to localStorage is not allowed
  doNotExecute(() => {
    // @ts-expect-error
    type test = Expect<Equal<typeof localStorage.a, unknown>>;

    // @ts-expect-error
    localStorage.a.b.c;
  });

  // Ensure that the type of localStorage remains correct
  doNotExecute(() => {
    // @ts-ignore
    type tests = [
      Expect<Equal<typeof localStorage.getItem, (key: string) => string | null>>,
      Expect<Equal<typeof localStorage.setItem, (key: string, value: string) => void>>,
      Expect<Equal<typeof localStorage.removeItem, (key: string) => void>>,
      Expect<Equal<typeof localStorage.clear, () => void>>,
      Expect<Equal<typeof localStorage.key, (index: number) => string | null>>,
      Expect<Equal<typeof localStorage.length, number>>,
    ];
  });

  // Ensure that arbitrary access to sessionStorage is not allowed
  doNotExecute(() => {
    // @ts-ignore
    type test = Expect<Equal<typeof sessionStorage.a, unknown>>;

    // @ts-expect-error
    sessionStorage.a.b.c;
  });

  // Ensure that the type of sessionStorage remains correct
  doNotExecute(() => {
    // @ts-ignore
    type tests = [
      Expect<Equal<typeof sessionStorage.getItem, (key: string) => string | null>>,
      Expect<Equal<typeof sessionStorage.setItem, (key: string, value: string) => void>>,
      Expect<Equal<typeof sessionStorage.removeItem, (key: string) => void>>,
      Expect<Equal<typeof sessionStorage.clear, () => void>>,
      Expect<Equal<typeof sessionStorage.key, (index: number) => string | null>>,
      Expect<Equal<typeof sessionStorage.length, number>>,
    ];
  });
});
