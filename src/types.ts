export type AccountType = "platform" | "asset";
export type Action = "keys" | "create" | "delete";
export const actions: Action[] = ["keys", "create", "delete"];

export interface Option {
    "account-type"?: string;
    passphrase?: string;
    address?: string;
}
