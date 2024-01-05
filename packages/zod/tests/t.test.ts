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

describe("Testing the `T.Is` class", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  it("should test that the class has the .is property", () => {
    expect(t).toHaveProperty("is");
  });
  it("should test that the class has the .to property", () => {
    expect(t).toHaveProperty("to");
  });
  it("should test that the class has the .string property", () => {
    expect(t).toHaveProperty("string");
  });
  it("should test that the class has the .array property", () => {
    expect(t).toHaveProperty("array");
  });
  it("should test that the class has the .number property", () => {
    expect(t).toHaveProperty("number");
  });
  // it("should test that the class has the .object property", () => {
  //   expect(t).toHaveProperty("object");
  // });
});
