import {
  makeStyles,
  Container,
  Paper,
  Typography
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
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
