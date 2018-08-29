import * as _ from "lodash";
import { CCKey } from "codechain-keystore";

import { AccountType } from "../types";
import { getAddressFromPublic } from "../util";

export async function listKeys(cckey: CCKey, accountType: AccountType): Promise<void> {
    let keys = await cckey[accountType].getKeys();
    keys = _.map(keys, publicKey =>
        getAddressFromPublic(accountType, publicKey)
    );
    if (keys.length === 0) {
        console.log("");
    } else {
        console.log(_.join(keys, "\n"));
    }
}
