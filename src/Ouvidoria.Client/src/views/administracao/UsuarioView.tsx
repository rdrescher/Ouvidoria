import React, { useState } from "react";
import Usuario, { UsuarioPerfil } from "../../models/Usuario";
import UsuarioApi from "../../services/UsuarioApi";
import { ThumbDown, ThumbUp } from "@material-ui/icons";
import Operacao from "../../types/Operacao";
import UsuarioComponent from "../../components/administracao/UsuarioComponent";
import { MUIDataTableColumnDef } from "mui-datatables";
import DataTable from "../../components/common/dataTable/DataTable";
import Resultado from "../../models/Resultado";
import ICurso from "../../models/Curso";

const headers: MUIDataTableColumnDef[] = [
  { name: "nome", label: "Nome" },
  { name: "email", label: "Email" },
  { name: "telefone", label: "Telefone" },
  { name: "cpf", label: "CPF" },
  {
    name: "curso",
    label: "Curso",
    options: {
      customBodyRender: value => value.nome as ICurso
    }
  },
  {
    name: "usuarioPerfil",
    label: "Perfil",
    options: {
      customBodyRender: value => UsuarioPerfil[value]
    }
  },
  {
    name: "ativo",
    label: "Ativo",
    options: {
      customBodyRender: value =>
        (value === true && <ThumbUp color="primary" />) || (
          <ThumbDown color="error" />
        )
    }
  }
];

interface IState {
  operation: Operacao;
  selectedUser: Usuario;
}

const initialState: IState = {
  operation: "Criar",
  selectedUser: {} as Usuario
};

export default function UsuarioView() {
  const [state, setState] = useState<IState>(initialState);

  async function getUsers(): Promise<Resultado<Usuario[]>> {
    return await UsuarioApi.entity.get();
  }

  const handle = (operation: Operacao, data: object) => {
    setState({
      ...state,
      operation: operation,
      selectedUser: data as Usuario
    });
  };

  return (
    <DataTable
      handle={handle}
      title="Usuários"
      data={getUsers}
      columns={headers}
      create={true}
      delete={false}
      edit={true}
      dialogContent={
        <UsuarioComponent
          user={state.selectedUser}
          operation={state.operation}
        />
      }
    />
  );
}
