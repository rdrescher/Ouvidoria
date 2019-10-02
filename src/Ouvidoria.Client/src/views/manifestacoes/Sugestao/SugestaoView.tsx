import { Container, Fab, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IApplicationState } from "../../../store";

interface IStateProps {
  isAuthenticated: boolean;
}

function SugestaoView(props: IStateProps) {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Paper className={classes.container}>
        <Typography variant="h4" className={classes.title}>
          Sugestões
        </Typography>
        <Typography variant="body1">
          Espaço destinado para você enviar sua ideia ou proposta de melhoria
          nos serviços, atendimentos ou no espaço da instituição.
        </Typography>
        <br />
        <Typography variant="body1">
          Sugira à insituição melhorias que você julga válidas ou necessárias no
          ambiente.
        </Typography>
        <br />
        {props.isAuthenticated ? (
          <Grid container spacing={2} className={classes.buttons}>
            <Grid item xs={12} sm={12} md={4}>
              <Link to="/sugestao/lista">
                <Fab variant="extended" size="large" color="secondary">
                  <Typography variant="button">Ver minhas sugestões</Typography>
                </Fab>
              </Link>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Link to="/sugestao/novo">
                <Fab variant="extended" size="large" color="secondary">
                  <Typography variant="button">Nova Sugestão</Typography>
                </Fab>
              </Link>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              {/* <Link to="/sugestao">
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
              * Para realizar uma sugestão, você deve estar{" "}
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
)(SugestaoView);

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
