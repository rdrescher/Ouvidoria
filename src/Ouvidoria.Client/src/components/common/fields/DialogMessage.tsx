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
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IApplicationState } from "../../../store";
import * as DialogMessagesActions from "../../../store/ducks/dialogMessages/DialogMessagesActions";

interface IDispatchProps {
  close(): void;
}

interface IStateProps {
  isOpen: boolean;
  title: string;
  messages: string[];
}

type Props = IDispatchProps & IStateProps;

function DialogMessage(props: Props) {
  const classes = useStyles();
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {!!props.title && (
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      )}
      <DialogContent dividers>
        <DialogContentText
          id="alert-dialog-description"
          className={classes.text}
        >
          {props.messages.map(message => (
            <label key={message}>
              {`${message}`}
              <br />
            </label>
          ))}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.close} color="primary" autoFocus>
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

const mapStateToProps = (state: IApplicationState) => ({
  isOpen: state.DialogMessagesReducer.isOpen,
  title: state.DialogMessagesReducer.title,
  messages: state.DialogMessagesReducer.messages
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(DialogMessagesActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogMessage);
