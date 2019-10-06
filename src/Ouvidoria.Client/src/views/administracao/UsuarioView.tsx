import { ThumbDown, ThumbUp } from "@material-ui/icons";
import { MUIDataTableColumnDef } from "mui-datatables";
import React, { useState } from "react";
import UsuarioPerfil from "../../application/enums/UsuarioPerfil";
import Operacao from "../../application/types/Operacao";
import UsuarioComponent from "../../components/administracao/UsuarioComponent";
import DataTable from "../../components/common/dataTable/DataTable";
import Resultado from "../../models/Resultado";
import AtualizacaoUsuario from "../../models/Usuario/AtualizacaoUsuario";
import Usuario from "../../models/Usuario/Usuario";
import UsuarioApi from "../../services/UsuarioApi";

const headers: MUIDataTableColumnDef[] = [
  {
    name: "nome",
    label: "Nome"
  },
  { name: "email", label: "Email" },
  {
    name: "telefone",
    label: "Telefone",
    options: {
      sort: false
    }
  },
  {
    name: "cpf",
    label: "CPF",
    options: {
      sort: false
    }
  },
  {
    name: "curso",
    label: "Curso",
    options: {
      customBodyRender: value => (value !== null ? (value.nome as string) : ""),
      sort: false
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
        ),
      sortDirection: "desc"
    }
  }
];

interface IState {
  operation: Operacao;
  selectedUser: AtualizacaoUsuario;
  newUser: Usuario | null;
}

const initialState: IState = {
  operation: "Criar",
  selectedUser: {} as AtualizacaoUsuario,
  newUser: null
};

export default function UsuarioView() {
  const [state, setState] = useState<IState>(initialState);

  async function getUsers(): Promise<Resultado<Usuario[]>> {
    return await UsuarioApi.entity.get();
  }

  const handle = (operation: Operacao, data: object) => {
    const user = data as Usuario;
    if (!user.nome) {
      setState({
        ...state,
        operation: operation,
        selectedUser: data as AtualizacaoUsuario
      });
    } else {
      let selectedUser: AtualizacaoUsuario = {
        nome: user.nome,
        ativo: user.ativo,
        id: user.id,
        telefone: user.telefone,
        idCurso: user.idCurso,
        usuarioPerfil: user.usuarioPerfil
      };
      setState({
        ...state,
        operation: operation,
        selectedUser
      });
    }
  };

  const updateData = (user: Usuario) => {
    setState((prevState: IState) => {
      return {
        ...prevState,
        newUser: user
      };
    });
  };

  return (
    <DataTable
      handle={handle}
      title="Usuários"
      data={getUsers}
      columns={headers}
      create={false}
      delete={false}
      edit={true}
      newData={state.newUser}
      dialogContent={
        <UsuarioComponent
          user={state.selectedUser}
          operation={state.operation}
          handleUpdateData={updateData}
        />
      }
    />
  );
}
