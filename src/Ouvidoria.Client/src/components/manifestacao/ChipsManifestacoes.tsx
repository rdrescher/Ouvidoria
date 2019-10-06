import { Chip, Grid, Tooltip } from "@material-ui/core";
import {
  CalendarToday,
  HowToReg,
  Message,
  RecordVoiceOver,
  ThumbsUpDown,
  Work
} from "@material-ui/icons";
import React from "react";
import TipoManifestacao from "../../application/enums/TipoManifestacao";

interface IProps {
  dataCriacao: string;
  departamento: string;
  usuario: string;
  tipoManifestacao: TipoManifestacao;
  numeroInteracoes: number;
  usuarioUltimaInteracao: string;
  manifestationType?: TipoManifestacao;
  detailed?: boolean;
}

export default function ChipsManifestacoes(props: IProps) {
  return (
    <Grid container spacing={1}>
      <Grid item>
        <Tooltip title="Data da criação">
          <Chip
            color="secondary"
            size="small"
            label={props.dataCriacao}
            icon={<CalendarToday />}
          />
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title="Departamento">
          <Chip
            color="secondary"
            size="small"
            label={props.departamento}
            icon={<Work />}
          />
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title="Manifestante">
          <Chip
            color="secondary"
            size="small"
            label={props.usuario}
            icon={<RecordVoiceOver />}
          />
        </Tooltip>
      </Grid>
      {props.manifestationType !== undefined && (
        <Grid item>
          <Tooltip title="Tipo da manifestação">
            <Chip
              color="secondary"
              size="small"
              label={TipoManifestacao[props.tipoManifestacao]}
              icon={<ThumbsUpDown />}
            />
          </Tooltip>
        </Grid>
      )}
      {!props.detailed && (
        <Grid item>
          <Tooltip title="Número de interações">
            <Chip
              color="secondary"
              size="small"
              label={props.numeroInteracoes}
              icon={<Message />}
            />
          </Tooltip>
        </Grid>
      )}
      {!!props.usuarioUltimaInteracao && (
        <Grid item>
          <Tooltip title="Último usuário a interagir">
            <Chip
              color="secondary"
              size="small"
              label={props.usuarioUltimaInteracao}
              icon={<HowToReg />}
            />
          </Tooltip>
        </Grid>
      )}
    </Grid>
  );
}
