import { makeStyles, Grid, Theme, Typography } from "@material-ui/core";
import React from "react";
import Interacao from "../../models/Interacao/Interacao";

interface IProps {
  interactions: Interacao[];
}

export default function ListaInteracoes(props: IProps) {
  const classes = useStyles(0);

  return (
    <>
      <Typography variant="h5" align="center">
        Interações
      </Typography>
      {props.interactions === undefined || props.interactions.length === 0 ? (
        <Typography variant="body1" align="center">
          Esta manifestação ainda não possui interações
        </Typography>
      ) : (
        <Grid container className={classes.container}>
          {props.interactions.map((interation, index) => (
            <Grid item xs={12} className={classes.interaction} key={index}>
              <Typography variant="body2" paragraph>
                <b>{interation.usuario}</b> - {interation.dataCriacao} <br />
              </Typography>
              <Typography variant="body2" paragraph align="justify">
                {interation.descricao}
              </Typography>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    [theme.breakpoints.up("xs")]: {
      padding: 20
    },
    [theme.breakpoints.down("xs")]: {
      padding: 0
    }
  },
  interaction: {
    width: "100%",
    display: "inline-block",
    position: "relative",
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 10,
    margin: "10px 0",
    background: "#f2f2f2",
    borderRadius: 10,
    "&::before": {
      content: "'.'",
      background: "#ddd",
      color: "#ddd",
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 7,
      height: "100%",
      display: "block"
    }
  }
}));
