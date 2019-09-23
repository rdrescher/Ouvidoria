import { Container, Fab, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IApplicationState } from "../../../store";

interface IStateProps {
  isAuthenticated: boolean;
}

function ReclamacaoView(props: IStateProps) {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Paper className={classes.container}>
        <Typography variant="h4" className={classes.title}>
          Reclamações
        </Typography>
        <Typography variant="body1">
          Espaço destinado para demonstrar insatisfações relacionadas a
          atendimentos ou serviços prestados pela instituição.
        </Typography>
        <br />
        <Typography variant="body1">
          Reclame aqui caso você tenha uma crítica ou algum relato de
          instisfação que você deseja compartilhar com a instituição.
        </Typography>
        <br />
        {props.isAuthenticated ? (
          <Grid container spacing={2} className={classes.buttons}>
            <Grid item xs={12} sm={12} md={4}>
              {/* <Link to="/reclamacao">
                <Fab variant="extended" size="large" color="secondary">
                  <Typography variant="button">
                    Ver minhas reclamações
                  </Typography>
                </Fab>
              </Link> */}
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Link to="/reclamacao/novo">
                <Fab variant="extended" size="large" color="secondary">
                  <Typography variant="button">Nova Reclamação</Typography>
                </Fab>
              </Link>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              {/* <Link to="/reclamacao">
                <Fab variant="extended" size="large" color="secondary">
                  <Typography variant="button">
                    Ver todas manifestações
                  </Typography>
                </Fab>
              </Link> */}
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body2">
            <i>
              * Para realizar uma reclamação, você deve estar{" "}
              <Link to="/login">logado</Link> no sistema.
            </i>
          </Typography>
        )}
      </Paper>
    </Container>
  );
}

const mapStateToProps = (state: IApplicationState) => ({
  isAuthenticated: state.SessionReducer.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(ReclamacaoView);

const useStyles = makeStyles(() => ({
  container: {
    padding: 20,
    "& p": {
      textAlign: "justify"
    }
  },
  title: {
    textAlign: "center",
    marginBottom: 20
  },
  buttons: {
    marginTop: 20,
    "& a": {
      textDecoration: "none"
    },
    "& button": {
      width: "100%"
    }
  }
}));
