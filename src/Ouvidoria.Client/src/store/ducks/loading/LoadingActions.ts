import { action } from "typesafe-actions";
import { LoadingTypes } from "./LoadingTypes";

export function setLoading() {
  return action(LoadingTypes.SetLoading);
}

export function setLoaded() {
  return action(LoadingTypes.SetLoaded);
}
