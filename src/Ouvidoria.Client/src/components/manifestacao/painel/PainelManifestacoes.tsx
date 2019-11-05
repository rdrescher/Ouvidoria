import { Typography } from "@material-ui/core";
import { ThumbsUpDownOutlined } from "@material-ui/icons";
import React from "react";
import PainelItem from "../../common/PainelItem";

export default function PainelManifestacoes() {
  return (
    <PainelItem
      title="Manifestações"
      icon={<ThumbsUpDownOutlined />}
      content={
        <Typography>
          A Ouvidoria da Antonio Meneghetti Faculdade é um canal de comunicação
          entre a instituição e as pessoas que a ela frequentam. Este espaço é
          reservado para você realizar suas manifestações à faculdade de maneira
          prática, rápida e segura.
        </Typography>
      }
    />
  );
}
