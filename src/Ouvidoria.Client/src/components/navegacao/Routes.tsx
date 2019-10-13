import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import UsuarioPerfil from "../../application/enums/UsuarioPerfil";
import CursoView from "../../views/administracao/CursoView";
import DepartamentoView from "../../views/administracao/DepartamentoView";
import CadastroQuestionarioView from "../../views/administracao/Questionario/CadastroQuestionarioView";
import ListaQuestionarios from "../../views/administracao/Questionario/ListaQuestionarios";
import ListaRespostasPorQuestionarioView from "../../views/administracao/Questionario/ListaRespostasPorQuestionarioView";
import ListaRespostasView from "../../views/administracao/Questionario/ListaRespostasView";
import PreviewQuestionarioView from "../../views/administracao/Questionario/PreviewQuestionarioView";
import UsuarioView from "../../views/administracao/UsuarioView";
import CadastroView from "../../views/autenticacao/CadastroView";
import LoginView from "../../views/autenticacao/LoginView";
import Error from "../../views/errors/Error";
import NotAllowed from "../../views/errors/NotAllowed";
import NotFound from "../../views/errors/NotFound";
import DenunciaView from "../../views/manifestacoes/Denuncia/DenunciaView";
import ListaDenunciaView from "../../views/manifestacoes/Denuncia/ListaDenunciaView";
import NovaDenunciaView from "../../views/manifestacoes/Denuncia/NovaDenunciaView";
import ElogioView from "../../views/manifestacoes/Elogio/ElogioView";
import ListaElogiosView from "../../views/manifestacoes/Elogio/ListaElogiosView";
import NovoElogioView from "../../views/manifestacoes/Elogio/NovoElogioView";
import InteragirManifestacaoView from "../../views/manifestacoes/InteragirManifestacaoView";
import ListaReclamacoesView from "../../views/manifestacoes/Reclamacao/ListaReclamacoesView";
import NovaReclamacaoView from "../../views/manifestacoes/Reclamacao/NovaReclamacaoView";
import ReclamacaoView from "../../views/manifestacoes/Reclamacao/ReclamacaoView";
import ListaSolicitacoesView from "../../views/manifestacoes/Solicitacao/ListaSolicitacoesView";
import NovaSolicitacaoView from "../../views/manifestacoes/Solicitacao/NovaSolicitacaoView";
import SolicitacaoView from "../../views/manifestacoes/Solicitacao/SolicitacaoView";
import ListaSugestoesView from "../../views/manifestacoes/Sugestao/ListaSugestoesView";
import NovaSugestaoView from "../../views/manifestacoes/Sugestao/NovaSugestaoView";
import SugestaoView from "../../views/manifestacoes/Sugestao/SugestaoView";
import Questionarios from "../../views/questionarios/Questionarios";
import RelatorioQuestionarioView from "../../views/questionarios/RelatorioQuestionarioView";
import ResponderQuestionario from "../../views/questionarios/ResponderQuestionario";
import DashboardView from "../../views/DashboardView";
import Teste from "../../views/Teste";
import PrivateRoute from "./PrivateRoute";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={LoginView} />
      <Route exact path="/teste" component={Teste} />
      <Route exact path="/cadastrar" component={CadastroView} />
      <Route exact path="/denuncia" component={DenunciaView} />
      <PrivateRoute exact path="/denuncia/novo" component={NovaDenunciaView} />
      <PrivateRoute
        exact
        path="/denuncia/lista"
        component={ListaDenunciaView}
      />
      <Route exact path="/elogio" component={ElogioView} />
      <PrivateRoute exact path="/elogio/novo" component={NovoElogioView} />
      <PrivateRoute exact path="/elogio/lista" component={ListaElogiosView} />
      <Route exact path="/reclamacao" component={ReclamacaoView} />
      <PrivateRoute
        exact
        path="/reclamacao/lista"
        component={ListaReclamacoesView}
      />
      <PrivateRoute
        exact
        path="/reclamacao/novo"
        component={NovaReclamacaoView}
      />
      <Route exact path="/solicitacao" component={SolicitacaoView} />
      <PrivateRoute
        exact
        path="/solicitacao/lista"
        component={ListaSolicitacoesView}
      />
      <PrivateRoute
        exact
        path="/solicitacao/novo"
        component={NovaSolicitacaoView}
      />
      <Route exact path="/sugestao" component={SugestaoView} />
      <PrivateRoute
        exact
        path="/sugestao/lista"
        component={ListaSugestoesView}
      />
      <PrivateRoute exact path="/sugestao/novo" component={NovaSugestaoView} />
      <PrivateRoute exact path="/questionarios" component={Questionarios} />
      <PrivateRoute
        exact
        path="/questionarios/responder/:id"
        component={ResponderQuestionario}
      />
      <PrivateRoute
        exact
        path="/questionarios/lista"
        component={ListaQuestionarios}
        claimRequired={UsuarioPerfil.Administrador}
      />
      <PrivateRoute
        exact
        path="/questionarios/novo"
        component={CadastroQuestionarioView}
        claimRequired={UsuarioPerfil.Administrador}
      />
      <PrivateRoute
        exact
        path="/questionarios/:id/respostas"
        component={ListaRespostasPorQuestionarioView}
        claimRequired={UsuarioPerfil.Administrador}
      />
      <PrivateRoute
        exact
        path="/questionarios/:id/relatorio"
        component={RelatorioQuestionarioView}
        claimRequired={UsuarioPerfil.Administrador}
      />
      <PrivateRoute
        exact
        path="/questionarios/pre-visualizar/:id"
        component={PreviewQuestionarioView}
        claimRequired={UsuarioPerfil.Administrador}
      />
      <PrivateRoute
        exact
        path="/questionarios/resposta/:id"
        component={ListaRespostasView}
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
      <PrivateRoute
        exact
        path="/manifestacao/:id"
        component={InteragirManifestacaoView}
      />
      <Route exact path="/" component={DashboardView} />
      <Route exact path="/not-found" component={NotFound} />
      <Route exact path="/not-allowed" component={NotAllowed} />
      <Route exact path="/error" component={Error} />
      <Route path="/" render={() => <Redirect to="/not-found" />} />
    </Switch>
  );
}
