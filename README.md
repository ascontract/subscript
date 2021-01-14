# subscript lang to write substrate based smart contract

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

SubScript is a smart contract language written in AssemblyScript for substrate based chain. We will provide essential substrate api and builtin tools to support contract development.

Similar to parity ink, SubScript is built on top of  AssemblyScript and follow all AssemblyScript syntax. SubScript is more like a development kit with some builtin module and tools. As assemblyscript is easy to interact with TypeScript and JavaScript, SubScript is much more friendly for dapp developers.

## How subscript Works

* Substrate's [Framework for Runtime Aggregation of Modularised Entities (FRAME)](https://substrate.dev/docs/en/next/conceptual/runtime/frame) contains the `contracts` pallet,
which implements an API for typical functions smart contracts need (storage, querying information about account, …).
* The `contracts` pallet requires smart contracts to be uploaded to the blockchain as a Wasm blob.
* subscript is a smart contract language which targets the API exposed by `contracts`. subscript smart contracts are compiled to Wasm.

## Collection of library of the subscript library

[subscript/core](./core/README.md) includes contract library with essential core compoments implemented.
Developers can use the `subscript/core` to interact with the host environment. It privide basic basic types,
storage acceess and contract interface. for more detail, see the [core documents](./core/README.md).

the [example](./examples) directory provide some examples to demonstrate how to use the subscript library.
The [Flipper contract](./examples/flipper) imports low-level api to interact with the contract node and
The [ERC20 contract](./examples/erc20) demonstrate more complex feature.

## Get started with subscript

This repository requires yarn and yarn workspaces.

The following command show how to setup the dev environment.

1. Install all dependencies

```
yarn
```

2. To compile contract examples to wasm, change to example dir and run:

```
yarn build
```

3. To run tests in the subscript/core:

```
cd ./core
yarn test
```
## sponsors!

The project is funded by

<p>
<img align="left" width="200" src="./img/w3f_grants_badge_black.svg">
</p>