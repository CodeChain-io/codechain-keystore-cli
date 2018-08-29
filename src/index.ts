#!/usr/bin/env node

import * as commander from "commander";
import * as process from "process";
import * as _ from "lodash";
import { CCKey } from "codechain-keystore";

import { CLIError, CLIErrorType } from "./error";
import { getAddressFromPublic, findPublicKey } from "./util";
import { Option, AccountType, actions } from "./types";
import { getAccountIdFromPublic, blake256 } from "codechain-sdk/lib/utils";
import { H256 } from "codechain-sdk/lib/core/classes";

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
    const cckey = await CCKey.create({});
    try {
        if (!_.includes(actions, action)) {
            throw new CLIError(CLIErrorType.InvalidAction);
        }
        const accountType = getAccountType(option);

        switch (action) {
            case "list":
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
                    const passphrase = getPassphrase(option);
                    const publicKey = await cckey[accountType].createKey({
                        passphrase
                    });
                    if (accountType === "platform") {
                        const accountId = getAccountIdFromPublic(publicKey);
                        cckey.mapping.add({ key: accountId, value: publicKey });
                    } if (accountType === "asset") {
                        const hash = H256.ensure(blake256(publicKey)).value;
                        cckey.mapping.add({ key: hash, value: publicKey });
                    }

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
                    const address = getAddress(option);
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
