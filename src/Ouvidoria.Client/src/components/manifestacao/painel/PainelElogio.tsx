import { Typography } from "@material-ui/core";
import { ThumbUpAltOutlined } from "@material-ui/icons";
import React from "react";
import PainelItem from "../../common/PainelItem";

export default function PainelElogio() {
  return (
    <PainelItem
      title="Elogios"
      icon={<ThumbUpAltOutlined />}
      content={
        <Typography align="justify">
          Espaço destinado para compartilhar registros de bom atendimento ou
          satisfação com atendimentos e serviços recebidos na instituição.
          <br />
          <br />
          Demonstre seu reconhecimento ou satisfação sobre algum serviço ou
          atendimento recebido, a fim de contribuir com o ambiente, mostrando
          que a instituição está realizando as atividades de maneira correta e
          satisfatória.
        </Typography>
      }
    />
  );
}
