export class HTTPError extends Error {
  constructor(
    public readonly response: Response,
    message?: string,
  ) {
    super(message || `HTTP Error: ${response.status} ${response.statusText}`);
  }
}
export class TimeoutError extends Error {
  constructor(
    public duration: number,
    message?: string,
  ) {
    super(message || `Request timed out after ${duration}ms`);
  }
}

export class AbortError extends Error {
  constructor(message?: string) {
    super(message || "Request aborted");
  }
}
