import React, { SyntheticEvent } from "react";
import {
  Fab,
  Typography,
  CircularProgress,
  makeStyles,
  Theme
} from "@material-ui/core";
import { Save } from "@material-ui/icons";
import { green } from "@material-ui/core/colors";

interface IProps {
  loading: boolean;
  onSubmit: (e: SyntheticEvent) => void;
}

export default function SaveButton(props: IProps) {
  const classes = useStyles(0);
  return (
    <div className={classes.buttons}>
      <div className={classes.wrapper}>
        <Fab
          variant="extended"
          color="primary"
          aria-label="salvar"
          size="small"
          onClick={props.onSubmit}
          disabled={props.loading}
        >
          <Save className={classes.btnMargin} />
          <Typography variant="inherit" className={classes.contentSpacer}>
            Salvar
          </Typography>
        </Fab>
        {props.loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  buttons: {
    marginBottom: "1.25em",
    marginTop: ".5em",
    display: "flex",
    justifyContent: "flex-end"
  },
  btnMargin: {
    marginRight: theme.spacing(1)
  },
  contentSpacer: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  }
}));
