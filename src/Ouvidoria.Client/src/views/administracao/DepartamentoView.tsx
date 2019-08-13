import { MUIDataTableColumnDef } from "mui-datatables";
import React, { useState } from "react";
import DepartamentoComponent from "../../components/administracao/DepartamentoComponent";
import DataTable from "../../components/common/dataTable/DataTable";
import Departamento from "../../models/Departamento/Departamento";
import Resultado from "../../models/Resultado";
import DepartamentoApi from "../../services/DepartamentoApi";
import Operacao from "../../types/Operacao";

const headers: MUIDataTableColumnDef[] = [
  { label: "Nome", name: "nome" },
  { label: "Usuário Responsável", name: "usuarioResponsavel" }
];

interface IState {
  operation: Operacao;
  selectedDepartment: Departamento;
  newDepartment: Departamento | null;
}

const initialState: IState = {
  operation: "Criar",
  selectedDepartment: {
    id: 0,
    nome: "",
    usuarioResponsavel: "",
    idUsuarioResponsavel: null
  },
  newDepartment: null
};

export default function DepartamentoView() {
  const [state, setState] = useState(initialState);

  async function getDepartments(): Promise<Resultado<Departamento[]>> {
    return await DepartamentoApi.entity.get();
  }

  const handle = (operation: Operacao, data: object) => {
    const selected = data as Departamento;
    setState((prevState: IState) => {
      return {
        ...prevState,
        operation: operation,
        selectedDepartment: !selected.nome
          ? initialState.selectedDepartment
          : selected
      };
    });
  };

  const updateData = (department: Departamento) => {
    setState((prevState: IState) => {
      return {
        ...prevState,
        newDepartment: department
      };
    });
  };

  return (
    <DataTable
      title="Departamentos"
      columns={headers}
      data={getDepartments}
      delete={true}
      create={true}
      edit={true}
      dialogContent={
        <DepartamentoComponent
          department={state.selectedDepartment}
          handleUpdateData={updateData}
          operation={state.operation}
        />
      }
      newData={state.newDepartment}
      handle={handle}
    />
  );
}
