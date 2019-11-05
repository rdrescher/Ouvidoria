import { ThumbDownOutlined } from "@material-ui/icons";
import React from "react";
import PainelItem from "../../common/PainelItem";

export default function PainelSolicitacao() {
  return (
    <PainelItem
      title="Reclamação"
      icon={<ThumbDownOutlined />}
      content={<div>Oi</div>}
    />
  );
}
