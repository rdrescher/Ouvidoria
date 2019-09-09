import {
  makeStyles,
  CircularProgress,
  Dialog,
  DialogContent,
  Typography
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../store";

interface IStateProps {
  loading: boolean;
}

function Loading(props: IStateProps) {
  const classes = useStyles(0);
  return (
    <Dialog
      open={props.loading}
disableBackdropClick
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent className={classes.dialog}>
        <Typography variant="body1">Carregando...</Typography>
        <CircularProgress size={24} className={classes.progress} />
      </DialogContent>
    </Dialog>
  );
}

const mapStateToProps = (state: IApplicationState) => ({
  loading: state.LoadingReducer.loading,
});

export default connect(
  mapStateToProps,
  null
)(Loading);

const useStyles = makeStyles(() => ({
  dialog: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  progress: {
    color: green[500],
    margin: 10,
  }
}));
