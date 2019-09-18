import { Container, Fab, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IApplicationState } from "../../../store";

interface IStateProps {
  isAuthenticated: boolean;
}

function ElogioView(props: IStateProps) {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Paper className={classes.container}>
        <Typography variant="h4" className={classes.title}>
          Elogios
        </Typography>
        <Typography variant="body1">
          Espaço destinado para compartilhar registros de bom atendimento ou
          satisfação com atendimentos e serviços recebidos na instituição que
          você deseja compartilhar com a mesma, a fim de contribuir com o
          ambiente, mostrando que a instituição está realizando as atividades de
          maneira correta e satisfatória.
        </Typography>
        <br />
        {props.isAuthenticated ? (
          <Grid container spacing={2} className={classes.buttons}>
            <Grid item xs={12} sm={12} md={4}>
              {/* <Link to="/elogio">
                <Fab variant="extended" size="large" color="secondary">
                  <Typography variant="button">Ver meus elogios</Typography>
                </Fab>
              </Link> */}
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Link to="/elogio/novo">
                <Fab variant="extended" size="large" color="secondary">
                  <Typography variant="button">Novo elogio</Typography>
                </Fab>
              </Link>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              {/* <Link to="/elogio">
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
              * Para registrar um elogio, você deve estar{" "}
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
)(ElogioView);

const useStyles = makeStyles(() => ({
  container: {
    padding: 20
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
