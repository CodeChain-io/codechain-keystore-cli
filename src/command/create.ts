import { CCKey } from "codechain-keystore";
import * as _ from "lodash";

import { AccountType } from "../types";
import { getAddressFromKey } from "../util";

export async function createKey(
    cckey: CCKey,
    accountType: AccountType,
    passphrase: string
): Promise<void> {
    const key = await cckey[accountType].createKey({
        passphrase
    });

    console.log(getAddressFromKey(accountType, key));
}
