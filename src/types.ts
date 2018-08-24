export type AccountType = "platform" | "asset";
export type Action = "getKeys" | "create" | "delete";
export const actions: Action[] = ["getKeys", "create", "delete"];

export interface Option {
    "account-type"?: string;
    passphrase?: string;
    address?: string;
}
