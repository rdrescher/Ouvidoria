import { makeStyles, CircularProgress, Container, Paper, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { bindActionCreators, Dispatch } from "redux";
import { IApplicationState } from "../../store";
import * as SessionActions from "../../store/ducks/session/SessionActions";

interface IDispatchProps {
  logout(): void;
}

interface IStateProps {
  isAuthenticated: boolean;
}

type Props = IStateProps & IDispatchProps & RouteComponentProps;

function LogoutView(props: Props) {
  const { logout, isAuthenticated, history } = props;
  const classes = useStyles();

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
       logout();
       history.push("/");
      },         1000);
    } else {
      history.push("/");
    }
  },        [logout, isAuthenticated, history]);

  return (
    <Container maxWidth="md">
      <Paper className={classes.container}>
        <Typography align="center">Saindo...</Typography>
        <CircularProgress />
      </Paper>
    </Container>
  );
}

const mapStateToProps = (state: IApplicationState) => ({
  isAuthenticated: state.SessionReducer.isAuthenticated
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(SessionActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutView);

const useStyles = makeStyles(() => ({
  container: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& p": {
      marginBottom: 15
    }
  }
}));
