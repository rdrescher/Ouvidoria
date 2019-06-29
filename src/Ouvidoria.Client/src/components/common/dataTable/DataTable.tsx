import React, { useState, useEffect } from "react";
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumnDef
} from "mui-datatables";
import DataTableToolBarSelected from "./DataTableToolBarSelected";
import DataTableToolBar from "./DataTableToolBar";
import IResultado from "../../../models/Resultado";
import {
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  makeStyles,
  Theme
} from "@material-ui/core";
import Operacao from "../../../types/Operacao";

interface IState {
  data: object[];
  columns: MUIDataTableColumnDef[];
  options: MUIDataTableOptions;
  selectedData: object;
}

interface IDialogsState {
  open: boolean;
  operacao: Operacao;
  selectedItem: IIndex | null;
}

interface IProps {
  data: () => Promise<IResultado<object[]>>;
  columns: MUIDataTableColumnDef[];
  create: boolean;
  delete: boolean;
  edit: boolean;
  title: string;
  dialogContent: JSX.Element;
}

interface IIndex {
  index: number;
  dataIndex: number;
}

const initialState: IState = {
  data: [],
  columns: [],
  selectedData: {},
  options: {
    responsive: "scroll",
    filterType: "textField",
    download: false,
    print: false,
    rowsPerPageOptions: [],
    textLabels: {
      filter: {
        title: "Filtros",
        reset: "Limpar",
        all: "Todos"
      },
      body: {
        noMatch: "Nenhum registro encontrado",
        toolTip: ""
      },
      pagination: {
        displayRows: "",
        next: "Próxima",
        previous: "Anterior",
        rowsPerPage: "Linhas por página"
      },
      selectedRows: {
        delete: "Deletar",
        deleteAria: "Deletar",
        text: "Linha selecionada"
      },
      toolbar: {
        downloadCsv: "",
        filterTable: "Filtros",
        print: "",
        search: "Buscar",
        viewColumns: "Colunas exibidas"
      },
      viewColumns: {
        title: "Colunas exibidas",
        titleAria: "Colunas exibidas"
      }
    }
  }
};

const initialDialogState: IDialogsState = {
  open: false,
  operacao: "Criar",
  selectedItem: null
};

const edit = () => {
  console.log("Editar");
};

const options: MUIDataTableOptions = {};

export default function DataTable(props: IProps) {
  const [state, setState] = useState<IState>(initialState);
  const [dialogs, setDialogs] = useState<IDialogsState>(initialDialogState);
  const classes = useStyles();

  async function getData() {
    let resultado = await props.data();
    setState({
      ...state,
      data: resultado.data!,
      columns: props.columns,
      options: {
        ...options,
        customToolbarSelect: selected => (
          <DataTableToolBarSelected
            edit={props.edit}
            delete={props.delete}
            onHandleClick={handleDialogOpen}
            selectedData={selected.data[0]}
          />
        ),
        customToolbar: () =>
          props.create ? (
            <DataTableToolBar handleCreate={handleDialogOpen} />
          ) : null,
        selectableRows: props.edit || props.delete ? "single" : "none"
      }
    });
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!!dialogs.selectedItem) {
      let data = state.data[dialogs.selectedItem!.index];
      setState({
        ...state,
        selectedData: data
      });
    } else {
      setState({
        ...state,
        selectedData: {}
      });
    }
  }, [dialogs.selectedItem]);
  
  const handleDialogOpen = (operacao: Operacao, data: unknown = null) => {
    setDialogs({
      ...dialogs,
      open: true,
      operacao: operacao,
      selectedItem: !!data ? (data as IIndex) : null
    });
  };

  const handleDialogClose = () => {
    setDialogs({
      ...dialogs,
      open: false,
      selectedItem: null
    });
  };

  return (
    <>
      <MUIDataTable
        title={props.title}
        data={state.data}
        columns={state.columns}
        options={state.options}
      />
      <Dialog
        open={dialogs.open}
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">{dialogs.operacao}</DialogTitle>
        <Divider className={classes.divider} />
        <DialogContent>
          {props.dialogContent}
        </DialogContent>
      </Dialog>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    marginBottom: "2em"
  }
}));
