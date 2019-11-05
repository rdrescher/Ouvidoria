import { Container, Fab, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";
import PainelDenuncia from "../../../components/manifestacao/painel/PainelDenuncia";
import PainelManifestacoes from "../../../components/manifestacao/painel/PainelManifestacoes";

export default function DenunciaView() {
  const classes = useStyles(true);
  return (
    <Container maxWidth="md">
      <Paper className={classes.container}>
        <Typography variant="h4" paragraph className={classes.title}>
          Denúncias
        </Typography>
        <Typography variant="h6" align="center" paragraph>
          Sobre Manifestações e Denúncias
        </Typography>
        <PainelManifestacoes />
        <PainelDenuncia />

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
