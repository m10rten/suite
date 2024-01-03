/* eslint-disable no-console */
import { z } from "zod";

import { t } from "@/t";

// /**
//  * Testing the `T.Is` class
//  * @ignore
//  */
// /**
//  * Is string
//  */
// const random_value: unknown = "NaN";
// const isAstring = t.is.string(random_value);
// if (isAstring) {
//   console.log(random_value);
// }

// /**
//  * Is number
//  */
// const random_number: unknown = 2;
// const isAnumber = t.is.number(random_number);
// if (isAnumber) {
//   console.log(random_number);
// }

// /**
//  * is Class
//  */
// class MyClass {
//   public constructor(public readonly name: string) {}
// }
// const myClass: unknown = new MyClass("MyInstance of myClass");
// const isMyClass = t.is.of(MyClass, myClass);
// console.log(isMyClass, "from is.of");

// /**
//  * is Array
//  */
// const myArray: unknown = ["1", "2", "3"];
// const isMyArray = t.is.array(myArray);
// console.log(isMyArray, "from is.array");

// /**
//  * is Function
//  */
// const myFunction: unknown = (arg: string = "hello world") => {
//   console.log(arg, "from myFunction");
// };
// const isMyFunction = t.is.function(myFunction);
// if (isMyFunction) {
//   myFunction();
// }

// /**
//  * is Promise
//  */
// const myPromise: unknown = new Promise((resolve) => {
//   resolve("hello world from myPromise");
// });
// const isMyPromise = t.is.promise(myPromise);
// if (isMyPromise) {
//   myPromise.then((value) => console.log(value));
// }

// /**
//  * is Date
//  */
// const myDate: unknown = new Date();
// const isMyDate = t.is.date(myDate);
// console.log(isMyDate, "from is.date");

// /**
//  * is Error
//  */
// const myError: unknown = new Error("hello world from myError");
// const isMyError = t.is.error(myError);
// console.log(isMyError, "from is.error");

// /**
//  * is Any
//  */
// const myAny: unknown = "hello world from myAny";
// const isMyAny = t.is.any(myAny);
// console.log(isMyAny, "from is.any");

// /**
//  * is Null
//  */
// const myNull: unknown = null;
// const isMyNull = t.is.null(myNull);
// console.log(isMyNull, "from is.null");

// /**
//  * is Undefined
//  */
// const myUndefined: unknown = undefined;
// const isMyUndefined = t.is.undefined(myUndefined);
// console.log(isMyUndefined, "from is.undefined");

// /**
//  * is Boolean
//  */
// const myBoolean: unknown = true;
// const isMyBoolean = t.is.boolean(myBoolean);
// console.log(isMyBoolean, "from is.boolean");

// /**
//  * is BigInt
//  */
// const myBigInt: unknown = BigInt(2);
// const isMyBigInt = t.is.bigint(myBigInt);
// console.log(isMyBigInt, "from is.bigint");

// /**
//  * is Symbol
//  */
// const mySymbol: unknown = Symbol("hello world");
// const isMySymbol = t.is.symbol(mySymbol);
// console.log(isMySymbol, "from is.symbol");

// /**
//  * is Object
//  */
// const myObject: unknown = { hello: "world" };
// const isMyObject = t.is.object(myObject);
// console.log(isMyObject, "from is.object");

// /**
//  * is Falsy
//  */
// const myFalsy: unknown = false;
// const isMyFalsy = t.is.falsy(myFalsy);
// console.log(isMyFalsy, "from is.falsy");

// /**
//  * Testing the `T.To` class
//  * @ignore
//  */

// /**
//  * To string
//  */
// const number: unknown = 2;
// const string = t.to.string(number);
// console.log(string, "from to.string");

// /**
//  * To number
//  */
// const string2: unknown = "2";
// const number2 = t.to.number(string2);
// console.log(number2, "from to.number");

// /**
//  * To boolean
//  */
// const string3: unknown = "hello";
// const boolean = t.to.boolean(string3);
// console.log(boolean, "from to.boolean");

// /**
//  * To bigint
//  */
// const number3: unknown = 2;
// const bigint = t.to.bigint(number3);
// console.log(bigint, "from to.bigint");

// /**
//  * To array
//  */
// const string4: unknown = "hello";
// const array = t.to.array(string4);
// console.log(array, "from to.array");

// /**
//  * To date
//  */
// const string5: unknown = "02-01-2024";
// const date = t.to.date(string5);
// console.log(date, "from to.date");

// /**
//  * To error
//  */
// const string6: unknown = "hello";
// const error = t.to.error(string6);
// console.log(
//   "error instanceof Error:",
//   error instanceof Error,
//   "from to.error, but not thrown",
// );

// /**
//  * To promise
//  */
// const string7: unknown = "hello";
// const promise = t.to.promise(string7);
// promise.then((value) => console.log(value, "from to.promise"));

