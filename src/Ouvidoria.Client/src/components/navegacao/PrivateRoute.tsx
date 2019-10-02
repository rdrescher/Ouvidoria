import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import UsuarioPerfil from "../../application/enums/UsuarioPerfil";
import Claim from "../../models/Autenticacao/Claim";
import IUserToken from "../../models/Autenticacao/UserToken";
import AutenticacaoApi from "../../services/AutenticacaoApi";
import * as SessionActions from "../../store/ducks/session/SessionActions";
import { IApplicationState } from "../../store/index";

interface IDispatchProps {
  logout(): void;
}
interface IStateProps {
  isAuthenticated: boolean;
  user: IUserToken | null;
  claims: Claim[];
}

interface IProps extends RouteProps {
  claimRequired?: UsuarioPerfil;
}

interface IState {
  loading: boolean;
  hasPermission: boolean;
  invalidToken: boolean;
}

const initialState: IState = {
  loading: true,
  hasPermission: false,
  invalidToken: false
};

type Props = IProps & IStateProps & IDispatchProps;

function PrivateRoute(props: Props) {
  const {claimRequired, claims, logout, isAuthenticated} = props;
  const [state, setState] = useState(initialState);

  useEffect(() => {
    async function hasPermission() {
      let result = await AutenticacaoApi.CheckToken();

      if (result.success) {
        let valid = true;

        if (!isAuthenticated) valid = false;
        if (
          !!claimRequired &&
          !claims.find(
            x => x.type === UsuarioPerfil[claimRequired!]
          )
        )
          valid = false;

        setState(prevState => {
          return { ...prevState, loading: false, hasPermission: valid };
        });
      } else {
        logout();
        setState(prevState => ({ ...prevState, loading: false, invalidToken: true }));
      }
    }

    hasPermission();
    // eslint-disable-next-line
  },        []);

  return state.loading ? (
    <></>
  ) : state.invalidToken ? (
    <Redirect to="/login" />
  ) : state.hasPermission ? (
    <Route {...props} />
  ) : (
    <Redirect to="/not-allowed" />
  );
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(SessionActions, dispatch);

const mapStateToProps = (state: IApplicationState) => ({
  isAuthenticated: state.SessionReducer.isAuthenticated,
  user: state.SessionReducer.user,
  claims: state.SessionReducer.claims
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute);
