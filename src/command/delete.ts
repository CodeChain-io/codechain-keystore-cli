import { CCKey } from "codechain-keystore";
import * as _ from "lodash";

import { CLIError, CLIErrorType } from "../error";
import { AccountType } from "../types";
import { findMatchingKey } from "../util";

export async function deleteKey(
    cckey: CCKey,
    accountType: AccountType,
    address: string,
    networkId: string
): Promise<void> {
    const keys = await cckey[accountType].getKeys();
    const key = findMatchingKey(accountType, keys, address, networkId);
    const Enquirer = require("enquirer");
    const enquirer = new Enquirer();
    enquirer.register("confirm", require("prompt-confirm"));
    enquirer.question("delete", "Do you really want to delete the key?", {
        type: "confirm",
        default: false
    });
    return enquirer
        .prompt(["delete"])
        .then(async (answers: { delete: boolean }) => {
            if (answers.delete) {
                const result = await cckey[accountType].deleteKey({ key });
                if (!result) {
                    throw new CLIError(CLIErrorType.Unknown, {
                        message: "Delete failed"
                    });
                }
            }
        });
}
