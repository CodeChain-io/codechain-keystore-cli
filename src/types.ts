export type AccountType = "platform" | "asset";
export type Action = "list" | "create" | "delete";

export interface CommonOption {
    accountType: string;
    keysPath: string;
    networkId: string;
}

export interface ListOption {
    parent: CommonOption;
}

export interface CreateOption {
    parent: CommonOption;
    passphrase: string;
}

export interface DeleteOption {
    parent: CommonOption;
    address: string;
}

export interface ImportOption {
    parent: CommonOption;
    passphrase: string;
}

export interface ExportOption {
    parent: CommonOption;
    address: string;
    passphrase: string;
    pretty: boolean;
}
