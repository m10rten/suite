/* eslint-disable @typescript-eslint/no-namespace */

// eslint-disable-next-line no-console
console.log(`
Thanks for using 'zod-query'! 🎉
This package is still in development and this version has no features (yet), so please be patient...

If you have any feedback or suggestions, please let me know!
👉 https://github.com/m10rten/suite/issues
`);

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
