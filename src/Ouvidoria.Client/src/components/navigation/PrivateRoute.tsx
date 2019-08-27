import React, { ReactElement } from "react";
import { Route, Redirect } from "react-router-dom";
import { IApplicationState } from "../../store/index";
import { connect } from "react-redux";
import IUserToken from "../../models/Autenticacao/UserToken";
import { UsuarioPerfil } from "../../models/Usuario/Usuario";
import { Dispatch, bindActionCreators } from "redux";

interface IStateProps {
  isAuthenticated: boolean;
  user: IUserToken | null;
}

interface IProps {
  path: string;
  component: () => JSX.Element;
  claimRequired?: UsuarioPerfil;
  redirect?: string;
}

type Props = IProps & IStateProps;

function PrivateRoute(props: Props) {
  function hasPermission(): boolean {
    if (!props.isAuthenticated) return false;
    if (!props.claimRequired) return true;
    if (
      !props.user!.claims.find(
        x => x.type === UsuarioPerfil[props.claimRequired!]
      )
    )
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
  user: state.SessionReducer.user
});

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
