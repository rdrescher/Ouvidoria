import { makeStyles, Typography } from "@material-ui/core";
import {
  Message,
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
  { title: "Denúncia", link: "/denuncia", icon: <Report /> }
];

export default function ListaManifestacoes() {
  const classes = useStyles(0);

  return (
    <div className={classes.root}>
      <Typography paragraph align="center" variant="h5">
        Manifeste-se!
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
    marginTop: 40,
  },
  icon: {
    width: 35,
    height: 35,
    color: "white",
    marginBottom: 5
  },
  manifestations: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  boxContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transitionDuration: ".3s"
  },
  box: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: 134,
    height: 134,
    overflow: "hidden",
    borderRadius: 20,
    color: "white",
    margin: 5,
    transitionDuration: ".3s",
    "&::before, &::after": {
      content: "'.'",
      width: "100%",
      height: 20,
      position: "absolute",
      right: 0,
      color: "transparent",
      transitionDuration: ".3s"
    },
    "&::before": {
      top: 0
    },
    "&::after": {
      bottom: 0
    },
    "&:hover": {
      transitionDuration: ".3s",
      "& div": {
        transform: "scale(1.15);",
        transitionDuration: ".3s"
      }
    },
    "&:hover::before, &:hover::after": {
      transitionDuration: ".3s"
    }
  },
  lightBox: {
    background: "#00B4DB",
    "&::before, &::after": {
      background: "rgba(255, 255, 255, 0.2)"
    },
    "&:hover::before": {
      top: -10
    },
    "&:hover::after": {
      bottom: -10
    }
  },
  darkBox: {
    background: "#0083B0",
    "&::before, &::after": {
      background: "rgba(255, 255, 255, 0.25)"
    },
    "&:hover::before": {
      top: -10
    },
    "&:hover::after": {
      bottom: -10
    }
  }
}));
