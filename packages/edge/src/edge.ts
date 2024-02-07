/* eslint-disable @typescript-eslint/no-namespace */
import { logger } from "@mvdlei/log";

/**
 * Create an easy route handler for the edge.
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Request
 *
 * @example
 * ```ts
 * import { Edge } from '@mvdlei/edge';
 *
 * export default Edge.new((request: Request) => {
 *  return new Response.json({ message: "Hello, World!" });
 * }).default;
 *
 * // or the web worker/vercel way
 *
 * export const { GET, POST } = Edge.new((request: Request) => {
 *  return new Response.json({ message: "Hello, World!" });
 * });
 *
 * ```
 */
export namespace Edge {
  /**
   * Create a new Edge application.
   * @param path The path to the application.
   * @param handler The handler for the application.
   * @returns The new Edge application.
   */
  export function create(
    handler: <TReq extends Request, TRes extends Response>(request: TReq) => TRes,
  ) {
    logger.info("Creating a new Edge route.");
    return {
      default: handler,
      GET: handler,
      POST: handler,
      PUT: handler,
      DELETE: handler,
      PATCH: handler,
      OPTIONS: handler,
      HEAD: handler,
    };
  }

  /**
   * Should make a custom request object with the added properties, it takes a function to set the properties.
   *
   * @example
   * ```ts
   * import { Edge } from '@mvdlei/edge';
   *
   * type MyProps = {
   *  myProp: string;
   * }
   *
   * export const { GET, POST } = Edge.custom<MyProps>(
   * (_req) => {
   *  // set it how you want, you have the request object to your disposal
   *  // recommended usage is with a tool like zod to validate the request
   *  return {
   *  myProp: "Hello, World!",
   *  }
   * },
   * ```
   */
  export function custom<TProps extends Record<string, unknown>>(
    middleware: (
      req: Request,
    ) => (Promise<TProps> | TProps) | (Response | Promise<Response>),
    handler: <TReq extends Request & TProps>(
      request: TReq,
    ) => Promise<Response> | Response,
  ) {
    logger.info("Creating a new Edge route with custom properties.");

    const newHandler = async (request: Request) => {
      const middlewareResponse = await middleware(request);
      if (middlewareResponse instanceof Response) {
        return middlewareResponse;
      }
      const customRequest = Object.assign(request, middlewareResponse);
      return handler(customRequest);
    };

    return {
      default: newHandler,
      GET: newHandler,
      POST: newHandler,
      PUT: newHandler,
      DELETE: newHandler,
      PATCH: newHandler,
      OPTIONS: newHandler,
      HEAD: newHandler,
    };
  }
}

export default Edge;

// type MyProps = {
//   myProp: string;
// };

// export const { GET, POST } = Edge.custom<MyProps>(
//   () => {
//     if (Math.random() > 0.5) {
//       return Response.json({ error: "Random error" });
//     }
//     return {
//       myProp: "Hello, World!",
//     };
//   },
//   (req) => {
//     return Response.json({ message: req.myProp });
//   },
// );
