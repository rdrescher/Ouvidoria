import Operacao from "../../../utils/Operacao";

export enum DialogTypes {
    Open_Dialog = "@dialog/OpenDialog",
    Close_Dialog = "@dialog/CloseDialog",
}

export interface IDialogState {
    readonly dialogIsOpen: boolean;
    readonly operation: Operacao;
    readonly selectedObject: object;
}