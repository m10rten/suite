import { t } from "@mvdlei/tzod";

import { ApiInit } from "./fetch";
import { Web } from "./index";

export const makeUrl = (input: Request | string | URL, init?: ApiInit): URL => {
  const path = init?.path ?? "";
  const origin = init?.origin ?? init?.baseUrl ?? Web.Api.Origin.fromEnv();

  const inputWithoutDoubleSlash = stripDoubleSlash(input.toString());

  const url = t.to.url(inputWithoutDoubleSlash, origin);
  if (path) url.pathname = `${path}${slashIt(url.pathname)}`;

  if (init?.params) {
    const existingParams = new URLSearchParams(url.search);
    const initParams = new URLSearchParams(init.params);
    const combinedParams = new URLSearchParams(
      `${existingParams.toString()}&${initParams.toString()}`,
    );

    const params = new URLSearchParams();
    combinedParams.forEach((value, key) => {
      params.set(key, value);
    });

    url.search = params.toString();
  }

  return url;
};

export const slashIt = (str: string) => (str.endsWith("/") ? str : `${str}/`);
export const stripDoubleSlash = (str: string) => str.replace(/[/]{2,}/g, "/");
