/**
 * @file Type Helpers - Type aliases for primitive types
 */

/**
 * @type {Prettify} - Type alias for prettified types
 *
 * Easy way to make types readable in your IDE.
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & unknown;

/**
 * @type {WithRequired} - Type alias for required properties
 *
 * @example
 * ```ts
 * interface User {
 *  name: string;
 *  age: number;
 * }
 *
 * type Optional = Partial<User>;
 * type UserWithRequiredAge = WithRequired<Optional, 'age'>;
 * ```
 */
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

/**
 * @type {ExtractKeys} - Type alias for extracting keys from an object
 * @template T - Object type
 * @example
 * ```ts
 * interface User {
 *  name: string;
 *  age: number;
 * }
 * type UserKeys = ExtractKeys<User>; // 'name' | 'age'
 * ```
 */
export type ExtractKeys<T> = T extends { [K in keyof T]: infer _ }
  ? Extract<keyof T, string>
  : never;

/**
 * @type {Mutable} - Type alias for mutable types
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

/**
 * @type {FunctionKeys} - Type alias for object function keys
 *
 * @template T - Object type
 */
export type FunctionKeys<T extends object> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

/**
 * @type {PropertyKeys} - Type alias for object property keys
 *
 * @template T - Object type
 */
export type PropertyKeys<T> = T extends object ? keyof T : never;

/**
 * @type {Equal} - Type alias for type equality
 *
 * @template X - Type to compare
 * @template Y - Type to compare
 */
export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

/**
 * @type {NotEqual} - Type alias for type inequality
 *
 * @template X - Type to compare
 * @template Y - Type to compare
 */
export type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;

/**
 * @type {IsAny} - Type alias for `any` type check
 */
export type IsAny<T> = 0 extends 1 & T ? true : false;

/**
 * @type {NotAny} - Type alias for `any` type check
 */
export type NotAny<T> = true extends IsAny<T> ? false : true;

/**
 * @type {IsUnknown} - Type alias for `unknown` type check
 */
export type IsUnknown<T> = unknown extends T ? NotAny<T> : false;

/**
 * @type {NotUnknown} - Type alias for `unknown` type check
 */
export type NotUnknown<T> = true extends IsUnknown<T> ? false : true;

/**
 * @type {IsNever} - Type alias for `never` type check
 */
export type IsNever<T> = [T] extends [never] ? true : false;

/**
 * @type {NotNever} - Type alias for `never` type check
 */
export type NotNever<T> = true extends IsNever<T> ? false : true;

/**
 * @type {IsTrue} - Type alias for `true` type check
 */
export type IsTrue<T extends true> = T;

/**
 * @type {IsFalse} - Type alias for `false` type check
 */
export type IsFalse<T extends false> = T;

/**
 * @type {Awaitable} - Type alias for awaitable types (e.g. `Promise` or `PromiseLike`)
 */
export type Awaitable<T> = Promise<T> | PromiseLike<T>;

/**
 * @type {Guard} - Type alias for type guards
 */
export type Guard<T> = (value: unknown) => value is T;

/**
 * @type {Coerce} - Type alias for type coercions
 */
export type Coerce<T> = (value: unknown) => T;

/**
 * @type {Check} - Type alias for type checks with boolean return
 */
export type Check<V, T> = V extends T ? true : false;
