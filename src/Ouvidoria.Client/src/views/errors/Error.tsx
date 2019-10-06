import { makeStyles, Container, Paper, Typography } from "@material-ui/core";
import { ErrorOutlineOutlined } from "@material-ui/icons";
import React from "react";

export default function Error() {
  const classes = useStyles();

  return (
    <Container>
      <Paper className={classes.container}>
        <Typography className={classes.title} variant="h4">
          <ErrorOutlineOutlined /> ERROR 500 <ErrorOutlineOutlined />
        </Typography>
        <Typography className={classes.description} variant="body1">
          Ocorreu um erro durante a sua requisição.
        </Typography>
        <Typography variant="body1">
          Por favor, relate de forma detalhada o problema que ocorreu, através
          do e-mail rhuan.drescher@gmail.com ou através da área de reclamações.
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
