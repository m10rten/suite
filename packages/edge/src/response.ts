/* eslint-disable @typescript-eslint/no-namespace */

export interface IEdgeResponse {
  /**
   * Should set the status of the EdgeResponse.
   *
   * @example
   * ```ts
   * import { EdgeResponse } from '@mvdlei/edge';
   *
   * const EdgeResponse = new EdgeResponse();
   *
   * EdgeResponse.status(200);
   *
   * // or
   *
   * EdgeResponse.status(200);
   * ```
   */
  status(status: number): IEdgeResponse;

  /**
   * Should set the body of the EdgeResponse.
   *
   * @example
   * ```ts
   * import { EdgeResponse } from '@mvdlei/edge';
   *
   * const edge = new EdgeResponse();
   *
   * edge.json({ message: "Hello, World!" });
   *
   * // or
   *
   * EdgeResponse.json({ message: "Hello, World!" });
   * ```
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
   */
  json(body: unknown, init?: ResponseInit): Response;

  /**
   * Should send a text response.
   * @param body {string} - The text to send
   * @example
   * ```ts
   * import { EdgeResponse } from '@mvdlei/edge';
   * const res = new EdgeResponse();
   * res.text("Hello, World!");
   * // or
   * EdgeResponse.text("Hello, World!");
   * ```
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
   */
  text(body: string): Response;

  /**
   * Should send a response
   * @param body {unknown} - The body to send
   * @example
   * ```ts
   * import { EdgeResponse } from '@mvdlei/edge';
   * const res = new EdgeResponse();
   * res.send({...});
   * // or
   * EdgeResponse.send({...});
   * ```
   */
  send(body: unknown): Response;

  /**
   * Should set the headers of the EdgeResponse.
   *
   * @example
   * ```ts
   * import { EdgeResponse } from '@mvdlei/edge';
   *
   * const EdgeResponse = new EdgeResponse();
   *
   * EdgeResponse.headers({ "content-type": "application/json" });
   *
   * // or
   *
   * EdgeResponse.headers({ "content-type": "application/json" });
   * ```
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
   */
  headers(headers: Record<string, string>): IEdgeResponse;

  /**
   * Ends the response.
   *
   * .json, .text, .send will also end the response.
   *
   * @example
   * ```ts
   * import { EdgeResponse } from '@mvdlei/edge';
   *
   * const res = new EdgeResponse();
   *
   * res.status(200).end();
   *
   * // or
   *
   * EdgeResponse.status(200).end();
   * ```
   */
  end(): Response;
}

/**
 * Used to create a builder pattern on top of the Response web API class.
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Response
 *
 * @example
 * ```ts
 * import { EdgeResponse } from '@mvdlei/edge';
 *
 * const res = new EdgeResponse();
 *
 * res.status(200).json({ message: "Hello, World!" });
 *
 * // or
 *
 * EdgeResponse.status(200).json({ message: "Hello, World!" });
 * ```
 */
export class EdgeResponse implements IEdgeResponse {
  private _body: unknown;
  private _status: number;
  private _headers: Record<string, string>;

  constructor() {
    this._body = {};
    this._status = 200;
    this._headers = {};
  }

  status(status: number): EdgeResponse {
    this._status = status;
    return this;
  }
  headers(headers: Record<string, string>): EdgeResponse {
    this._headers = headers;
    return this;
  }

  json(body: unknown, init?: ResponseInit): Response {
    return Response.json(body, {
      status: this._status,
      headers: {
        ...this._headers,
        "content-type": "application/json",
      },
      ...init,
    });
  }

  text(body: string): Response {
    return new Response(body, {
      status: this._status,
      headers: {
        ...this._headers,
        "content-type": "text/plain",
      },
    });
  }

  send(body: unknown): Response {
    return new Response(JSON.stringify(body), {
      status: this._status,
      headers: {
        ...this._headers,
      },
    });
  }

  end(): Response {
    return Response.json(this._body, {
      status: this._status,
      headers: this._headers,
    });
  }
}

export namespace EdgeResponse {
  export const status = (status: number) => new EdgeResponse().status(status);
  export const json = (body: unknown) => new EdgeResponse().json(body);
  export const headers = (headers: Record<string, string>) =>
    new EdgeResponse().headers(headers);
  export const error = {
    internalServerError: (error: string) =>
      new EdgeResponse().status(500).json({ error }),
    notFound: (error: string) => new EdgeResponse().status(404).json({ error }),
    badRequest: (error: string) => new EdgeResponse().status(400).json({ error }),
  };
  /**
   * Quickly end the response with a status code 200.
   *
   * Do note that .json, .text, .send will also end the response.
   * @returns
   */
  export const end = () => new EdgeResponse().end();

