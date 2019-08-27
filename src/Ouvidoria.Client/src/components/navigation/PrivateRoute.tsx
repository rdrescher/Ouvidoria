import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Claim from "../../models/Autenticacao/Claim";
import IUserToken from "../../models/Autenticacao/UserToken";
import { UsuarioPerfil } from "../../models/Usuario/Usuario";
import AutenticacaoApi from "../../services/AutenticacaoApi";
import { IApplicationState } from "../../store/index";

interface IStateProps {
  isAuthenticated: boolean;
  user: IUserToken | null;
  claims: Claim[];
}

interface IProps {
  path: string;
  component: () => JSX.Element;
  claimRequired?: UsuarioPerfil;
  redirect?: string;
}

type Props = IProps & IStateProps;

function PrivateRoute(props: Props) {
  useEffect(() => {
    async function CheckToken() {
      await AutenticacaoApi.CheckToken();
    }
    CheckToken();
  },        []);
  function hasPermission(): boolean {
    if (!props.isAuthenticated) return false;
    if (!props.claimRequired) return true;
    if (!props.claims.find(x => x.type === UsuarioPerfil[props.claimRequired!]))
      return false;
    return true;
  }

  return (
    <Route
      exact
      path={props.path}
      render={() =>
        hasPermission() ? <props.component /> : <Redirect to="/" />
      }
    />
  );
}

const mapStateToProps = (state: IApplicationState) => ({
  isAuthenticated: state.SessionReducer.isAuthenticated,
  user: state.SessionReducer.user,
  claims: state.SessionReducer.claims
});

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
