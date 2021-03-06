import * as _ from "lodash";

import { Context } from "../types";
import { getAddressFromKey } from "../util";

export async function listKeys({
    cckey,
    accountType,
    networkId
}: Context): Promise<void> {
    let keys = await cckey[accountType].getKeys();
    keys = _.map(keys, key => getAddressFromKey(accountType, key, networkId));
    if (keys.length === 0) {
        console.log("");
    } else {
        console.log(_.join(keys, "\n"));
    }
}
