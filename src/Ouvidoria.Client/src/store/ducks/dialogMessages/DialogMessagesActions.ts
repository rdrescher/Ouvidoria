import { action } from "typesafe-actions";
import { DialogMessagesTypes } from "./DialogMessagesTypes";

export function open(title: string, messages: string[]) {
  return action(DialogMessagesTypes.Open, { title, messages });
}

export function close() {
  return action(DialogMessagesTypes.Close);
}
