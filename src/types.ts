export type AccountType = "platform" | "asset";
export type Action = "getKeys" | "create" | "delete";
export const actions: Action[] = ["getKeys", "create", "delete"];

export interface Option {
    passphrase?: string;
    address?: string;
}
