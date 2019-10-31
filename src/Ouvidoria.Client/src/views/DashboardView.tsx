import { makeStyles, Container, Paper, Typography } from "@material-ui/core";
import {
  Message,
  RecordVoiceOver,
  Report,
  ThumbDown,
  ThumbUp
} from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

export default function DashboardView() {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Paper className={classes.container}>
        <Typography className={classes.title} variant="h4">
          Seja bem-vindo à Ouvidoria da AMF!
        </Typography>
        <Typography variant="body1">
          A Ouvidoria da Antonio Meneghetti Faculdade é um canal de comunicação
          entre a instituição e as pessoas que a ela frequentam. Atende
          manifestações como{" "}
          <strong>
            elogios, sugestões, denúncias, solicitações e reclamações
          </strong>
          .
        </Typography>
        <br />
        <Typography variant="body1">
          Atualmente conta também com um sistema de{" "}
          <strong>questionários</strong> através do mesmo, aplicar perguntas
          específicas que sejam de seu interesse, auxiliando ainda mais no
          atendimento ao cliente.
        </Typography>
        <br />
        <Typography variant="h6">Informações importantes</Typography>
        <br />
        <Typography variant="body2">
          <i>
            * O sistema encontra-se em fase de testes, não contendo todas suas
            funcionalidades.
          </i>
        </Typography>
        <Typography variant="body2">
          <i>
            * Suas informações <strong>não</strong> serão divulgadas em
            circunstância alguma.
          </i>
        </Typography>
        <Typography variant="body2">
          <i>
            * Caso ocorra algum problema ou erro durante o uso do sistema, favor
            enviar um e-mail para rhuan.drescher@gmail.com ou então utilizar a
            área de reclamações para relatá-lo.
          </i>
        </Typography>
        <div className={classes.manifestations}>
          <Link to="/elogio">
            <div className={`${classes.box} ${classes.darkBox}`}>
              <div className={classes.boxContent}>
                <ThumbUp className={classes.icon} />
                <Typography variant="h6">Elogio</Typography>
              </div>
            </div>
          </Link>
          <Link to="/sugestao">
            <div className={`${classes.box} ${classes.lightBox}`}>
              <div className={classes.boxContent}>
                <Message className={classes.icon} />
                <Typography variant="h6">Sugestão</Typography>
              </div>
            </div>
          </Link>
          <Link to="/solicitacao">
            <div className={`${classes.box} ${classes.darkBox}`}>
              <div className={classes.boxContent}>
                <RecordVoiceOver className={classes.icon} />
                <Typography variant="h6">Solicitação</Typography>
              </div>
            </div>
          </Link>
          <Link to="/reclamacao">
            <div className={`${classes.box} ${classes.lightBox}`}>
              <div className={classes.boxContent}>
                <ThumbDown className={classes.icon} />
                <Typography variant="h6">Reclamação</Typography>
              </div>
            </div>
          </Link>
          <Link to="/denuncia">
            <div className={`${classes.box} ${classes.darkBox}`}>
              <div className={classes.boxContent}>
                <Report className={classes.icon} />
                <Typography variant="h6">Denúncia</Typography>
              </div>
            </div>
          </Link>
        </div>
      </Paper>
    </Container>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    padding: 20,
    "& p": {
      textAlign: "justify"
    }
  },
  title: {
    textAlign: "center",
    margin: 20
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
    "& a": {
      textDecoration: "none"
    }
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
    width: 160,
    height: 160,
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
        transform: "scale(1.2);",
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
