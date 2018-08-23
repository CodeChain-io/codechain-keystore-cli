export type AccountType = "platform" | "asset";
export type Action = "getKeys" | "createKey" | "deleteKey";
export const actions: Action[] = ["getKeys", "createKey", "deleteKey"];

export interface Option {
    passphrase?: string;
    address?: string;
}
