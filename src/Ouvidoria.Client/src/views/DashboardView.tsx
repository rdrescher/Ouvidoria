import { makeStyles, Container, Paper, Typography } from "@material-ui/core";
import React from "react";

export default function DashboardView() {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Paper className={classes.container}>
        <Typography className={classes.title} variant="h4">
          Seja bem-vindo à Ouvidoria da AMF!
        </Typography>
        <Typography variant="body1">
          A Ouvidoria da Antonio Meneghetti Faculdade é um canal de comunicação
          entre a instituição e as pessoas que a ela frequentam. Atende
          manifestações como{" "}
          <strong>
            elogios, sugestões, denúncias, solicitações e reclamações
          </strong>
          .
        </Typography>
        <br />
        <Typography variant="body1">
          Atualmente conta também com um sistema de{" "}
          <strong>questionários</strong> através do mesmo, aplicar perguntas
          específicas que sejam de seu interesse, auxiliando ainda mais no
          atendimento ao cliente.
        </Typography>
        <br />
        <Typography variant="h6">Informações importantes</Typography>
        <br />
        <Typography variant="body2">
          <i>
            * O sistema encontra-se em fase de testes, não contendo todas suas
            funcionalidades.
          </i>
        </Typography>
        <Typography variant="body2">
          <i>
            * Suas informações <strong>não</strong> serão divulgadas em
            circunstância alguma.
          </i>
        </Typography>
        <Typography variant="body2">
          <i>
            * Caso ocorra algum problema ou erro durante o uso do sistema, favor
            enviar um e-mail para rhuan.drescher@gmail.com ou então utilizar a
            área de reclamações para relatá-lo.
          </i>
        </Typography>
      </Paper>
    </Container>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    padding: 20
  },
  title: {
    textAlign: "center",
    margin: 20
  }
}));
