import { makeStyles, Fab, Tooltip } from "@material-ui/core";
import { List, PieChart, RemoveRedEye } from "@material-ui/icons";
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
      {props.answers > 0 ? (
        <Tooltip title="Ver Respostas">
          <Link to={`/questionarios/${props.id}/respostas`}>
            <Fab size="small" color="secondary" className={classes.btn}>
              <List />
            </Fab>
          </Link>
        </Tooltip>
      ) : (
        <Tooltip title="Ver Respostas">
          <Fab size="small" color="secondary" disabled className={classes.btn}>
            <List />
          </Fab>
        </Tooltip>
      )}
      <Tooltip title="Pré Visualizar">
        <Link to={`/questionarios/pre-visualizar/${props.id}`}>
          <Fab size="small" color="secondary" className={classes.btn}>
            <RemoveRedEye />
          </Fab>
        </Link>
      </Tooltip>
      {props.answers > 0 ? (
        <Tooltip title="Relatório">
          <Link to={`/questionarios/${props.id}/relatorio`}>
            <Fab size="small" color="secondary" className={classes.btn}>
              <PieChart />
            </Fab>
          </Link>
        </Tooltip>
      ) : (
        <Tooltip title="Relatório">
          <Fab size="small" color="secondary" disabled className={classes.btn}>
            <PieChart />
          </Fab>
        </Tooltip>
      )}
    </>
  );
}

const useStyles = makeStyles(() => ({
  btn: {
    margin: 2
  }
}));
