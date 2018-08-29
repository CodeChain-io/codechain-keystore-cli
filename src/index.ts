#!/usr/bin/env node

import * as commander from "commander";
import * as process from "process";
import * as _ from "lodash";
import { CCKey } from "codechain-keystore";

import { CLIError, CLIErrorType } from "./error";
import { Option, AccountType } from "./types";
import { listKeys } from "./command/list";
import { createKey } from "./command/create";
import { deleteKey } from "./command/delete";

commander
    .version("0.1.1")
    .arguments("[action]")
    // FIXME: get passphrase interactively
    .option("-t --account-type <account-type>", "'platform' or 'asset'. The type of the key")
    .option("-p --passphrase <passphrase>", "passphrase")
    .option("-a --address <address>", "address")
    .action(main);

commander.on("--help", () => {
    console.log(`  Action:

    list     : List all the saved addresses
    create   : Create new key with passphrase
    delete   : Delete the key of the given address
    `);

    console.log(`  Examples:

    cckey create -t platform --passphrase "my password"

    cckey list -t asset

    cckey delete -t platform --address "tcc..."
`);
});

async function main(action: string, option: Option) {
    if (!action) {
        commander.outputHelp();
        process.exit(1);
        return;
    }
    const cckey = await CCKey.create();
    try {
        const accountType = getAccountType(option);

        switch (action) {
            case "list":
                await listKeys(cckey, accountType);
                break;
            case "create":
                const passphrase = getPassphrase(option);
                await createKey(cckey, accountType, passphrase);
                break;
            case "delete":
                const address = getAddress(option);
                await deleteKey(cckey, accountType, address);
                break;
            default:
                throw new CLIError(CLIErrorType.InvalidAction);
        }
    } catch (err) {
        console.log(err.toString());
        process.exit(1);
    }
}

commander.parse(process.argv);

function getAccountType(option: Option): AccountType {
    const accountType = option["accountType"];
    if (_.isUndefined(accountType)) {
        throw new CLIError(CLIErrorType.OptionRequired, { optionName: "account-type" });
    }
    if (!_.includes(["platform", "asset"], accountType)) {
        throw new CLIError(CLIErrorType.InvalidAccountType);
    }
    return accountType as AccountType;
}

function getAddress(option: Option): string {
    const address = option["address"];
    if (_.isUndefined(address)) {
        throw new CLIError(CLIErrorType.OptionRequired, { optionName: "address" });
    }
    // FIXME: Validate the address.
    return address;
}

function getPassphrase(option: Option): string {
    const passphrase = option["passphrase"];
    if (_.isUndefined(passphrase)) {
        throw new CLIError(CLIErrorType.OptionRequired, { optionName: "passphrase" });
    }
    return passphrase;
}