  /**
   * Should return a new EdgeResponse with the status set to 200.
   *
   * @example
   * ```ts
   * import { EdgeResponse } from '@mvdlei/edge';
   *
   * const res = EdgeResponse.ok();
   * ```
   */
  export const ok = () => new EdgeResponse().status(200).end();
}

export namespace Quick {
  export const STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,
    MULTI_STATUS: 207,
    ALREADY_REPORTED: 208,
    IM_USED: 226,
    MULTIPLE_CHOICES: 300,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    USE_PROXY: 305,
    TEMPORARY_REDIRECT: 307,
    PERMANENT_REDIRECT: 308,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    PAYLOAD_TOO_LARGE: 413,
    URI_TOO_LONG: 414,
    UNSUPPORTED_MEDIA_TYPE: 415,
    RANGE_NOT_SATISFIABLE: 416,
    EXPECTATION_FAILED: 417,
    IM_A_TEAPOT: 418,
    MISDIRECTED_REQUEST: 421,
    UNPROCESSABLE_ENTITY: 422,
    LOCKED: 423,
    FAILED_DEPENDENCY: 424,
    UPGRADE_REQUIRED: 426,
    PRECONDITION_REQUIRED: 428,
    TOO_MANY_REQUESTS: 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
    UNAVAILABLE_FOR_LEGAL_REASONS: 451,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505,
    VARIANT_ALSO_NEGOTIATES: 506,
    INSUFFICIENT_STORAGE: 507,
    LOOP_DETECTED: 508,
    NOT_EXTENDED: 510,
    NETWORK_AUTHENTICATION_REQUIRED: 511,
  } as const;

  export namespace HTTP {
    // 2xx section
    export const ok = () => new EdgeResponse().status(STATUS_CODES.OK).end();
    export const created = () => new EdgeResponse().status(STATUS_CODES.CREATED).end();
    export const accepted = () => new EdgeResponse().status(STATUS_CODES.ACCEPTED).end();
    export const noContent = () =>
      new EdgeResponse().status(STATUS_CODES.NO_CONTENT).end();
    export const resetContent = () =>
      new EdgeResponse().status(STATUS_CODES.RESET_CONTENT).end();
    export const partialContent = () =>
      new EdgeResponse().status(STATUS_CODES.PARTIAL_CONTENT).end();
    export const multiStatus = () =>
      new EdgeResponse().status(STATUS_CODES.MULTI_STATUS).end();
    export const alreadyReported = () =>
      new EdgeResponse().status(STATUS_CODES.ALREADY_REPORTED).end();
    export const imUsed = () => new EdgeResponse().status(STATUS_CODES.IM_USED).end();

    // 3xx section
    export const multipleChoices = () =>
      new EdgeResponse().status(STATUS_CODES.MULTIPLE_CHOICES).end();
    export const movedPermanently = () =>
      new EdgeResponse().status(STATUS_CODES.MOVED_PERMANENTLY).end();
    export const found = () => new EdgeResponse().status(STATUS_CODES.FOUND).end();
    export const seeOther = () =>
      new EdgeResponse().status(STATUS_CODES.SEE_OTHER).end();
    export const notModified = () =>
      new EdgeResponse().status(STATUS_CODES.NOT_MODIFIED).end();
    export const useProxy = () =>
      new EdgeResponse().status(STATUS_CODES.USE_PROXY).end();
    export const temporaryRedirect = () =>
      new EdgeResponse().status(STATUS_CODES.TEMPORARY_REDIRECT).end();
    export const permanentRedirect = () =>
      new EdgeResponse().status(STATUS_CODES.PERMANENT_REDIRECT).end();

    // 4xx section
    export const badRequest = () =>
      new EdgeResponse().status(STATUS_CODES.BAD_REQUEST).end();
    export const unauthorized = () =>
      new EdgeResponse().status(STATUS_CODES.UNAUTHORIZED).end();
    export const paymentRequired = () =>
      new EdgeResponse().status(STATUS_CODES.PAYMENT_REQUIRED).end();
    export const forbidden = () =>
      new EdgeResponse().status(STATUS_CODES.FORBIDDEN).end();
    export const notFound = () =>
      new EdgeResponse().status(STATUS_CODES.NOT_FOUND).end();
    export const methodNotAllowed = () =>
      new EdgeResponse().status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
    export const notAcceptable = () =>
      new EdgeResponse().status(STATUS_CODES.NOT_ACCEPTABLE).end();
    export const proxyAuthenticationRequired = () =>
      new EdgeResponse().status(STATUS_CODES.PROXY_AUTHENTICATION_REQUIRED).end();
    export const requestTimeout = () =>
      new EdgeResponse().status(STATUS_CODES.REQUEST_TIMEOUT).end();
    export const conflict = () => new EdgeResponse().status(STATUS_CODES.CONFLICT).end();
    export const gone = () => new EdgeResponse().status(STATUS_CODES.GONE).end();
    export const lengthRequired = () =>
      new EdgeResponse().status(STATUS_CODES.LENGTH_REQUIRED).end();
    export const preconditionFailed = () =>
      new EdgeResponse().status(STATUS_CODES.PRECONDITION_FAILED).end();
    export const payloadTooLarge = () =>
      new EdgeResponse().status(STATUS_CODES.PAYLOAD_TOO_LARGE).end();
    export const uriTooLong = () =>
      new EdgeResponse().status(STATUS_CODES.URI_TOO_LONG).end();
    export const unsupportedMediaType = () =>
      new EdgeResponse().status(STATUS_CODES.UNSUPPORTED_MEDIA_TYPE).end();
    export const rangeNotSatisfiable = () =>
      new EdgeResponse().status(STATUS_CODES.RANGE_NOT_SATISFIABLE).end();
    export const expectationFailed = () =>
      new EdgeResponse().status(STATUS_CODES.EXPECTATION_FAILED).end();
    export const imATeapot = () =>
      new EdgeResponse().status(STATUS_CODES.IM_A_TEAPOT).end();
    export const misdirectedRequest = () =>
      new EdgeResponse().status(STATUS_CODES.MISDIRECTED_REQUEST).end();
    export const unprocessableEntity = () =>
      new EdgeResponse().status(STATUS_CODES.UNPROCESSABLE_ENTITY).end();
    export const locked = () => new EdgeResponse().status(STATUS_CODES.LOCKED).end();
    export const failedDependency = () =>
      new EdgeResponse().status(STATUS_CODES.FAILED_DEPENDENCY).end();
    export const upgradeRequired = () =>
      new EdgeResponse().status(STATUS_CODES.UPGRADE_REQUIRED).end();
    export const preconditionRequired = () =>
      new EdgeResponse().status(STATUS_CODES.PRECONDITION_REQUIRED).end();
    export const tooManyRequests = () =>
      new EdgeResponse().status(STATUS_CODES.TOO_MANY_REQUESTS).end();
    export const requestHeaderFieldsTooLarge = () =>
      new EdgeResponse().status(STATUS_CODES.REQUEST_HEADER_FIELDS_TOO_LARGE).end();
    export const unavailableForLegalReasons = () =>
      new EdgeResponse().status(STATUS_CODES.UNAVAILABLE_FOR_LEGAL_REASONS).end();

    // 5xx section
    export const internalServerError = () =>
      new EdgeResponse().status(STATUS_CODES.INTERNAL_SERVER_ERROR).end();
    export const notImplemented = () =>
      new EdgeResponse().status(STATUS_CODES.NOT_IMPLEMENTED).end();
    export const badGateway = () =>
      new EdgeResponse().status(STATUS_CODES.BAD_GATEWAY).end();
    export const serviceUnavailable = () =>
      new EdgeResponse().status(STATUS_CODES.SERVICE_UNAVAILABLE).end();
    export const gatewayTimeout = () =>
      new EdgeResponse().status(STATUS_CODES.GATEWAY_TIMEOUT).end();
    export const httpVersionNotSupported = () =>
      new EdgeResponse().status(STATUS_CODES.HTTP_VERSION_NOT_SUPPORTED).end();
    export const variantAlsoNegotiates = () =>
      new EdgeResponse().status(STATUS_CODES.VARIANT_ALSO_NEGOTIATES).end();
    export const insufficientStorage = () =>
      new EdgeResponse().status(STATUS_CODES.INSUFFICIENT_STORAGE).end();
    export const loopDetected = () =>
      new EdgeResponse().status(STATUS_CODES.LOOP_DETECTED).end();
    export const notExtended = () =>
      new EdgeResponse().status(STATUS_CODES.NOT_EXTENDED).end();
    export const networkAuthenticationRequired = () =>
      new EdgeResponse().status(STATUS_CODES.NETWORK_AUTHENTICATION_REQUIRED).end();
  }

  // Custom
  /**
   * Quickly end the response with a status code 200.
   * @returns
   */
  export const end = () => new EdgeResponse().end();
  /**
   * Quickly send a response with a status code 200.
   * @param body
   * @returns
   */
  export const send = (body: unknown) => new EdgeResponse().send(body);
  export const text = (body: string) => new EdgeResponse().text(body);
  /**
   * quickly send a json response with status code 200
   * @param body
   * @returns
   */
  export const json = (body: unknown) => new EdgeResponse().json(body);
  /**
   * Send & end a response with a status code, no body.
   * @param status
   * @returns
   */
  export const code = (status: number) => new EdgeResponse().status(status).end();

  /**
   * Set the status of the response.
   *
   * Use .code if you want to end the response.
   */
  export const status = (status: number) => new EdgeResponse().status(status);
}

// /**
//  * Test code:
//  */

// const res = new EdgeResponse();

// res.status(200).json({ message: "Hello, World!" });

// Quick.HTTP.ok();
