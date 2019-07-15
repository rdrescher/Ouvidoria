import { MUIDataTableColumnDef } from "mui-datatables";
import React, { useState } from "react";
import CursoComponent from "../../components/administracao/CursoComponent";
import DataTable from "../../components/common/dataTable/DataTable";
import Curso from "../../models/Curso";
import Resultado from "../../models/Resultado";
import CursoApi from "../../services/CursoApi";
import Operacao from "../../types/Operacao";

const headers: MUIDataTableColumnDef[] = [
  { label: "Nome", name: "nome" }
];

interface IState {
  operation: Operacao;
  selectedClass: Curso;
  newClass: Curso | null;
}

const initialState: IState = {
  operation: "Criar",
  selectedClass: { id: 0, nome: "" },
  newClass: null
};

export default function CursoView() {
  const [state, setState] = useState<IState>(initialState);

  async function getClasses(): Promise<Resultado<Curso[]>> {
    return await CursoApi.entity.get();
  }

  const handle = (operation: Operacao, data: object) => {
    const selected = data as Curso;
    setState((prevState: IState) => {
      return {
        ...prevState,
        operation: operation,
        selectedClass: !selected.nome ? initialState.selectedClass : selected
      };
    });
  };

  const updateData = (curso: Curso) => {
    setState((prevState: IState) => {
      return {
        ...prevState,
        newClass: curso
      };
    });
  };

  return (
    <DataTable
      title="Cursos"
      columns={headers}
      data={getClasses}
      delete={true}
      create={true}
      edit={true}
      dialogContent={
        <CursoComponent
          class={state.selectedClass}
          handleUpdateData={updateData}
          operation={state.operation}
        />
      }
      newData={state.newClass}
      handle={handle}
    />
  );
}
