import { Typography } from "@material-ui/core";
import { MessageOutlined } from "@material-ui/icons";
import React from "react";
import PainelItem from "../../common/PainelItem";

export default function PainelSugestao() {
  return (
    <PainelItem
      title="Sugestão"
      icon={<MessageOutlined />}
      content={
        <Typography align="justify">
          A área de sugestões é um espaço destinado para envio de ideias ou
          propostas de aprimoramento nos serviços, atendimentos ou no espaço
          físico da AMF.
          <br />
          <br />
          Sugira à insituição melhorias que contribuam de maneira individual ou
          coletiva para o aperfeiçoamento de políticas, normas, padrões,
          procedimentos, decisões ou serviços da faculdade.
        </Typography>
      }
    />
  );
}
