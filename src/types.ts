export type AccountType = "platform" | "asset";
export type Action = "list" | "create" | "delete";

export interface Option {
    "account-type"?: string;
    passphrase?: string;
    address?: string;
}
