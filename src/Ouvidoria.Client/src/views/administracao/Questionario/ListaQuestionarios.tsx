import { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import Acoes from "../../../components/administracao/questionario/Acoes";
import Criar from "../../../components/administracao/questionario/Criar";
import DataTable from "../../../components/common/dataTable/DataTable";
import QuestionarioApi from "../../../services/QuestionarioApi";

const headers: MUIDataTableColumnDef[] = [
  { name: "id", label: "Id" },
  {
    name: "titulo",
    label: "Título",
    options: {
      customBodyRender: value =>
        value !== null && !!value && value.length > 20
          ? `${value.substring(0, 20)}...`
          : value
    }
  },
  {
    name: "descricao",
    label: "Descrição",
    options: {
      customBodyRender: value =>
        value !== null && !!value && value.length > 20
          ? `${value.substring(0, 20)}...`
          : value
    }
  },
  { name: "dataInicio", label: "Início" },
  { name: "dataFim", label: "Fim" },
  { name: "usuarioCriador", label: "Criador" },
  { name: "perguntas", label: "Perguntas" },
  { name: "respostas", label: "Respostas" },
  {
    name: "",
    label: "Ações",
    options: {
      customBodyRender: (a, tbl) =>
        tbl.tableData.length > 0 && (
          <Acoes
            id={tbl.rowData[0] as number}
            answers={tbl.rowData[7] as number}
          />
        )
    }
  }
];

export default function ListaQuestionarios() {
  async function getQuizzes() {
    return await QuestionarioApi.entity.get();
  }

  return (
    <DataTable
      title="Lista de Questionários"
      data={getQuizzes}
      columns={headers}
      create={true}
      customToolbar={Criar}
    />
  );
}
