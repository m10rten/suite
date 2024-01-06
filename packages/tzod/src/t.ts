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
  is: IIs;
  to: ITo;
  string: IString;
  array: IArray;
  number: INumber;
  object: IObject;
}

/**
 * T.ts
 * Zod extended with a `T` property that can do magico.
 * @packageDocumentation
 * @module tzod
 */
export class T implements IT {
  /**
   * `is` property for type checking
   */
  public is = new Is();
  /**
   * `to` property for type casting
   */
  public to = new To();
  /**
   * `string` property for string related methods
   */
  public string = new TString();
  /**
   * `array` property for array related methods
   */
  public array = new TArray();
  /**
   * `number` property for number related methods
   */
  public number = new TNumber();
  /**
   * `object` property for object related methods
   */
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
