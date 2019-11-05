import { ReportOutlined } from "@material-ui/icons";
import React from "react";
import PainelItem from "../../common/PainelItem";

export default function PainelDenuncia() {
  return (
    <PainelItem title="Denúncia" icon={<ReportOutlined />} content={<div>Oi</div>} />
  );
}
