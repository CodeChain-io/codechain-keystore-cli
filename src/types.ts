export type AccountType = "platform" | "asset";
export type Action = "list" | "create" | "delete";

export interface ListOption {
    parent: {
        accountType: string;
    };
}

export interface CreateOption {
    parent: {
        accountType: string;
    };
    passphrase: string;
}

export interface DeleteOption {
    parent: {
        accountType: string;
    };
    address: string;
}

export interface ImportOption {
    parent: {
        accountType: string;
    };
    passphrase: string;
}

export interface ExportOption {
    parent: {
        accountType: string;
    };
    address: string;
    passphrase: string;
    pretty: boolean;
}
