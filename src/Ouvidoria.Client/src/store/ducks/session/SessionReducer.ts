import { Reducer } from "redux";
import * as Session from "../../../application/session";
import ILoginResponse from "../../../models/Autenticacao/LoginResponse";
import { ISessionState, SessionTypes } from "./SessionTypes";

const initialState: ISessionState = {
  isAuthenticated: Session.isAuthenticated(),
  token: Session.getToken(),
  user: Session.getUser()
};

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

function refreshState(): ISessionState {
  Session.refreshUserClaims();
  
  return {
    isAuthenticated: Session.isAuthenticated(),
    token: Session.getToken(),
    user: Session.getUser()
  };
}

export default reducer;
