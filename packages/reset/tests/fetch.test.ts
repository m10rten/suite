/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { doNotExecute, Equal, Expect } from "@mvdlei/types";

describe("Fetch", () => {
  it("should test true", () => {
    expect(true).toBe(true);
  });
  doNotExecute(async () => {
    const result = await fetch("/").then((res) => res.json());

    // @ts-ignore
    type tests = [Expect<Equal<typeof result, unknown>>];
  });

  doNotExecute(async () => {
    // Make tests fail when someone tries to PR res.json<T>

    // @ts-ignore
    const result = await fetch("/").then((res) => {
      // @ts-expect-error
      return res.json<string>();
    });
  });
});
