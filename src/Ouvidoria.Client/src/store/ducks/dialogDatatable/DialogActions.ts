import { action } from "typesafe-actions";
import { DialogTypes } from "./DialogTypes";
import Operacao from "../../../types/Operacao";

export function openDialog(operation: Operacao, selectedObject: object = {}) {
    return action(DialogTypes.Open_Dialog, { operation, selectedObject });
}

export function closeDialog() {
    return action(DialogTypes.Close_Dialog);
}