import { ThumbUpAltOutlined } from "@material-ui/icons";
import React from "react";
import PainelItem from "../../common/PainelItem";

export default function PainelElogio() {
  return (
    <PainelItem
      title="Elogios"
      icon={<ThumbUpAltOutlined />}
      content={<div>Oi</div>}
    />
  );
}
