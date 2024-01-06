# tzod - TypeScript Utility Library

## Overview

The `tzod` library is a TypeScript utility library that extends the capabilities of the [Zod](https://github.com/colinhacks/zod) validation library. It provides a set of utility functions for common tasks related to strings, numbers, arrays, objects, and more. Below is an overview of the key files and functionalities within the library.

## Files

### `t.ts`

The `T` class serves as the central point of access to the utility functions provided by the library. It includes properties for string operations (`string`), type checking (`is`), type coercion (`to`), array manipulation (`array`), number operations (`number`), and object operations (`object`).

```typescript
const { t } = require("tzod");

console.log(t.is.string("Hello")); // true
console.log(t.to.string(42)); // "42"
console.log(t.string.lower("HELLO")); // "hello"
console.log(t.number.is.even(6)); // true
console.log(t.object.merge({ a: 1 }, { b: 2 })); // { a: 1, b: 2 }
console.log(t.array.shuffle([1, 2, 3])); // [2, 1, 3]
```

### `to.ts`

This file defines the `ITo` interface and its implementation class `To`. It contains functions for coercing values to various types, such as string, number, boolean, etc. The `To` class utilizes Zod for type coercion.

```typescript
const { to } = require("tzod");

console.log(to.string(42)); // "42"
console.log(to.number("42")); // 42
console.log(to.array(123)); // [123]
```

### `string.ts`

The `TString` class and `IString` interface define functions for string manipulations, such as converting to uppercase or lowercase, reversing, checking for emptiness, and more.

```typescript
const { string } = require("tzod");

// fully typesafe
console.log(string.upper("hello")); // "HELLO"
console.log(string.lower("HELLO")); // "hello"
console.log(string.reverse("world")); // "dlrow"
// use t.is.string and t.is.falsy to check for emptiness and type safety as this will not satisfy the compiler
console.log(string.empty("")); // true
```

### `object.ts`

The `TObject` class and `IObject` interface offer functions for working with objects, including merging, extracting keys, freezing, unfreezing, filtering based on a predicate, selecting specific keys, and excluding specific keys.

```typescript
const { object } = require("tzod");

console.log(object.merge({ a: 1, b: 1 }, { b: 2 })); // { a: 1, b: 2 }
console.log(object.keys({ x: 1, y: 2 })); // ["x", "y"]
console.log(object.freeze({ a: 1 })); // { a: 1 }
console.log(object.unfreeze({ a: 1 })); // { a: 1 }
// filter on values
console.log(object.filter({ a: 1, b: 2 }, (key, value) => value === 1)); // { a: 1 }
// fully typesafe
console.log(object.select({ a: 1, b: 2 }, ["a"])); // { a: 1 }
console.log(object.exclude({ a: 1, b: 2 }, ["a"])); // { b: 2 }
```

### `number.ts`

The `TNumber` class and `INumber` interface provide number-related functionalities, such as parsing numbers from strings, constraining values within a range, checking for odd/even, and calculating percentages.

```typescript
const { number } = require("tzod");

// number.is for value checking
console.log(number.is.even(6)); // true
console.log(number.is.between(5, 1, 10)); // true
// utility functions
console.log(number.constrain(5, 1, 10)); // 5
console.log(number.parse("42")); // 42
console.log(number.percent(25, 50)); // 50, add the % sign if needed
```

### `is.ts`

The `Is` class and `IIs` interface define type checking functions for various data types, including strings, numbers, null, undefined, boolean, bigint, symbol, object, array, date, error, promise, and more.

```typescript
const { is } = require("tzod");

console.log(is.string("Hello")); // true
console.log(is.number(42)); // true
console.log(is.object({})); // true
```

### `array.ts`

The `TArray` class and `IArray` interface contain an array utility function to shuffle elements randomly.

```typescript
const { array } = require("tzod");
// based on Math.random()
console.log(array.shuffle([1, 2, 3])); // [2, 1, 3]
```

## Usage

To use the `tzod` library, import the `t` object from the `t.ts` file. For example:

```typescript
import t from "tzod";

const result = t.is.string("Hello"); // true
```

Explore the various utility functions provided by each class for your specific needs. Refer to the inline comments and JSDoc for detailed information on each function.

## Note

Please note that the library makes use of [Zod](https://github.com/colinhacks/zod) for type validation and coercion. Ensure that you have the Zod library installed in your project for the `tzod` library to function correctly.

Feel free to extend or modify the library to suit your requirements. Contributions and improvements are welcome!
Read the [Contributing Guidelines](https://github.com/m10rten/suite/blob/main/CONTRIBUTING.md) for more information.
