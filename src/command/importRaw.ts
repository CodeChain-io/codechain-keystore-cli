import { CCKey } from "codechain-keystore";

import * as _ from "lodash";

import { AccountType } from "../types";
import { getAddressFromKey } from "../util";

export async function importRawKey(
    cckey: CCKey,
    accountType: AccountType,
    privateKey: string,
    passphrase: string
): Promise<void> {
    const publicKey = await cckey[accountType].importRaw({
        privateKey,
        passphrase
    });

    console.log(getAddressFromKey(accountType, publicKey));
}
