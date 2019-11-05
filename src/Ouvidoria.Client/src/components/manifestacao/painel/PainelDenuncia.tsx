import { Typography } from "@material-ui/core";
import { ReportOutlined } from "@material-ui/icons";
import React from "react";
import PainelItem from "../../common/PainelItem";

export default function PainelDenuncia() {
  return (
    <PainelItem
      title="Denúncia"
      icon={<ReportOutlined />}
      content={
        <Typography align="justify">
          Espaço destinado para reportar a ocorrência de atos ilícitos, ilegais,
          criminosos ou irregularidades praticadas pela sociedade, alunos,
          funcionários ou professores da instituição, cuja solução dependa da
          faculdade.
          <br />
          <br />
          Também envolve infrações disciplinares, atos de corrupção, má
          utilização dos recursos da AMF ou improbidades administrativas que
          venham a ferir a ética e a legislação, bem como as violações de
          direitos. 
          <br />
          <br />
          Denuncie caso algum ato semelhante tenha acontecido com você ou caso
          você tenha presenciado alguma ocorrência similar na instituição.
        </Typography>
      }
    />
  );
}