// /**
//  * To any
//  */
// const string8: unknown = "hello";
// const any = t.to.any(string8);
// console.log(any, "from to.any");

// /**
//  * To parse
//  */
// const string9: unknown = "parsed";
// const parser = t.to.parse(z.string());
// const parse = parser(string9);
// console.log(parse, "from to.parse");

describe("Zod.T", () => {
  const test: unknown = "test";
  const int: unknown = 1;
  const bool: unknown = true;
  beforeEach(() => {
    jest.resetModules();
  });
  it("Should test if t.is.string() works", () => {
    const isString = t.is.string(test);
    expect(isString).toBe(true);
    if (isString) {
      expect(typeof test).toBe("string");
    }
  });
  it("Should test if t.is.number() works", () => {
    const isNumber = t.is.number(test);
    expect(isNumber).toBe(false);
    if (isNumber) {
      expect(typeof test).toBe("number");
    }
  });
  it("Should test if t.is.boolean() works", () => {
    const isBoolean = t.is.boolean(test);
    expect(isBoolean).toBe(false);
    if (isBoolean) {
      expect(typeof test).toBe("boolean");
    }
  });
  it("Should test if t.is.bigint() works", () => {
    const isBigInt = t.is.bigint(test);
    expect(isBigInt).toBe(false);
    if (isBigInt) {
      expect(typeof test).toBe("bigint");
    }
  });
  it("Should test if t.is.symbol() works", () => {
    const isSymbol = t.is.symbol(test);
    expect(isSymbol).toBe(false);
    if (isSymbol) {
      expect(typeof test).toBe("symbol");
    }
  });
  it("Should test if t.is.object() works", () => {
    const isObject = t.is.object(test);
    expect(isObject).toBe(false);
    if (isObject) {
      expect(typeof test).toBe("object");
    }
  });
  it("Should test if t.is.falsy() works", () => {
    const isFalsy = t.is.falsy(test);
    expect(isFalsy).toBe(false);
    if (isFalsy) {
      expect(test).toBeFalsy();
    }
  });
  it("Should test if int t.to.string() works", () => {
    const string = t.to.string(int);
    expect(string).toBe(`${int}`);
    expect(typeof string).toBe("string");
  });
  it("Should test if bool t.to.string() works", () => {
    const string = t.to.string(bool);
    expect(string).toBe(`${bool}`);
    expect(typeof string).toBe("string");
  });
  it("Should test if t.to.number() works", () => {
    const number = t.to.number(`${int}`);
    expect(number).toBe(int);
    expect(typeof number).toBe("number");
  });
  it("Should test if string t.to.number() works", () => {
    const number = t.to.number(`${test}`);
    expect(number).toBeNaN();
    expect(typeof number).toBe("number");
  });
  it("Should test if t.to.boolean() works", () => {
    const boolean = t.to.boolean(test);
    expect(boolean).toBe(true);
    expect(typeof boolean).toBe("boolean");
  });
  it("Should test if int t.to.bigint() works", () => {
    const bigint = t.to.bigint(int);
    expect(bigint).toBe(BigInt(1));
    expect(typeof bigint).toBe("bigint");
  });
  it("Should test if bool t.to.bigint() works", () => {
    const bigint = t.to.bigint(bool);
    expect(bigint).toBe(BigInt(1));
    expect(typeof bigint).toBe("bigint");
  });
  it("Should test if t.to.parse() works", () => {
    const parser = t.to.parse(z.object({ test: z.string() }));
    const obj = { test: test };
    const parse = parser(obj);
    expect(parse).toStrictEqual(obj);
    expect(typeof parse).toBe("object");
  });
  it("Should test if t.is.array() works", () => {
    const isArray = t.is.array([test]);
    expect(isArray).toBe(true);
    if (isArray) {
      expect(Array.isArray([test])).toBe(true);
    }
  });
  it("Should test if t.is.function() works", () => {
    const isFunction = t.is.function(() => test);
    expect(isFunction).toBe(true);
    if (isFunction) {
      expect(typeof (() => test)).toBe("function");
    }
  });
  it("Should test if t.to.array() works", () => {
    const array = t.to.array(test);
    expect(array).toStrictEqual([test]);
    expect(Array.isArray(array)).toBe(true);
  });
  it("Should test if t.is.date() works", () => {
    const isDate = t.is.date(new Date());
    expect(isDate).toBe(true);
    if (isDate) {
      expect(new Date()).toBeInstanceOf(Date);
    }
  });
  it("Should test if t.to.date() works", () => {
    const str = "02-01-2024";
    const date = t.to.date(str);
    expect(date).toStrictEqual(new Date(str));
    expect(new Date(str)).toBeInstanceOf(Date);
  });
});
