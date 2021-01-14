# subscript/core

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

The core library to write substrate wasm smart contracts in AssemblyScript.

Collection of library used in developing smart contracts including:

- [`contract runtime api`](./assembly/seal0.ts) - Host functions of substrate contract runtime.
- [`env`](./assembly/env) - Contract envionment interface for interacting with contract executor.
- [`types`](./assembly/types.ts) - Basic types defined for contract primitive.
- [`context`](./assembly/context.ts) - The information of the contract context.
- [`crypto`](./assembly/crypto.ts) - Hash funtions utils.

## Setup

Install all dependencies

```
yarn
```

Compile the package to wasm

```
yarn build
```

## Testing

To run the unit test:

```
yarn test
```

## License

`subscript/core` is distributed under the terms of the Apache License (Version 2.0).

See [LICENSE-APACHE](LICENSE) for details.
