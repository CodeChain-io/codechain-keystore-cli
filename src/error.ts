import { actions } from "./types";

export enum CLIErrorType {
    InvalidAccountType,
    InvalidAction,
    OptionRequired,
    CannotFindAddress,
    Unknown
}

export class CLIError extends Error {
    constructor(type: CLIErrorType, args?: any) {
        super(getErrorMessage(type, args));
    }
}

function getErrorMessage(type: CLIErrorType, args: any = {}) {
    switch (type) {
        case CLIErrorType.InvalidAccountType:
            return "Account-type should be 'platform' or 'asset'";
        case CLIErrorType.InvalidAction:
            return `Action should one of the ${JSON.stringify(
                actions
            )}`;
        case CLIErrorType.OptionRequired:
            return `Option --${args.optionName} is required`;
        case CLIErrorType.CannotFindAddress:
            return `Cannot find address ${args.address}`;
        case CLIErrorType.Unknown:
            return `Internal error ${args.message}`;
        default:
            return `Internal error ${type}`;
    }
}
