import { CCKey, SecretStorage } from "codechain-keystore";

import * as _ from "lodash";

import { AccountType } from "../types";
import { getAddressFromKey } from "../util";

export async function importKey(
    cckey: CCKey,
    accountType: AccountType,
    secret: SecretStorage,
    passphrase: string
): Promise<void> {
    const key = await cckey[accountType].importKey({
        secret,
        passphrase
    });

    console.log(getAddressFromKey(accountType, key));
}
