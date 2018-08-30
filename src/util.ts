import { H256 } from "codechain-sdk/lib/core/classes";
import {
    AssetTransferAddress,
    PlatformAddress
} from "codechain-sdk/lib/key/classes";
import { blake256, getAccountIdFromPublic } from "codechain-sdk/lib/utils";
import _ = require("lodash");

import { networkId } from "./const";
import { CLIError, CLIErrorType } from "./error";
import { AccountType } from "./types";

export function getAddressFromPublic(
    accountType: AccountType,
    publicKey: string
): string {
    if (accountType === "platform") {
        const accountId = getAccountIdFromPublic(publicKey);
        const platformAddress = PlatformAddress.fromAccountId(accountId);
        return platformAddress.toString();
    } else if (accountType === "asset") {
        const hash = H256.ensure(blake256(publicKey));
        const assetAddress = AssetTransferAddress.fromTypeAndPayload(1, hash, {
            networkId
        });
        return assetAddress.toString();
    } else {
        throw new CLIError(CLIErrorType.InvalidAccountType);
    }
}

export function findPublicKey(
    accountType: AccountType,
    publicKeys: string[],
    address: string
): string {
    const addresses = _.map(publicKeys, key =>
        getAddressFromPublic(accountType, key)
    );
    const index = _.indexOf(addresses, address);
    if (index === -1) {
        throw new CLIError(CLIErrorType.NoSuchAddress, { address });
    }

    return publicKeys[index];
}
