import { Typography } from "@material-ui/core";
import { ThumbDownOutlined } from "@material-ui/icons";
import React from "react";
import PainelItem from "../../common/PainelItem";

export default function PainelSolicitacao() {
  return (
    <PainelItem
      title="Reclamação"
      icon={<ThumbDownOutlined />}
      content={
        <Typography align="justify">
          A área de reclamações é um espaço destinado para demonstrar
          insatifação em relação a atendimentos, serviços prestados ou à conduta
          de funcionários da AMF.
          <br />
          <br />
          Utilize este espaço para expressar seu descontentamento, crítica ou
          alguma opinião desfavorável que você deseja compartilhar com a
          instituição.
        </Typography>
      }
    />
  );
}
