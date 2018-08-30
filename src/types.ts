export type AccountType = "platform" | "asset";
export type Action = "list" | "create" | "delete";

export interface Option {
    accountType?: string;
    passphrase?: string;
    address?: string;
}
