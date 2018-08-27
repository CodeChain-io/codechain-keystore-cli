codechain-keystore-cli [![Build Status](https://travis-ci.org/CodeChain-io/codechain-keystore-cli.svg?branch=master)](https://travis-ci.org/CodeChain-io/codechain-keystore-cli)
=========================

A command line CodeChain key management tool


How to install
----------------

### Binary install

You can download the latest binaries from [here](https://github.com/CodeChain-io/codechain-keystore-cli/releases/tag/0.1.1)

### Install using a package manager (npm)

```sh
npm install -g codechain-sdk-cli
```

### Install using a package manager (yarn)

```sh
yarn global add codechain-sdk-cli
```

How to use
------

```sh
  Usage: cckey [options] [action]

  Options:

    -V, --version                     output the version number
    -t --account-type <account-type>  'platform' or 'asset'. The type of the key
    -p --passphrase <passphrase>      passphrase
    -a --address <address>            address
    -h, --help                        output usage information

  Action:

    list     : List all the saved addresses
    create   : Create new key with passphrase
    delete   : Delete the key of the given address

  Examples:

    cckey create -t platform --passphrase "my password"

    cckey list -t asset

    cckey delete -t platform --address "tcc..."

```
