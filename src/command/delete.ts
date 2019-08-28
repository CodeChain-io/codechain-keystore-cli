import { prompt } from "enquirer";

import { CLIError, CLIErrorType } from "../error";
import { Context } from "../types";
import { findMatchingKey } from "../util";

export async function deleteKey(
    { cckey, accountType, networkId }: Context,
    address: string
): Promise<void> {
    const keys = await cckey[accountType].getKeys();
    const key = findMatchingKey(accountType, keys, address, networkId);

    const question = {
        type: "confirm",
        name: "delete",
        message: "Do you really want to delete the key?"
    };

    const answer: any = await prompt(question);
    if (answer.delete) {
        const result = await cckey[accountType].deleteKey({ key });
        if (!result) {
            throw new CLIError(CLIErrorType.Unknown, {
                message: "Delete failed"
            });
        }
    }
}
