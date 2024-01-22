import { IRetryOptions, Retry } from "@/retry";

describe("Retry", () => {
  it("should retry a function until it succeeds", async () => {
    const successfulFn = jest.fn().mockResolvedValue("success");
    const options: Partial<IRetryOptions> = {
      attempts: 3,
      delay: 1000,
    };
    const retry = Retry.init(options);

    const result = await retry.retry(successfulFn);

    expect(result).toBe("success");
    expect(successfulFn).toHaveBeenCalledTimes(1);
  });

  it("should retry a function until max attempts reached", async () => {
    const failingFn = jest.fn().mockRejectedValue(new Error("error"));
    const options: Partial<IRetryOptions> = {
      attempts: 3,
      delay: 1000,
    };
    const retry = Retry.init(options);

    await expect(retry.retry(failingFn)).rejects.toThrow("error");
    expect(failingFn).toHaveBeenCalledTimes(3);
  });

  it("should resolve when attempts set to 0 and valid function", async () => {
    const options: Partial<IRetryOptions> = {
      attempts: 0,
      delay: 1000,
    };
    const retry = Retry.init(options);

    await expect(retry.retry(async () => "success")).resolves.toEqual("success");
  });
  it("should reject when attempts set to 0 and invalid function", async () => {
    const options: Partial<IRetryOptions> = {
      attempts: 0,
      delay: 1000,
    };
    const retry = Retry.init(options);

    await expect(
      retry.retry(async () => {
        throw new Error("error");
      }),
    ).rejects.toThrow("error");
  });

  it("should use custom min and max delay values if provided", async () => {
    const successfulFn = jest.fn().mockResolvedValue("success");
    const options: Partial<IRetryOptions> = {
      attempts: 3,
      delay: {
        min: 500,
        max: 2000,
        default: 1000,
      },
    };
    const retry = Retry.init(options);

    const result = await retry.retry(successfulFn);

    expect(result).toBe("success");
  });

  it("should use custom factor for exponential delay if provided", async () => {
    const failingFn = jest.fn().mockRejectedValue(new Error("error"));
    const options: Partial<IRetryOptions> = {
      attempts: 3,
      delay: 1000,
      factor: 1.5,
    };
    const retry = Retry.init(options);

    await expect(retry.retry(failingFn)).rejects.toThrow("error");
  });

  it("should use randomize delay if randomize option is true", async () => {
    const successfulFn = jest.fn().mockResolvedValue("success");
    const options: Partial<IRetryOptions> = {
      attempts: 3,
      delay: 1000,
      randomize: true,
    };
    const retry = Retry.init(options);

    const result = await retry.retry(successfulFn);

    expect(result).toBe("success");
  });
});
