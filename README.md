# code suite

Personal Suite of Code for self-made packages and apps, written in TypeScript, build by [`m10rten`](https://github.com/m10rten/)

## Contents

- Packages - Containing `Node` packages
- Apps - Containing frontend applications
- `pkg` - Folder containing the packages for `Go`

### `Packages`

- `@mvdlei/zap` - A utility class for `fetch` with `zod`. Includes `Strike` and `Zap`.
- `@mvdlei/hooks` - A collection of React hooks for various functionalities.
- `@mvdlei/key` - A utility class for encryption and decryption. Includes `Enigma`.
- `@mvdlei/tzod` - A utility class for `zod`. Includes `T` class.
- `@mvdlei/env` - A utility for environment variables.
- `@mvdlei/log` - A logger for Node.
- `@mvdlei/types` - A collection of types used in the packages in this repository.
- `@mvdlei/retry` - A utility for retrying operations.
- `@mvdlei/pg-toggle` - A utility for feature toggles with PostgreSQL, made with `drizzle-orm`.
- `@mvdlei/iglo` - A simple yet very powerful error handler and secure program runner for any environment.

### `Apps`

- `showcase` - A showcase of the packages in this repository.
- `api` - An API folder where the API's can be stored.

### `Examples`

A folder containing examples for random code snippets.

- `next-cache` - An example of how to cache data in a Next.js application.
- `drizzle-pull` - An example of how to pull data from a PostgreSQL database with `drizzle-orm`.
- `prisma-pull` - An example of how to pull data from a PostgreSQL database with `prisma`.

### `pkg`

- `util` - A utility module for `Go`.
  - Includes a very basic Zod-like Z instance with `.Object` and `.String`/`.Number`.

## Installation

### Requirements

To develop this `suite` you must have `node`, `npm` | `pnpm` installed on your local system.

To run the `Go` packages you must have `Go` installed on your local system.

To run docker containers you must have `docker` installed on your local system.

### Dependencies

Install the dependencies with the following command:

```bash
pnpm install
```

### Running scripts

To run the scripts in this repository, use the following command:

```bash
pnpm run <script>
```

Where `<script>` is the name of the script you want to run. Check `pnpm run` for a list of available scripts.

## Namespace

The packages that are in this repository are within the `@mvdlei/` namespace on `npm`. Or are standalone packages.

There are no packages starting with `mvdlei-` in this repository.

## Ownership

The code written in this repository belongs to [`@m10rten`](https://github.com/m10rten) and is #opensource. public `npm` packages are free to use with the [`LICENSE`](LICENSE) included in the sourcecode.

## Security

Dependabot is enabled to ensure the latest bugs and issues are solved.

Feel free to open an issue regarding security aspects of any package or code in this repository.
