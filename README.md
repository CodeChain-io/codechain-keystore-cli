codechain-keystore-cli
=========================

A command line CodeChain key management tool

```sh
  Usage: cckey [options] [accountType] [action]

  Options:

    -V, --version                 output the version number
    -p --passphrase <passphrase>  passphrase
    --address <address>           address
    -h, --help                    output usage information

  Account Types:

    platform  : Manage CodeChain's platform account
    asset     : Manage CodeChain's asset acccount


  Action:

    getKeys     : Get all saved addresses
    create   : Create new key with passphrase
    delete   : Delete the key of the given address


 Examples:

    cckey platform create --passphrase "my password"

    cckey asset getKeys

    cckey platform delete --address "tcc..."

```
