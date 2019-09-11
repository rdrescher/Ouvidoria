import { action } from "typesafe-actions";
import Operacao from "../../../application/types/Operacao";
import { DialogTypes } from "./DialogTypes";

export function openDialog(operation: Operacao, selectedObject: object = {}) {
  return action(DialogTypes.Open_Dialog, { operation, selectedObject });
}

export function closeDialog() {
  return action(DialogTypes.Close_Dialog);
}
