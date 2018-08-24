codechain-keystore-cli
=========================

A command line CodeChain key management tool

```sh
  Usage: cckey [options] [accountType] [action]

  Options:

    -V, --version                     output the version number
    -t --account-type <account-type>  'platform' or 'asset'. The type of the key
    -p --passphrase <passphrase>      passphrase
    --address <address>               address
    -h, --help                        output usage information

  Action:

    getKeys     : Get all saved addresses
    create   : Create new key with passphrase
    delete   : Delete the key of the given address


 Examples:

    cckey -t platform create --passphrase "my password"

    cckey -t asset getKeys

    cckey -t platform delete --address "tcc..."

```
