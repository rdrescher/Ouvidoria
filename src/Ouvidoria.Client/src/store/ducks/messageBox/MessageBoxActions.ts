import { action } from "typesafe-actions";
import { MessageBoxTypes } from "./MessageBoxTypes";

export function show(message: string) {
  return action(MessageBoxTypes.Show, { message });
}

export function hide() {
  return action(MessageBoxTypes.Hide);
}
