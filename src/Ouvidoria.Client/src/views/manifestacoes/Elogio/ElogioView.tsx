import { Container, Fab, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";
import PainelElogio from "../../../components/manifestacao/painel/PainelElogio";
import PainelManifestacoes from "../../../components/manifestacao/painel/PainelManifestacoes";

export default function ElogioView() {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Paper className={classes.container}>
        <Typography variant="h4" className={classes.title}>
          Elogios
        </Typography>

        <Typography variant="h6" align="center" paragraph>
          Sobre Manifestações e Elogios
        </Typography>

        <PainelManifestacoes />
        <PainelElogio />

        <Typography variant="body1">
          Espaço destinado para compartilhar registros de bom atendimento ou
          satisfação com atendimentos e serviços recebidos na instituição que
          você deseja compartilhar com a mesma, a fim de contribuir com o
          ambiente, mostrando que a instituição está realizando as atividades de
          maneira correta e satisfatória.
        </Typography>
        <br />
        <Grid
          container
          spacing={2}
          className={classes.buttons}
          justify="center"
        >
          <Grid item xs={12} sm={12} md={4}>
            {
              <Link to="/elogio/lista">
                <Fab variant="extended" size="large" color="secondary">
                  <Typography variant="button">Ver meus elogios</Typography>
                </Fab>
              </Link>
            }
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Link to="/elogio/novo">
              <Fab variant="extended" size="large" color="secondary">
                <Typography variant="button">Novo elogio</Typography>
              </Fab>
            </Link>
          </Grid>
          {/* <Grid item xs={12} sm={12} md={4}>
              <Link to="/elogio">
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
