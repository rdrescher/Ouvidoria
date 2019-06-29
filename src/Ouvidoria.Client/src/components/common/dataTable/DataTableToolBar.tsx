import React from "react";
import { Tooltip, IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import Operacao from "../../../types/Operacao";

interface IProps {
  handleCreate: (operacao: Operacao, data: unknown) => void;
}

export default function DataTableToolBar(props: IProps) {
  const classes = useStyles(0);

  const handleCreate = () => {
    props.handleCreate("Criar", null);
  };

  return (
    <Tooltip title={"Criar"}>
      <IconButton onClick={handleCreate} className={classes.create}>
        <Add />
      </IconButton>
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
