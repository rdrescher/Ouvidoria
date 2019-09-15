import { Fab, IconButton, Tooltip } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";

export default function Criar() {
  const classes = useStyles(0);
  return (
    <Tooltip title="Criar">
      <Link to="/questionarios/novo">
        <IconButton className={classes.create}>
          <Add />
        </IconButton>
      </Link>
    </Tooltip>
  );
}

const useStyles = makeStyles({
  create: {
    "&:hover": {
      color: "#0083B0"
    }
  }
});
