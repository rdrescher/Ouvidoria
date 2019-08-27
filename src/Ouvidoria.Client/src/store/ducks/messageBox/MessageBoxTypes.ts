export enum MessageBoxTypes {
    Show = "@messageBox/Show",
    Hide = "@messageBox/Hide",
}

export interface IMessageBoxState {
    readonly open: boolean;
    readonly message: string;
}