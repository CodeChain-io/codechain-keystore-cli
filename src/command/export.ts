import { CCKey, SecretStorage } from "codechain-keystore";

import { AccountType } from "../types";
import { findMatchingKey } from "../util";

export async function exportKey(
    cckey: CCKey,
    accountType: AccountType,
    address: string,
    passphrase: string,
    networkId: string
): Promise<SecretStorage> {
    const keys = await cckey[accountType].getKeys();
    const key = findMatchingKey(accountType, keys, address, networkId);
    return cckey[accountType].exportKey({
        key,
        passphrase
    });
}
