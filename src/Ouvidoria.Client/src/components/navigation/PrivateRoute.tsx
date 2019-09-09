import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
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

interface IProps extends RouteProps {
  claimRequired?: UsuarioPerfil;
  redirect?: string;
}

interface IState {
  loading: boolean;
  hasPermission: boolean;
}

const initialState: IState = {
  loading: true,
  hasPermission: false
};

type Props = IProps & IStateProps;

function PrivateRoute(props: Props) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    async function hasPermission() {
      let result = await AutenticacaoApi.CheckToken();

      if (result.success) {
        let valid = true;

        if (!props.isAuthenticated) valid = false;
        if (
          !!props.claimRequired &&
          !props.claims.find(
            x => x.type === UsuarioPerfil[props.claimRequired!]
          )
        )
          valid = false;

        setState(prevState => {
          return { ...prevState, loading: false, hasPermission: valid };
        });
      }
    }

    hasPermission();
  },        [props]);

  return state.loading ? (
    <></>
  ) : state.hasPermission ? (
    <Route {...props} />
  ) : (
    <Redirect to="/" />
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
