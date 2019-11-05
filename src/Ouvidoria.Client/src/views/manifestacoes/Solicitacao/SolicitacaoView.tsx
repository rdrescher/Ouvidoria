import { Container, Fab, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";
import PainelManifestacoes from "../../../components/manifestacao/painel/PainelManifestacoes";
import PainelSolicitacao from "../../../components/manifestacao/painel/PainelSolicitacao";

export default function SolicitacaoView() {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Paper className={classes.container}>
        <Typography variant="h4" className={classes.title}>
          Solicitações
        </Typography>

        <Typography variant="h6" align="center" paragraph>
          Sobre Manifestações e Solicitações
        </Typography>

        <PainelManifestacoes />
        <PainelSolicitacao />

        <Typography variant="body1">
          Espaço destinado para você solicitar um atendimento, prestação de
          algum serviço ou auxílios na instituição.
        </Typography>
        <br />
        <Typography variant="body1">
          Solicite à instituição algo que você esteja necessitando no momento ou
          necessitará futuramente.
        </Typography>
        <br />
        <Grid
          container
          spacing={2}
          className={classes.buttons}
          justify="center"
        >
          <Grid item xs={12} sm={12} md={4}>
            <Link to="/solicitacao/lista">
              <Fab variant="extended" size="large" color="secondary">
                <Typography variant="button">
                  Ver minhas solicitações
                </Typography>
              </Fab>
            </Link>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Link to="/solicitacao/novo">
              <Fab variant="extended" size="large" color="secondary">
                <Typography variant="button">Nova Solicitação</Typography>
              </Fab>
            </Link>
          </Grid>
          {/* <Grid item xs={12} sm={12} md={4}>
              <Link to="/solicitacao">
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
