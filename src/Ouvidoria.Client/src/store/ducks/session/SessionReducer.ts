import { Reducer } from "redux";
import * as Session from "../../../application/session";
import ILoginResponse from "../../../models/Autenticacao/LoginResponse";
import { ISessionState, SessionTypes } from "./SessionTypes";

function refreshState(): ISessionState {
  return {
    isAuthenticated: Session.isAuthenticated(),
    token: Session.getToken(),
    user: Session.getUser(),
    claims: Session.getClaims()
  };
}

const reducer: Reducer = (state: ISessionState = refreshState(), action) => {
  switch (action.type) {
    case SessionTypes.login:
      Session.login(action.payload.login as ILoginResponse);
      return refreshState();
    case SessionTypes.refreshUserClaims:
      return refreshState();
    case SessionTypes.logout:
      Session.logout();
      return refreshState();
    default:
      return state;
  }
};

export default reducer;
