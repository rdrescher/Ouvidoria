import { Container, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import TipoManifestacao from "../../../application/enums/TipoManifestacao";
import ListaManifestacoes from "../../../components/manifestacao/ListaManifestacoes";

export default function ListaSolicitacoesView() {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Paper className={classes.container}>
        <Typography variant="h4" align="center" className={classes.title}>
          Minhas Solicitações
        </Typography>
        <ListaManifestacoes manifestationType={TipoManifestacao.Solicitacao} />
      </Paper>
    </Container>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    padding: 20
  },
  title: {
    marginBottom: 40
  }
}));
