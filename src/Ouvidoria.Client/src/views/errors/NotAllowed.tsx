import { makeStyles, Container, Paper, Typography } from "@material-ui/core";
import { Security } from "@material-ui/icons";
import React from "react";

export default function NotAllowed() {
  const classes = useStyles();

  return (
    <Container>
      <Paper className={classes.container}>
        <Typography className={classes.title} variant="h4">
          <Security />  ERROR 401<Security />
        </Typography>
        <Typography className={classes.description} variant="body1">
          Você não tem permissão para acessar esta página!
        </Typography>
      </Paper>
    </Container>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    padding: 20,
    textAlign: "center"
  },
  title: {
    margin: 20
  },
  description: {
    marginBottom: 20
  }
}));
