import {
  makeStyles,
  Container,
  Grid,
  Paper,
  Typography
} from "@material-ui/core";
import { ExitToAppOutlined, Person, QuestionAnswer } from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import Botao from "../components/home/Botao";
import ListaManifestacoes from "../components/home/ListaManifestacoes";
import SobreOuvidoria from "../components/home/SobreOuvidoria";
import { IApplicationState } from "../store";

interface IStateProps {
  isAuthenticated: boolean;
}

function DashboardView(props: IStateProps) {
  const classes = useStyles();
  return (
    <Container maxWidth="xl">
      <Paper className={classes.container}>
        <Typography className={classes.title} variant="h4">
          Ouvidoria AMF
        </Typography>
        <SobreOuvidoria />
        <ListaManifestacoes />
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <div className={classes.area}>
              <Typography variant="h5" paragraph>
                Responda Questionários!
              </Typography>
              <Botao
                title="Questionário"
                link="/questionarios"
                icon={<QuestionAnswer />}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            {props.isAuthenticated ? (
              <div className={classes.area}>
                <Typography variant="h5" paragraph>
                  Sua conta
                </Typography>
                <Botao title="Sair" link="/logout" icon={<ExitToAppOutlined />} />
              </div>
            ) : (
              <div className={classes.area}>
                <Typography variant="h5" paragraph>
                  Acesse o Sistema!
                </Typography>
                <Botao title="Acessar" link="/login" icon={<Person />} />
              </div>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

const mapStateToProps = (state: IApplicationState) => ({
  isAuthenticated: state.SessionReducer.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(DashboardView);

const useStyles = makeStyles(() => ({
  container: {
    padding: 20,
    textAlign: "justify"
  },
  title: {
    textAlign: "center",
    margin: 20
  },
  area: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  }
}));
