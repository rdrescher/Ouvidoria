import React, { useState, useEffect } from "react";
import MUIDataTable, {
    MUIDataTableOptions,
    MUIDataTableColumnDef
} from "mui-datatables";
import DataTableToolBarSelected from "./DataTableToolBarSelected";
import IResultado from "../../../models/Resultado";

interface IState {
    data: object[];
    columns: MUIDataTableColumnDef[];
}

interface IProps {
    data: () => Promise<IResultado<unknown[]>>;
    columns: MUIDataTableColumnDef[];
}

const initialState: IState = {
    data: [],
    columns: []
};

const edit = () => {
    console.log("Editar");
};

const options: MUIDataTableOptions = {
    responsive: "scroll",
    filterType: "textField",
    download: false,
    print: false,
    selectableRows: "single",
    rowsPerPageOptions: [],
    customToolbarSelect: () => (
        <DataTableToolBarSelected
            edit={true}
            delete={true}
            onHandleEdit={edit}
        />
    ),
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
};

export default function DataTable(props: IProps) {
    const [state, setState] = useState<IState>(initialState);

    useEffect(() => {
        let resultData = props.data();
        setState({ ...state, data: resultData, columns: props.columns });
        console.log(props);
    }, []);

    return (
        <MUIDataTable
            title={"Usuários"}
            data={state.data}
            columns={state.columns}
            options={options}
        />
    );
}
