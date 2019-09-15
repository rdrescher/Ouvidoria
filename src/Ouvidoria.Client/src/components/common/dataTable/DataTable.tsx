/* eslint-disable */
import {
  makeStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grow,
  LinearProgress
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import MUIDataTable, {
  MUIDataTableColumnDef,
  MUIDataTableOptions
} from "mui-datatables";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import Operacao from "../../../application/types/Operacao";
import IResultado from "../../../models/Resultado";
import { IApplicationState } from "../../../store";
import * as DialogActions from "../../../store/ducks/dialogDatatable/DialogActions";
import DataTableToolBar from "./DataTableToolBar";
import DataTableToolBarSelected from "./DataTableToolBarSelected";

interface IState {
  data: object[];
  columns: MUIDataTableColumnDef[];
  loading: boolean;
  selectedData: object;
  options: MUIDataTableOptions;
}

interface IDialogsState {
  operation: Operacao;
  selectedIndex: number;
}

interface IProps {
  data: () => Promise<IResultado<object[]>>;
  columns: MUIDataTableColumnDef[];
  create?: boolean;
  delete?: boolean;
  edit?: boolean;
  title: string;
  dialogContent?: JSX.Element;
  handle?: (operation: Operacao, data: object) => void;
  newData?: object | null;
  customToolbarSelected?: () => JSX.Element;
  customToolbar?: () => JSX.Element;
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
  loading: false,
  options: {
    responsive: "scroll",
    filterType: "textField",
    download: false,
    print: false,
    rowsPerPageOptions: [5, 10, 50],
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
        rowsPerPage: "Registros por página"
      },
      selectedRows: {
        delete: "Deletar",
        deleteAria: "Deletar",
        text: "Registro selecionado"
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

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Grow ref={ref} {...props} />;
  }
);

type Props = IProps & IDispatchProps & IStateProps;

function DataTable(props: Props) {
  const {
    customToolbar: Toolbar,
    customToolbarSelected: ToolbarSelected
  } = props;
  const [state, setState] = useState<IState>({
    ...initialState,
    columns: props.columns,
    options: {
      ...initialState.options,
      customToolbarSelect: selected =>
        ToolbarSelected ? (
          <ToolbarSelected />
        ) : (
          <DataTableToolBarSelected
            edit={props.edit}
            delete={props.delete}
            onHandleClick={handleDialogOpen}
            selectedData={selected.data[0]}
          />
        ),
      customToolbar: () =>
        props.create &&
        (Toolbar ? (
          <Toolbar />
        ) : (
          <DataTableToolBar handleCreate={handleDialogOpen} />
        )),
      selectableRows: props.edit || props.delete ? "single" : "none"
    }
  });
  const [dialogs, setDialogs] = useState<IDialogsState>(initialDialogState);
  const classes = useStyles();

  useEffect(() => {
    setState((prevState: IState) => {
      return {
        ...prevState,
        loading: true
      };
    });

    async function getData() {
      let result = await props.data();
      setState((prevState: IState) => {
        return {
          ...prevState,
          data: result.data!,
          loading: false
        };
      });
    }

    getData();
  },        []);

  useEffect(() => {
    if (props.newData === null) return;
    switch (dialogs.operation) {
      case "Criar":
        setState((prevState: IState) => {
          return {
            ...prevState,
            data: [...prevState.data, props.newData as object]
          };
        });
        break;
      case "Atualizar":
        setState((prevState: IState) => {
          let updatedData = prevState.data.map((item, index) => {
            if (index === dialogs.selectedIndex) {
              return props.newData as object;
            } else {
              return item;
            }
          });
          return {
            ...prevState,
            data: updatedData
          };
        });
        break;
      case "Deletar":
        setState((prevState: IState) => {
          let newData = [...prevState.data];
          newData.splice(dialogs.selectedIndex, 1);
          return {
            ...prevState,
            data: newData
          };
        });
        break;
      default:
        break;
    }
  },        [props.newData]);

  useEffect(() => {
    if (!props.dialogIsOpen && dialogs.selectedIndex !== -10) {
      let selectedData =
        dialogs.selectedIndex !== -1 ? state.data[dialogs.selectedIndex] : {};
      props.openDialog(dialogs.operation, selectedData);
      props.handle!(dialogs.operation, selectedData);
    }
  },        [dialogs]);

  const handleDialogOpen = (operation: Operacao, data: unknown = null) => {
    setDialogs({
      selectedIndex: !!data ? (data as IIndex).dataIndex : -1,
      operation: operation
    });
  };

  return (
    <>
      <div className={classes.wrapper}>
        <MUIDataTable
          title={props.title}
          data={state.data}
          columns={state.columns}
          options={state.options}
        />
        {state.loading && (
          <div className={classes.progress}>
            <LinearProgress />
            <div className={classes.whiteSpace} />
          </div>
        )}
      </div>
      <Dialog
        open={props.dialogIsOpen}
        onClose={props.closeDialog}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
      >
        <DialogTitle id="form-dialog-title">{dialogs.operation}</DialogTitle>
        <Divider className={classes.divider} />
        <DialogContent>{props.dialogContent}</DialogContent>
      </Dialog>
    </>
  );
}

const useStyles = makeStyles(() => ({
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.2)"
  },
  wrapper: {
    position: "relative"
  },
  progress: {
    position: "absolute",
    top: "51%",
    width: "100%"
  },
  whiteSpace: {
    background: "white",
    height: 30
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
