codechain-keystore-cli [![Build Status](https://travis-ci.org/CodeChain-io/codechain-keystore-cli.svg?branch=master)](https://travis-ci.org/CodeChain-io/codechain-keystore-cli)
=========================

A command line CodeChain key management tool

```sh
  Usage: cckey [options] [action]

  Options:

    -V, --version                     output the version number
    -t --account-type <account-type>  'platform' or 'asset'. The type of the key
    -p --passphrase <passphrase>      passphrase
    --address <address>               address
    -h, --help                        output usage information

  Action:

    getKeys  : Get all saved addresses
    create   : Create new key with passphrase
    delete   : Delete the key of the given address

  Examples:

    cckey create -t platform --passphrase "my password"

    cckey getKeys -t asset

    cckey delete -t platform --address "tcc..."

```
