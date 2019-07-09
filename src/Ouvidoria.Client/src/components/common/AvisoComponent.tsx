import { makeStyles, IconButton, Snackbar, Theme } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useEffect, useState } from "react";

interface IProps {
  aberto: boolean;
  mensagem: string;
}

export default function AvisoComponent(props: IProps) {
  const [open, setOpen] = useState<boolean>(false);
  const classes = useStyles();

  useEffect(() => {
    setOpen(props.aberto);
  }, [props]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={<span id="message-id">{props.mensagem}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={handleClose}
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
