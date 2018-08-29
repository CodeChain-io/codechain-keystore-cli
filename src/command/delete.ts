import { CCKey } from "codechain-keystore";

import { AccountType } from "../types";
import { CLIError, CLIErrorType } from "../error";
import { findPublicKey } from "../util";

export async function deleteKey(cckey: CCKey, accountType: AccountType, address: string): Promise<void> {
    const publicKeys = await cckey[accountType].getKeys();
    const publicKey = findPublicKey(
        accountType,
        publicKeys,
        address
    );
    const Enquirer = require("enquirer");
    const enquirer = new Enquirer();
    enquirer.register("confirm", require("prompt-confirm"));
    enquirer.question("delete", "Do you really want to delete the key?", { type: "confirm" });
    return enquirer.prompt(["delete"])
        .then((async (answers: { delete: boolean }) => {
            if (answers.delete) {
                const result = await cckey[accountType].deleteKey({
                    publicKey
                });
                if (!result) {
                    throw new CLIError(CLIErrorType.Unknown, {
                        message: "Delete failed"
                    });
                }
            }
        }));
}
