import React from "react";
import { Delete, Edit } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { Fab } from "@material-ui/core";
import Operacao from "../../../types/Operacao";

interface IProps {
  delete: boolean;
  edit: boolean;
  onHandleClick: (operacao: Operacao, data: unknown) => void;
  selectedData: unknown;
}

export default function CustomToolbarSelect(props: IProps) {
  const classes = useStyles(1);

  const handleEdit = () => {
    props.onHandleClick("Atualizar", props.selectedData);
  }

  const handleDelete = () => {
    props.onHandleClick("Deletar", null);
  }

  return (
    <div className={classes.div}>
      {props.edit && (
        <Tooltip title="Editar" aria-label="Editar">
          <Fab
            size="small"
            variant="round"
            aria-label="Editar"
            color="primary"
            onClick={handleEdit}
          >
            <Edit />
          </Fab>
        </Tooltip>
      )}
      {props.delete && (
        <Tooltip title="Deletar" aria-label="Deletar">
          <Fab
            size="small"
            variant="round"
            aria-label="Deletar"
            className={classes.deleteButtom}
            onClick={handleDelete}
          >
            <Delete />
          </Fab>
        </Tooltip>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  deleteButtom: {
    marginLeft: theme.spacing(2),
    color: theme.palette.getContrastText(red[700]),
    backgroundColor: red[700],
    "&:hover": {
      backgroundColor: red[900]
    }
  },
  div: {
    marginRight: theme.spacing(2)
  }
}));
