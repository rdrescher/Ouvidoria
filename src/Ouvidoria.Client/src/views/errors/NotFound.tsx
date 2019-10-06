import { makeStyles, Container, Paper, Typography } from "@material-ui/core";
import { SentimentDissatisfiedOutlined } from "@material-ui/icons";
import React from "react";

export default function NotFound() {
  const classes = useStyles();

  return (
    <Container>
      <Paper className={classes.container}>
        <Typography className={classes.title} variant="h4">
          <SentimentDissatisfiedOutlined /> ERROR 404{" "}
          <SentimentDissatisfiedOutlined />
        </Typography>
        <Typography className={classes.description} variant="body1">
          Página não encontrada!{" "}
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
