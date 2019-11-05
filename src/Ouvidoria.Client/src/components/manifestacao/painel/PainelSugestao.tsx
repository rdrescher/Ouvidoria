import { MessageOutlined } from "@material-ui/icons";
import React from "react";
import PainelItem from "../../common/PainelItem";

export default function PainelSugestao() {
  return (
    <PainelItem
      title="Sugestão"
      icon={<MessageOutlined />}
      content={<div>Oi</div>}
    />
  );
}
