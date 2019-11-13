import { Container, Fab, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";
import PainelManifestacoes from "../../../components/manifestacao/painel/PainelManifestacoes";
import PainelSugestao from "../../../components/manifestacao/painel/PainelSugestao";

export default function SugestaoView() {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Paper className={classes.container}>
        <Typography variant="h4" className={classes.title}>
          Sugestões
        </Typography>

        <Typography variant="h6" align="center" paragraph>
          Sobre Manifestações e Sugestões
        </Typography>

        <PainelManifestacoes />
        <PainelSugestao />

        <Grid
          container
          spacing={2}
          className={classes.buttons}
          justify="center"
        >
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
          {/* <Grid item xs={12} sm={12} md={4}>
              <Link to="/sugestao">
                <Fab variant="extended" size="large" color="secondary">
                <Typography variant="button">
                Ver todas manifestações
                </Typography>
                </Fab>
              </Link>
            </Grid> */}
        </Grid>
      </Paper>
    </Container>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    padding: 20,
    textAlign: "justify"
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
