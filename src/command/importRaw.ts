import { PrivateKey } from "codechain-keystore/lib/types";
import * as _ from "lodash";

import { Context } from "../types";
import { getAddressFromKey } from "../util";

export async function importRawKey(
    { cckey, accountType, networkId }: Context,
    privateKey: PrivateKey,
    passphrase: string
): Promise<void> {
    const key = await cckey[accountType].importRaw({
        privateKey,
        passphrase
    });

    console.log(getAddressFromKey(accountType, key, networkId));
}
