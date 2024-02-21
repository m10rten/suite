export class HTTPError extends Error {
  constructor(
    public readonly response: Response,
    message: string,
  ) {
    super(message);
  }
}
export class TimeoutError extends Error {
  constructor(
    public duration: number,
    message: string,
  ) {
    super(message);
  }
}

export class AbortError extends Error {
  constructor(message: string) {
    super(message);
  }
}
