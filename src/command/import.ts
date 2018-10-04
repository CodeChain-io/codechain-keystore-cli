import { SecretStorage } from "codechain-keystore";

import { Context } from "../types";
import { getAddressFromKey } from "../util";

export async function importKey(
    { cckey, accountType, networkId }: Context,
    secret: SecretStorage,
    passphrase: string
): Promise<void> {
    const key = await cckey[accountType].importKey({
        secret,
        passphrase
    });

    console.log(getAddressFromKey(accountType, key, networkId));
}
