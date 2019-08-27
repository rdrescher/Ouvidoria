import Claim from "../../../models/Autenticacao/Claim";
import IUserToken from "../../../models/Autenticacao/UserToken";

export enum SessionTypes {
    refreshUserClaims = "@session/refreshUserClaims",
    login = "@session/login",
    logout = "@session/logout"
}

export interface ISessionState {
    readonly isAuthenticated: boolean;
    readonly token: string;
    readonly user: IUserToken | null;
    readonly claims: Claim[];
}