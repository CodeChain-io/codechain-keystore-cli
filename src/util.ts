import { getAccountIdFromPublic, blake256 } from "codechain-sdk/lib/utils";
import {
    PlatformAddress,
    AssetTransferAddress
} from "codechain-sdk/lib/key/classes";
import { H256 } from "codechain-sdk/lib/core/classes";
import _ = require("lodash");

import { CLIError, CLIErrorType } from "./error";
import { AccountType, Option } from "./types";
import { networkId } from "./const";

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
        throw new CLIError(CLIErrorType.Unknown, {
            message: "invalid account type"
        });
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
        throw new CLIError(CLIErrorType.CannotFindAddress, { address });
    }

    return publicKeys[index];
}

export function getOpt(option: Option, key: keyof Option): string {
    if (!option[key]) {
        throw new CLIError(CLIErrorType.OptionRequired, { optionName: key });
    }
    return option[key] as string;
}
