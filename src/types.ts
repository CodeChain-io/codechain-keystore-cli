export type AccountType = "platform" | "asset";
export type Action = "list" | "create" | "delete";

export interface ListOption {
    accountType: string;
}

export interface CreateOption {
    accountType: string;
    passphrase: string;
}

export interface DeleteOption {
    accountType: string;
    address: string;
}
