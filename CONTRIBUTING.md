# Contributing

Repository URL: [https://github.com/m10rten/suite](https://github.com/m10rten/suite)

## Technologies

- [Node.js](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/#/)
- [Turbo](https://turbo.build/)
- [Zod](https://zod.dev/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [pnpm](https://pnpm.io/) (v8 or higher)

### Installation

```sh
pnpm install
```

### Running the tests

```sh
pnpm test
```

### Running the linter

```sh
pnpm lint
```

### Running the formatter

```sh
pnpm format
```

### Running the type checker

```sh
pnpm typecheck
```

### Running the build

```sh
pnpm build
```

### Running the Dev Server(s)

```sh
pnpm dev
```

### Running the Production Server(s)

```sh
pnpm start
```

### Creating a new package

```sh
pnpm packages:create <package-name> <internal: true|false: default=false>
```

### Cleaning your workspace

```sh
pnpm clean
```

### Remaking the workspace

```sh
pnpm remake
```

### Running reset

```sh
# this wil run `clean` and `remake`
pnpm reset
```

## Making Changes

1. Fork the repository on GitHub (see [Fork A Repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo))
2. Clone the forked repository to your local machine (see [Cloning A Repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo#cloning-a-repository))
3. Install the dependencies (see [Installation](#installation))
4. Make your changes and commit them (Wait for husky to run the formatter)
5. Push your changes to your forked repository on GitHub
6. Open a pull request on GitHub and describe your changes in detail (Wait for GitHub Actions to run the necessary checks)
7. Wait for the pull request to be reviewed and merged by a maintainer

## License

This project is licensed under the [MIT License](LICENSE).
