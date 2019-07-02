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
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import * as DialogActions from "../../../store/ducks/dialogDatatable/DialogActions";
import { IApplicationState } from "../../../store";

interface IState {
  data: object[];
  columns: MUIDataTableColumnDef[];
  options: MUIDataTableOptions;
  selectedData: object;
}

interface IDialogsState {
  operation: Operacao;
  selectedIndex: number;
}

interface IProps {
  data: () => Promise<IResultado<object[]>>;
  columns: MUIDataTableColumnDef[];
  create: boolean;
  delete: boolean;
  edit: boolean;
  title: string;
  dialogContent: JSX.Element;
  handle: (operation: Operacao, data: object) => void;
}

interface IDispatchProps {
  openDialog(operation: Operacao, selectedObject: object): void;
  closeDialog(): void;
}

interface IStateProps {
  dialogIsOpen: boolean;
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
  operation: "Criar",
  selectedIndex: -10
};

type Props = IProps & IDispatchProps & IStateProps;

const DataTable = (props: Props) => {
  const [state, setState] = useState<IState>(initialState);
  const [dialogs, setDialogs] = useState<IDialogsState>(initialDialogState);
  const classes = useStyles();

  async function getData() {
    let result = await props.data();
    setState({
      ...state,
      data: result.data!,
      columns: props.columns,
      options: {
        ...state.options,
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
    if (!props.dialogIsOpen && dialogs.selectedIndex !== -10) {
      let selectedData =
        dialogs.selectedIndex !== -1 ? state.data[dialogs.selectedIndex] : {};
      props.openDialog(dialogs.operation, selectedData);
      props.handle(dialogs.operation, selectedData);
    }
  }, [dialogs]);

  const handleDialogOpen = (operation: Operacao, data: unknown = null) => {
    setDialogs({
      selectedIndex: !!data ? (data as IIndex).index : -1,
      operation: operation
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
        open={props.dialogIsOpen}
        onClose={props.closeDialog}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">{dialogs.operation}</DialogTitle>
        <Divider className={classes.divider} />
        <DialogContent>{props.dialogContent}</DialogContent>
      </Dialog>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    marginBottom: "2em"
  }
}));

const mapStateToProps = (state: IApplicationState) => ({
  dialogIsOpen: state.DialogReducer.dialogIsOpen
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(DialogActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataTable);
