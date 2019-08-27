import { makeStyles, Theme, Typography } from "@material-ui/core";
import { ErrorOutline } from "@material-ui/icons";
import React from "react";

interface IProps {
  errors: string[];
}

export default function ErrorMessages(props: IProps) {
  const classes = useStyles(0);
  return (
    <div className={classes.errors}>
      {props.errors.map(error => (
        <Typography key={error} variant="body2" className={classes.text} >
          <ErrorOutline className={classes.icon} />{error}
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
    paddingLeft: 20,
  },
  text: {
    display: "flex",
    alignItems: "center"
  },
  icon: {
    marginRight: 15
  }
}));
