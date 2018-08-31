#!/usr/bin/env node

import { CCKey } from "codechain-keystore";
import * as program from "commander";
import * as _ from "lodash";
import * as process from "process";

import { createKey } from "./command/create";
import { deleteKey } from "./command/delete";
import { listKeys } from "./command/list";
import { CLIError, CLIErrorType } from "./error";
import { AccountType, CreateOption, DeleteOption, ListOption } from "./types";

program.version("0.1.1");

program
    .command("list")
    .description("list keys")
    .option(
        "-t, --account-type <accountType>",
        "'platform' or 'asset'. The type of the key"
    )
    .action(handleError(listCommand));

program
    .command("create")
    .description("create a new key")
    .option(
        "-t, --account-type <accountType>",
        "'platform' or 'asset'. The type of the key"
    )
    .option("-p, --passphrase <passphrase>", "passphrase")
    .action(handleError(createCommand));

program
    .command("delete")
    .description("delete the key")
    .option(
        "-t, --account-type <accountType>",
        "'platform' or 'asset'. The type of the key"
    )
    .option("-a, --address <address>", "address")
    .action(handleError(deleteCommand));

function handleError(
    f: (option: any) => Promise<void>
): (option: any) => Promise<void> {
    return async (option: any) => {
        try {
            await f(option);
        } catch (err) {
            console.error(err.toString());
            process.exit(1);
        }
    };
}

async function listCommand(option: ListOption) {
    const cckey = await CCKey.create();
    const accountType = parseAccountType(option.accountType);
    await listKeys(cckey, accountType);
}

async function createCommand(option: CreateOption) {
    const cckey = await CCKey.create();
    const accountType = parseAccountType(option.accountType);
    const passphrase = parsePassphrase(option.passphrase);
    await createKey(cckey, accountType, passphrase);
}

async function deleteCommand(option: DeleteOption) {
    const cckey = await CCKey.create();
    const accountType = parseAccountType(option.accountType);
    const address = parseAddress(option.address);
    await deleteKey(cckey, accountType, address);
}

program.on("--help", () => {
    console.log(`  Examples:

    cckey create -t platform --passphrase "my password"

    cckey list -t asset

    cckey delete -t platform --address "tcc..."
`);
});

program.parse(process.argv);
if (program.args.length === 0) {
    program.outputHelp();
    process.exit(1);
}

function parseAccountType(accountType: string): AccountType {
    if (_.isUndefined(accountType)) {
        throw new CLIError(CLIErrorType.OptionRequired, {
            optionName: "account-type"
        });
    }
    if (!_.includes(["platform", "asset"], accountType)) {
        throw new CLIError(CLIErrorType.InvalidAccountType);
    }
    return accountType as AccountType;
}

function parseAddress(address: string): string {
    if (_.isUndefined(address)) {
        throw new CLIError(CLIErrorType.OptionRequired, {
            optionName: "address"
        });
    }
    // FIXME: Validate the address.
    return address;
}

function parsePassphrase(passphrase: string): string {
    if (_.isUndefined(passphrase)) {
        throw new CLIError(CLIErrorType.OptionRequired, {
            optionName: "passphrase"
        });
    }
    return passphrase;
}
