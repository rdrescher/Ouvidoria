import { makeStyles, IconButton, Snackbar, Theme } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IApplicationState } from "../../store";
import * as MessageBoxActions from "../../store/ducks/messageBox/MessageBoxActions";

interface IDispatchProps {
  hide(): void;
}

interface IStateProps {
  open: boolean;
  message: string;
}

type Props = IDispatchProps & IStateProps;

function MessageBox(props: Props) {
  const classes = useStyles(0);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      open={props.open}
      autoHideDuration={3000}
      onClose={props.hide}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={<span id="message-id">{props.message}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={props.hide}
        >
          <Close />
        </IconButton>
      ]}
    />
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  close: {
    padding: theme.spacing(0.5)
  }
}));

const mapStateToProps = (state: IApplicationState) => ({
  open: state.MessageBoxReducer.open,
  message: state.MessageBoxReducer.message
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(MessageBoxActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageBox);
