export class HttpError extends Error {
  public static is(httpError: unknown): httpError is HttpError {
    return httpError instanceof HttpError;
  }
  constructor(public response: Response) {
    super(`HTTP error: ${response.status}`);
  }

  get status() {
    return this.response.status;
  }

  get redirected() {
    return this.response.redirected;
  }

  get ok() {
    return this.response.ok;
  }
}
