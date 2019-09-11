import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { UsuarioPerfil } from "../../models/Usuario/Usuario";
import CadastroQuestionarioView from "../../views/administracao/CadastroQuestionarioView";
import CursoView from "../../views/administracao/CursoView";
import DepartamentoView from "../../views/administracao/DepartamentoView";
import UsuarioView from "../../views/administracao/UsuarioView";
import CadastroView from "../../views/autenticacao/CadastroView";
import LoginView from "../../views/autenticacao/LoginView";
import Error from "../../views/errors/Error";
import NotAllowed from "../../views/errors/NotAllowed";
import NotFound from "../../views/errors/NotFound";
import DashboardView from "../../views/manifestacoes/DashboardView";
import DenunciaView from "../../views/manifestacoes/DenunciaView";
import ElogioView from "../../views/manifestacoes/ElogioView";
import ReclamacaoView from "../../views/manifestacoes/ReclamacaoView";
import SolicitacaoView from "../../views/manifestacoes/SolicitacaoView";
import SugestaoView from "../../views/manifestacoes/SugestaoView";
import Questionarios from "../../views/questionarios/Questionarios";
import ResponderQuestionario from "../../views/questionarios/ResponderQuestionario";
import PrivateRoute from "./PrivateRoute";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={LoginView} />
      <Route exact path="/cadastrar" component={CadastroView} />
      <Route exact path="/denuncia" component={DenunciaView} />
      <Route exact path="/elogio" component={ElogioView} />
      <Route exact path="/reclamacao" component={ReclamacaoView} />
      <Route exact path="/solicitacao" component={SolicitacaoView} />
      <Route exact path="/sugestao" component={SugestaoView} />
      <PrivateRoute exact path="/questionarios" component={Questionarios} />
      <PrivateRoute
        exact
        path="/questionarios/responder/:id"
        component={ResponderQuestionario}
      />
      <PrivateRoute
        exact
        path="/questionarios/novo"
        component={CadastroQuestionarioView}
        claimRequired={UsuarioPerfil.Administrador}
      />
      <PrivateRoute
        exact
        path="/cursos"
        claimRequired={UsuarioPerfil.Administrador}
        component={CursoView}
      />
      <PrivateRoute
        exact
        path="/departamentos"
        claimRequired={UsuarioPerfil.Administrador}
        component={DepartamentoView}
      />
      <PrivateRoute
        exact
        path="/usuarios"
        claimRequired={UsuarioPerfil.Administrador}
        component={UsuarioView}
      />
      <Route exact path="/" component={DashboardView} />
      <Route exact path="/not-found" component={NotFound} />
      <Route exact path="/not-allowed" component={NotAllowed} />
      <Route exact path="/error" component={Error} />
      <Route path="/" render={() => <Redirect to="/not-found" />} />
    </Switch>
  );
}
