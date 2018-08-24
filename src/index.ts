#!/usr/bin/env node

import * as commander from "commander";
import * as process from "process";
import * as _ from "lodash";
import { CCKey } from "codechain-keystore";

import { CLIError, CLIErrorType } from "./error";
import { getAddressFromPublic, findPublicKey, getOpt } from "./util";
import { Option, AccountType, actions } from "./types";

commander
    .version("0.1.0-alpha.1")
    .arguments("[action]")
    // FIXME: get passphrase interactively
    .option("-t --account-type <account-type>", "'platform' or 'asset'. The type of the key")
    .option("-p --passphrase <passphrase>", "passphrase")
    .option("-a --address <address>", "address")
    .action(main);

commander.on("--help", () => {
    console.log(`  Action:

    getKeys  : Get all saved addresses
    create   : Create new key with passphrase
    delete   : Delete the key of the given address
    `);

    console.log(`  Examples:

    cckey create -t platform --passphrase "my password"

    cckey getKeys -t asset

    cckey delete -t platform --address "tcc..."
`);
});

async function main(action: string, option: Option) {
    if (!action) {
        commander.outputHelp();
        process.exit(1);
        return;
    }
    const cckey = await CCKey.create({});
    try {
        if (!_.includes(actions, action)) {
            throw new CLIError(CLIErrorType.InvalidAction);
        }
        const accountType = getOpt(option, "account-type") as AccountType;
        if (!_.includes(["platform", "asset"], accountType)) {
            throw new CLIError(CLIErrorType.InvalidAccountType);
        }

        switch (action) {
            case "getKeys":
                let keys = await cckey[accountType].getKeys();
                keys = _.map(keys, publicKey =>
                    getAddressFromPublic(accountType, publicKey)
                );
                if (keys.length === 0) {
                    console.log("");
                } else {
                    console.log(_.join(keys, "\n"));
                }
                break;
            case "create":
                {
                    const passphrase = getOpt(option, "passphrase");
                    const publicKey = await cckey[accountType].createKey({
                        passphrase
                    });
                    console.log(
                        getAddressFromPublic(
                            accountType,
                            publicKey
                        )
                    );
                }
                break;
            case "delete":
                {
                    const address = getOpt(option, "address");
                    const publicKeys = await cckey[accountType].getKeys();
                    const publicKey = findPublicKey(
                        accountType,
                        publicKeys,
                        address
                    );
                    const result = await cckey[accountType].deleteKey({
                        publicKey
                    });
                    if (!result) {
                        throw new CLIError(CLIErrorType.Unknown, {
                            message: "Delete failed"
                        });
                    }
                }
                break;
            default:
                throw new CLIError(CLIErrorType.Unknown, {
                    message: "invalid action"
                });
        }
    } catch (err) {
        console.log(err.toString());
        process.exit(1);
    }
}

commander.parse(process.argv);
