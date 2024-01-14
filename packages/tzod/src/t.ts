/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-namespace */

import { IArray, TArray } from "./array";
import { IIs, Is } from "./is";
import { INumber, TNumber } from "./number";
import { IObject, TObject } from "./object";
import { IString, TString } from "./string";
import { ITo, To } from "./to";

export * from "./g";

/**
 * Interface for the `T` class
 */
export interface IT {
  /**
   * `is` property for type checking
   */
  is: IIs;
  /**
   * `to` property for type casting
   */
  to: ITo;
  /**
   * `string` property for string related methods
   */
  string: IString;
  /**
   * `array` property for array related methods
   */
  array: IArray;
  /**
   * `number` property for number related methods
   */
  number: INumber;
  /**
   * `object` property for object related methods
   */
  object: IObject;
}

/**
 * T.ts
 * Zod extended with a `T` property that can do magico.
 * @packageDocumentation
 * @module tzod
 */
export class T implements IT {
  public is = new Is();
  public to = new To();
  public string = new TString();
  public array = new TArray();
  public number = new TNumber();
  public object = new TObject();
}

/**
 * `t` usable instance of `T`
 */
export const t = new T();
/**
 * Exported properties of `t`
 */
export const { is, to, string, array, number, object } = t;

export default t;
