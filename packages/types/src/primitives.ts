/**
 * @file Type Primitives - Type aliases for primitive types
 * @module types/primitives
 */

/**
 * @type {Possitive} - Type alias for non-null and non-undefined types
 */
export type Possitive<T> = T extends null | undefined ? never : T;

/**
 * @type {Nullable} - Type alias for nullable types
 */
export type Nullable<T> = T | null;

/**
 * @type {Undefinable} - Type alias for undefined types
 */
export type Undefinable<T> = T | undefined;

/**
 * @type {Maybe} - Type alias for nullable and undefined types
 */
export type Maybe<T> = T | null | undefined;

/**
 * @type {NonMaybe} - Type alias for non-nullable and non-undefined types
 */
export type NonMaybe<T> = T extends null | undefined ? never : T;

/**
 * @type {Primitive} - Type alias for primitive types in JavaScript
 */
export type Primitive = string | number | boolean | bigint | symbol | undefined | null;

/**
 * @type {Falsy} - Type alias for falsy values in JavaScript
 */
export type Falsy = false | 0 | "" | null | undefined;

/**
 * @type {Truthy} - Type alias for truthy values in JavaScript
 */
export type Truthy<T> = T extends Falsy ? never : T;

/**
 * @type {Tuple} - Type alias for tuple types
 */
export type Tuple<T = unknown> = readonly T[];

/**
 * @type {Nullish} - Type alias for null and undefined types
 */
export type Nullish = null | undefined;
