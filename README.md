# codechain-keystore-cli [![Build Status](https://travis-ci.org/CodeChain-io/codechain-keystore-cli.svg?branch=master)](https://travis-ci.org/CodeChain-io/codechain-keystore-cli)

A command line for CodeChain's key management tool

## How to install

### Binary install

You can download the latest binaries from [here](https://github.com/CodeChain-io/codechain-keystore-cli/releases/tag/0.1.1)

### Install using the npm package manager

```sh
npm install -g codechain-keystore-cli
```

### Install using the yarn package manager

```sh
yarn global add codechain-keystore-cli
```

## How to use

```sh
  Usage: cckey [options] [command]

  Options:

    -V, --version                      output the version number
    -t, --account-type <accountType>   'platform' or 'asset'. The type of the key (default: platform)
    --keys-path <keysPath>             the path to store the keys (default: keystore.db)
    --network-id <networkId>           the id of the network (use 'cc' for mainnet, use 'wc' for corgi) (default: cc)
    -h, --help                         output usage information

  Commands:

    list                               list keys
    create [options]                   create a new key
    delete [options]                   delete a key
    import [options] <path>            import a key
    import-raw [options] <privateKey>  import a raw private key (32 byte hexadecimal string)
    export [options]                   export the key

  Examples:

    cckey create -t platform --passphrase "my password"

    cckey list -t asset

    cckey delete -t platform --address "ccc..."

    cckey import UTC--2018-08-14T06-30-23Z--bbb6685e-7165-819d-0988-fc1a7d2d0523 -t platform --passphrase "satoshi"

    cckey export -t platform --address cccq8ah0efv5ckpx6wy5mwva2aklzwsdw027sqfksrr --passphrase "satoshi"

    cckey import-raw -t platform a05f81608217738d99da8fd227897b87e8890d3c9159b559c7c8bbd408e5fb6e --passphrase "satoshi"
```
