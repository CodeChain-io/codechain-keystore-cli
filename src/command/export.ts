import { CCKey, SecretStorage } from "codechain-keystore";

import { AccountType } from "../types";
import { findPublicKey } from "../util";

export async function exportKey(
    cckey: CCKey,
    accountType: AccountType,
    address: string,
    passphrase: string
): Promise<SecretStorage> {
    const publicKeys = await cckey[accountType].getKeys();
    const publicKey = findPublicKey(accountType, publicKeys, address);
    return cckey[accountType].exportKey({
        publicKey,
        passphrase
    });
}
