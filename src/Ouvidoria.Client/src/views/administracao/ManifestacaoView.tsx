import { Fab, Tooltip } from "@material-ui/core";
import { RemoveRedEye } from "@material-ui/icons";
import { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import { Link } from "react-router-dom";
import TipoManifestacao from "../../application/enums/TipoManifestacao";
import DataTable from "../../components/common/dataTable/DataTable";
import ManifestacaoApi from "../../services/ManifestacaoApi";

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
    name: "tipoManifestacao",
    label: "Tipo",
    options: { customBodyRender: value => TipoManifestacao[value] }
  },
  { name: "usuario", label: "Usuário" },
  { name: "dataCriacao", label: "Criado em" },
  { name: "numeroInteracoes", label: "Interações" },
  { name: "usuarioUltimaInteracao", label: "Última Interação" },
  {
    name: "",
    label: "Ações",
    options: {
      customBodyRender: (a, tbl) =>
        tbl.tableData.length > 0 && (
          <Tooltip title="Visualizar">
            <Link to={`/manifestacao/${tbl.rowData[0]}`}>
              <Fab size="small" color="secondary">
                <RemoveRedEye />
              </Fab>
            </Link>
          </Tooltip>
        ),
      filter: false,
      searchable: false,
      sort: false
    }
  }
];

export default function ManifestacaoView() {
  async function getManifestations() {
    return await ManifestacaoApi.Get();
  }

  return (
    <DataTable
      title="Lista de Manifestações"
      data={getManifestations}
      columns={headers}
    />
  );
}
