import { SecretStorage } from "codechain-keystore";

import { Context } from "../types";
import { findMatchingKey } from "../util";

export async function exportKey(
    { cckey, accountType, networkId }: Context,
    address: string,
    passphrase: string
): Promise<SecretStorage> {
    const keys = await cckey[accountType].getKeys();
    const key = findMatchingKey(accountType, keys, address, networkId);
    return cckey[accountType].exportKey({
        key,
        passphrase
    });
}
