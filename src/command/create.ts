import { Context } from "../types";
import { getAddressFromKey } from "../util";

export async function createKey(
    { cckey, accountType, networkId }: Context,
    passphrase: string
): Promise<void> {
    const key = await cckey[accountType].createKey({
        passphrase
    });

    console.log(getAddressFromKey(accountType, key, networkId));
}
