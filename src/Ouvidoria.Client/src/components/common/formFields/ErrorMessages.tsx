import React from "react";
import { Typography, Divider, makeStyles, Theme } from "@material-ui/core";

interface IProps {
  errors: string[];
}

export default function ErrorMessages(props: IProps) {
  const classes = useStyles(0);
  return (
    <div className={classes.errors}>
      <Typography variant="h6">Erro ao salvar</Typography>
      <Divider className={classes.divider} />
      {props.errors.map(error => (
        <Typography key={error} variant="body2">
          {error}
        </Typography>
      ))}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  errors: {
    backgroundColor: "rgba(239, 83, 80, 0.5)",
    color: "rgba(0, 0, 0, 0.6)",
    width: "100%",
    border: 1,
    borderRadius: 5,
    marginTop: 20,
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20
  },
  divider: {
    marginBottom: 15
  }
}));
