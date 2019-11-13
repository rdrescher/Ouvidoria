import { makeStyles, Typography } from "@material-ui/core";
import {
  Message,
  QuestionAnswer,
  RecordVoiceOver,
  Report,
  ThumbDown,
  ThumbUp
} from "@material-ui/icons";
import React, { ReactElement } from "react";
import Botao from "./Botao";

interface IButton {
  title: string;
  link: string;
  icon: ReactElement;
}

const buttonList: IButton[] = [
  { title: "Elogio", link: "/elogio", icon: <ThumbUp /> },
  { title: "Sugestão", link: "/sugestao", icon: <Message /> },
  { title: "Solicitação", link: "/solicitacao", icon: <RecordVoiceOver /> },
  { title: "Reclamação", link: "/reclamacao", icon: <ThumbDown /> },
  { title: "Denúncia", link: "/denuncia", icon: <Report /> },
  { title: "Questionário", link: "/questionarios", icon: <QuestionAnswer /> }
];

export default function ListaManifestacoes() {
  const classes = useStyles(0);

  return (
    <div className={classes.root}>
      <Typography paragraph align="center" variant="h5">
        Comece agora!
      </Typography>
      <div className={classes.manifestations}>
        {buttonList.map((button, index) => (
          <Botao
            key={index}
            title={button.title}
            link={button.link}
            icon={button.icon}
            dark={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 40
  },
  manifestations: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap"
  }
}));
