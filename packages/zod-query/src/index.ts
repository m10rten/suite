/* eslint-disable @typescript-eslint/no-namespace */

export namespace ZodQuery {}

export interface QueryClient<T> {
  get: (query: string) => Promise<T>;
  put: (query: string, data: T) => Promise<T>;
  delete: (query: string) => Promise<T>;
  where: (query: string) => QueryClient<T>;
  first: () => QueryClient<T>;
  select: (query: string) => QueryClient<T>;
  exec: () => Promise<T>;
}
