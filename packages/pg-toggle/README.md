# pg-toggle

`pg-toggle` is a lightweight, flexible package for managing feature toggles in a PostgreSQL database. It allows you to create, retrieve, and update feature toggles easily, providing robust logging and retry mechanisms to ensure smooth operation.

## Installation

```bash
npm install pg-toggle
```

## Usage

### Importing the Package

```typescript
import { Toggle } from "pg-toggle";
```

### Initializing the Toggle Manager

To initialize the `Toggle` manager, make sure your PostgreSQL database is running and properly configured. Use the `init` method to run the required migrations and obtain a `Toggle` instance.

```typescript
const t = await Toggle.init("postgres://postgres:postgres@localhost:5433/database");
```

### Creating Toggles

Use the `create` method to create a set of toggles. This method takes an object where keys are toggle names and values are booleans indicating whether the toggle is enabled.

```typescript
const toggles = await t.create({
  FEATURE_ONE: true,
  FEATURE_TWO: false,
});
console.log(toggles);
```

### Getting a Toggle

To retrieve the status of a specific toggle, use the `get` method. It returns a boolean indicating whether the toggle is enabled. If the toggle does not exist, it logs an error and returns `false`.

```typescript
const isEnabled = await t.get("FEATURE_ONE");
console.log(isEnabled);
```

### Setting a Toggle

Use the `set` method to update the status of a toggle. If the toggle does not exist, it creates a new one with the specified status.

```typescript
const updatedStatus = await t.set("FEATURE_ONE", false);
console.log(updatedStatus);
```

## API

### `Toggle`

#### `static init(options: string): Promise<Toggle>`

Initializes the `Toggle` manager, runs necessary migrations, and returns a `Toggle` instance.

- **options**: `IClientOptions` - The configuration options for the PostgreSQL client, uses basic string format for connection.

#### `create<T extends Record<string, boolean>>(toggles: T): Promise<T & Record<string, boolean>>`

Creates a set of toggles in the database.

- **toggles**: `T` - An object where keys are toggle names and values are booleans.

#### `get(name: string): Promise<boolean>`

Retrieves the status of a specific toggle.

- **name**: `string` - The name of the toggle.

#### `set(name: string, enabled: boolean): Promise<boolean>`

Sets the status of a specific toggle. If the toggle does not exist, it creates a new one.

- **name**: `string` - The name of the toggle.
- **enabled**: `boolean` - The status to set for the toggle.

## Example

Here's a complete example of how to use `pg-toggle`:

```typescript
import { Toggle } from "pg-toggle";

const main = async () => {
  const t = await Toggle.init("postgres://postgres:postgres@localhost:5433/database");

  const toggles = await t.create({
    TEST_TOGGLE: false,
  });
  console.log(toggles);

  const maybe = await t.get("NON_EXISTENT_TOGGLE");
  console.log(maybe);

  const newly = await t.set("NEW_TOGGLE", true);
  console.log(newly);
};

main();
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
