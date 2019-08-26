import {
  makeStyles,
  CircularProgress,
  Fab,
  Theme,
  Typography
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { Save } from "@material-ui/icons";
import React, { SyntheticEvent } from "react";

interface IProps {
  loading: boolean;
  label: string;
  onSubmit: (e: SyntheticEvent) => void;
  saveIcon?: boolean;
}

export default function SubmitButton(props: IProps) {
  const classes = useStyles(0);
  return (
    <div className={classes.wrapper}>
      <Fab
        variant="extended"
        color="primary"
        aria-label={props.label.toLowerCase()}
        size="small"
        onClick={props.onSubmit}
        disabled={props.loading}
      >
        {!!props.saveIcon && <Save className={classes.btnMargin} />}
        <Typography variant="inherit" className={classes.contentSpacer}>
          {props.label}
        </Typography>
      </Fab>
      {props.loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
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
