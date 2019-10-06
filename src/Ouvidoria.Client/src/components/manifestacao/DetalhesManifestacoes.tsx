import { Typography } from "@material-ui/core";
import React from "react";
import TipoManifestacao from "../../application/enums/TipoManifestacao";
import ChipsManifestacoes from "./ChipsManifestacoes";

interface IProps {
  titulo: string;
  descricao: string;
  dataCriacao: string;
  departamento: string;
  tipoManifestacao: TipoManifestacao;
  numeroInteracoes: number;
  usuario: string;
  usuarioUltimaInteracao: string;
  manifestationType?: TipoManifestacao;
  detailed?: boolean;
}

export default function DetalhesManifestacoes(props: IProps) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        {props.detailed !== undefined &&
        !props.detailed &&
        props.titulo.length > 50
          ? `${props.titulo.substring(0, 50)}...`
          : props.titulo}
      </Typography>
      <Typography variant="body2" paragraph>
        {props.detailed !== undefined &&
        !props.detailed &&
        props.descricao.length > 80
          ? `${props.descricao.substring(0, 80)}...`
          : props.descricao}
      </Typography>
      <ChipsManifestacoes
        dataCriacao={props.dataCriacao}
        departamento={props.departamento}
        tipoManifestacao={props.tipoManifestacao}
        numeroInteracoes={props.numeroInteracoes}
        usuario={props.usuario}
        usuarioUltimaInteracao={props.usuarioUltimaInteracao}
        manifestationType={props.manifestationType}
        detailed={props.detailed}
      />
    </>
  );
}
