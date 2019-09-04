import {
  makeStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import React from "react";

interface IProps {
  open: boolean;
  title: string;
  messages: string[];
  onClose: () => void;
}

export default function DialogMessage(props: IProps) {
  const classes = useStyles();

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {!!props.title && (
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      )}
      <DialogContent dividers>
        <DialogContentText id="alert-dialog-description" className={classes.text}>
          {props.messages.map(message => `\n${message}`)}
          {`\n`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles(() => ({
  text: {
    color: "black"
  }
}));
