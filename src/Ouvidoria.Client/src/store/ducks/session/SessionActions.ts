import { action } from "typesafe-actions";
import ILoginResponse from "../../../models/Autenticacao/LoginResponse";
import { SessionTypes } from "./SessionTypes";

export function login(login: ILoginResponse) {
    return action(SessionTypes.login, { login });
}

export function logout() {
    return action(SessionTypes.logout);
}

export function refreshUserClaims() {
    return action(SessionTypes.refreshUserClaims);
}