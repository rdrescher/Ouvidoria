import { makeStyles, Fab, Tooltip } from "@material-ui/core";
import { List, RemoveRedEye } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

interface IProps {
  id: number;
  answers: number;
}

export default function Acoes(props: IProps) {
  const classes = useStyles();
  return (
    <>
      {props.answers > 0 && (
        <Tooltip title="Ver Respostas">
          <Link to="/" className={classes.btn}>
            <Fab size="small" color="secondary">
              <List />
            </Fab>
          </Link>
        </Tooltip>
      )}
      <Tooltip title="Pré Visualizar">
        <Link to={`/questionarios/pre-visualizar/${props.id}`}>
          <Fab size="small" color="secondary">
            <RemoveRedEye />
          </Fab>
        </Link>
      </Tooltip>
    </>
  );
}

const useStyles = makeStyles(() => ({
  btn: {
    marginRight: 10
  }
}));
