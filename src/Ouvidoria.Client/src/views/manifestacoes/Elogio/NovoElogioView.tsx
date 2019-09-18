import { makeStyles, Container, Paper, Typography } from "@material-ui/core";
import React from "react";
import TipoManifestacao from "../../../application/enums/TipoManifestacao";
import FormManifestacao from "../../../components/manifestation/FormManifestacao";

export default function NovoElogioView() {
  const classes = useStyles(0);
  return (
    <Container maxWidth="md">
      <Paper className={classes.container}>
        <Typography variant="h4">Novo Elogio</Typography>
        <FormManifestacao type={TipoManifestacao.Elogio} />
      </Paper>
    </Container>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    textAlign: "center",
    padding: "20px 20px 10px 20px"
  }
}));
