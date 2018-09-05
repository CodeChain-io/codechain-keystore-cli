import {
    AssetTransferAddress,
    PlatformAddress
} from "codechain-sdk/lib/key/classes";
import _ = require("lodash");

import { networkId } from "./const";
import { CLIError, CLIErrorType } from "./error";
import { AccountType } from "./types";

export function getAddressFromKey(
    accountType: AccountType,
    key: string
): string {
    if (accountType === "platform") {
        const accountId = key;
        const platformAddress = PlatformAddress.fromAccountId(accountId);
        return platformAddress.toString();
    } else if (accountType === "asset") {
        const hash = key;
        const assetAddress = AssetTransferAddress.fromTypeAndPayload(1, hash, {
            networkId
        });
        return assetAddress.toString();
    } else {
        throw new CLIError(CLIErrorType.InvalidAccountType);
    }
}

export function findKey(
    accountType: AccountType,
    keys: string[],
    address: string
): string {
    const addresses = _.map(keys, key => getAddressFromKey(accountType, key));
    const index = _.indexOf(addresses, address);
    if (index === -1) {
        throw new CLIError(CLIErrorType.NoSuchAddress, { address });
    }

    return keys[index];
}
