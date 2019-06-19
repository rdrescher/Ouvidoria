import { Container } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { IApplicationState } from "../../store";
import DashboardView from "../../views/manifestacoes/DashboardView";
import DenunciaView from "../../views/manifestacoes/DenunciaView";
import ElogioView from "../../views/manifestacoes/ElogioView";
import QuestionarioView from "../../views/manifestacoes/QuestionarioView";
import ReclamacaoView from "../../views/manifestacoes/ReclamacaoView";
import SolicitacaoView from "../../views/manifestacoes/SolicitacaoView";
import SugestaoView from "../../views/manifestacoes/SugestaoView";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

interface IStateProps {
  sidebarIsOpen: boolean;
}

function ContentComponent(props: IStateProps) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: props.sidebarIsOpen
        })}
      >
        <div className={classes.drawerHeader} />
        <Switch>
          <Route exact path="/denuncia" component={DenunciaView} />
          <Route exact path="/elogio" component={ElogioView} />
          <Route exact path="/questionario" component={QuestionarioView} />
          <Route exact path="/reclamacao" component={ReclamacaoView} />
          <Route exact path="/solicitacao" component={SolicitacaoView} />
          <Route exact path="/sugestao" component={SugestaoView} />
          <Route exact path="/" component={DashboardView} />
        </Switch>
      </main>
    </Container>
  );
}

const mapStateToProps = (state: IApplicationState) => ({
  sidebarIsOpen: state.NavigationReducer.sidebarIsOpen
});

export default connect(
  mapStateToProps,
  null
)(ContentComponent);