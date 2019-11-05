import { Typography } from "@material-ui/core";
import { RecordVoiceOverOutlined } from "@material-ui/icons";
import React from "react";
import PainelItem from "../../common/PainelItem";

export default function PainelSolicitacao() {
  return (
    <PainelItem
      title="Solicitação"
      icon={<RecordVoiceOverOutlined />}
      content={
        <Typography align="justify">
          Espaço destinado para requisições de atendimentos, prestação de
          serviços ou auxílio da instituição.
          <br />
          <br />
          Solicite à instituição algo que esteja sendo necessitado ou que será
          necessário futuramente.
        </Typography>
      }
    />
  );
}
