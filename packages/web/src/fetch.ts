/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-console */

import { logger } from "@mvdlei/log";

import { makeUrl } from "./_utils";
import { HttpError } from "./errors";

export interface ApiInit extends RequestInit {
  /**
   * The Parameters added to the URL
   *
   * @example
   * ```ts
   * const response = await api("https://api.github.com/users/octocat", {
   *  params: {
   *   page: "1",
   *   per_page: "10"
   *  }
   * });
   * ```
   *
   * @example
   * ```ts
   * const response = await api("https://api.github.com/users/octocat", {
   *  params: new URLSearchParams(...)
   * });
   * ```
   *
   * @example
   * ```ts
   * const response = await api("https://api.github.com/users/octocat", {
   *  params: "page=1&per_page=10"
   * });
   * ```
   */
  params?: Record<string, string> | URLSearchParams | string | null | undefined;

  /**
   * Base URL for the request
   *
   * Origin for the input to be called to.
   *
   * Defaults to: `Web.Api.Origin.fromEnv()`
   *
   * @see Web.Api.fromEnv
   *
   * @example
   * ```ts
   * const response = await api("/users/octocat", {
   *   origin: "https://api.github.com", // request will be made to https://api.github.com/users/octocat
   * });
   * ```
   */
  origin?: string;

  /**
   * BaseURL for the request, this is the same as `origin` but with a different name.
   *
   * @see ApiInit.origin
   */
  baseUrl?: string;

  /**
   * Set a base path for the request.
   *
   * @example
   * ```ts
   * const response = await api("/users/octocat", {
   *  path: "/api/v1", // request will be made to /api/v1/users/octocat
   * });
   * ```
   *
   * Please note that this path will always be the first part of the path.
   *
   * @example
   * ```ts
   * const response = await api("/users/octocat", {
   *  origin: "https://api.github.com/v1", // request will be made to https://api.github.com/v1/users/octocat
   *  path: "/api/", // now the request will be made to https://api.github.com/api/v1/users/octocat
   * });
   * ```
   */
  path?: string;
}

export interface ApiResponse extends Response {
  data: unknown;
  json: never;
}

/**
 * Extended version of fetch with defaults for the headers and the base URL.
 *
 * @param input {Request | string | URL} - The input to be called to, can be a URL, string or Request object.
 * @param init {ApiInit} - The options for the request.
 * @returns {Promise<unknown>} - The response from the request, you can use `await` to get the data, you are required to validate and parse the data.
 */
export async function api(
  input: Request | string | URL,
  init?: ApiInit,
): Promise<ApiResponse> {
  const headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  // url that has the queryParams, trailing slash, and base url if present.
  const url = makeUrl(input, init).toString();

  logger.info(`[API]: fetching ${url}`);
  const response = await fetch(url, {
    headers,
    ...init,
  });

  logger.debug(
    `[API]: ${url}: \n { status: ${response.status}, statusText: ${response.statusText}, ok: ${response.ok}, redirected: ${response.redirected}`,
  );
  if (!response.ok) {
    throw new HttpError(response);
  }

  return Object.assign(response, { data: await response.json(), json: undefined });
}
export namespace api {
  export const post = async (input: Request | string | URL, init?: ApiInit) => {
    return api(input, { ...init, method: "POST" });
  };
  export const put = async (input: Request | string | URL, init?: ApiInit) => {
    return api(input, { ...init, method: "PUT" });
  };
  export const patch = async (input: Request | string | URL, init?: ApiInit) => {
    return api(input, { ...init, method: "PATCH" });
  };
  export const del = async (input: Request | string | URL, init?: ApiInit) => {
    return api(input, { ...init, method: "DELETE" });
  };
  export const get = async (input: Request | string | URL, init?: ApiInit) => {
    return api(input, { ...init, method: "GET" });
  };
}
