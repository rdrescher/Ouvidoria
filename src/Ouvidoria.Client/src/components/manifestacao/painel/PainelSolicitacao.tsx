import { RecordVoiceOverOutlined } from "@material-ui/icons";
import React from "react";
import PainelItem from "../../common/PainelItem";

export default function PainelSolicitacao() {
  return (
    <PainelItem
      title="Solicitação"
      icon={<RecordVoiceOverOutlined />}
      content={<div>Oi</div>}
    />
  );
}
