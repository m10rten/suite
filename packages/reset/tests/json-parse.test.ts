/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { doNotExecute, Equal, Expect } from "@mvdlei/types";

describe("JSON.parse", () => {
  it("should test true", () => {
    expect(true).toBe(true);
  });
  doNotExecute(() => {
    const result = JSON.parse("{}");

    // @ts-ignore
    type tests = [Expect<Equal<typeof result, unknown>>];
  });

  doNotExecute(() => {
    // Make tests fail when someone tries to PR JSON.parse<T>

    // @ts-expect-error
    const result = JSON.parse<string>("{}");
  });
});
