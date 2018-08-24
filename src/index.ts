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
    .option("--address <address>", "address")
    .action(main);

commander.on("--help", () => {
    console.log(`  Action:

    getKeys     : Get all saved addresses
    create   : Create new key with passphrase
    delete   : Delete the key of the given address

    `);

    console.log(` Examples:

    cckey -t platform create --passphrase "my password"

    cckey -t asset getKeys

    cckey -t platform delete --address "tcc..."

`);
});

async function main(action: string, option: Option) {
    const cckey = await CCKey.create({});
    try {
        const accountType = getOpt(option, "account-type") as AccountType;
        if (!_.includes(["platform", "asset"], accountType)) {
            throw new CLIError(CLIErrorType.InvalidAccountType);
        }
        if (!_.includes(actions, action)) {
            throw new CLIError(CLIErrorType.InvalidAction);
        }

        switch (action) {
            case "getKeys":
                let keys = await cckey[accountType].getKeys();
                keys = _.map(keys, publicKey =>
                    getAddressFromPublic(accountType, publicKey)
                );
                if (keys.length === 0) {
                    console.log("There is no keys saved.");
                } else {
                    console.log(`Current saved keys are ${_.join(keys, ",")}`);
                }
                break;
            case "create":
                {
                    const passphrase = getOpt(option, "passphrase");
                    const publicKey = await cckey[accountType].createKey({
                        passphrase
                    });
                    console.log("Account created!");
                    console.log(
                        `Address is ${getAddressFromPublic(
                            accountType,
                            publicKey
                        )}`
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

                    if (result) {
                        console.log("Account removed");
                    } else {
                        console.log("Account not removed");
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
    }
}

commander.parse(process.argv);
