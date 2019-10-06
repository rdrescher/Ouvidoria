import { Container, Fab, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IApplicationState } from "../../../store";

interface IStateProps {
  isAuthenticated: boolean;
}

function DenunciaView(props: IStateProps) {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Paper className={classes.container}>
        <Typography variant="h4" className={classes.title}>
          Denúncias
        </Typography>
        <Typography variant="body1">
          Espaço destinado para reportar a ocorrência de algum ato ilícito,
          ilegal, criminoso ou uma irregularidade praticada pela sociedade ou
          por alunos, funcionários e professores da instituição.
        </Typography>
        <br />
        <Typography variant="body1">
          Realize uma denúncia caso algum ato familiar tenha acontecido com você
          ou caso você tenha presenciado alguma ocorrência similar na
          instituição.
        </Typography>
        <br />
        {props.isAuthenticated ? (
          <Grid
            container
            spacing={2}
            className={classes.buttons}
            justify="center"
          >
            <Grid item xs={12} sm={12} md={4}>
              <Link to="/denuncia/lista">
                <Fab variant="extended" size="large" color="secondary">
                  <Typography variant="button">Ver minhas denúncias</Typography>
                </Fab>
              </Link>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Link to="/denuncia/novo">
                <Fab variant="extended" size="large" color="secondary">
                  <Typography variant="button">Nova Denúncia</Typography>
                </Fab>
              </Link>
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4}>
              <Link to="/denuncia">
                <Fab variant="extended" size="large" color="secondary">
                  <Typography variant="button">
                    Ver todas manifestações
                  </Typography>
                </Fab>
              </Link>
            </Grid> */}
          </Grid>
        ) : (
          <Typography variant="body2">
            <i>
              * Para realizar uma denúncia, você deve estar{" "}
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
)(DenunciaView);

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
