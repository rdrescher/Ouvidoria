import {
  makeStyles,
  Container,
  Divider,
  Paper,
  Theme,
  Typography
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import Params from "../../application/types/RouteParams";
import DetalhesManifestacoes from "../../components/manifestacao/DetalhesManifestacoes";
import FormInteracao from "../../components/manifestacao/FormInteracao";
import ListaInteracoes from "../../components/manifestacao/ListaInteracoes";
import Interacao from "../../models/Interacao/Interacao";
import Manifestacao from "../../models/Manifestacao/Manifestacao";
import ManifestacaoApi from "../../services/ManifestacaoApi";
import { IApplicationState } from "../../store";
import * as MessageBoxActions from "../../store/ducks/dialogMessages/DialogMessagesActions";
import * as LoadingActions from "../../store/ducks/loading/LoadingActions";

interface IDispatchProps {
  open(title: string, messages: string[]): void;
  setLoading(): void;
  setLoaded(): void;
}

interface IStateProps {
  isOpen: boolean;
}

interface IState {
  manifestation: Partial<Manifestacao>;
  id: number | null;
  validManifestation: boolean;
  success: boolean;
}

const initialState: IState = {
  manifestation: {},
  id: null,
  validManifestation: true,
  success: false
};

type Props = IDispatchProps & RouteComponentProps<Params> & IStateProps;

function InteragirManifestacaoView(props: Props) {
  const [state, setState] = useState(initialState);
  const { setLoaded, setLoading, open } = props;
  const classes = useStyles();

  useEffect(() => {
    let id = Number(props.match.params.id);
    setState(prevState => {
      return { ...prevState, id };
    });
  },        [props.match]);

  useEffect(() => {
    if (state.id === null) return;
    if (!isNaN(state.id)) {
      async function getManifestation() {
        setLoading();
        let validManifestation = true;

        let result = await ManifestacaoApi.GetDetails(state.id!);

        if (!result.success) {
          setLoaded();
          open("Aviso", result.messages);
          validManifestation = false;
          setState(prevState => {
            return { ...prevState, validManifestation };
          });
        } else {
          setState(prevState => {
            return {
              ...prevState,
              manifestation: result.data!
            };
          });
        }

        setLoaded();
      }
      getManifestation();
    }
  },        [state.id, setLoading, setLoaded, open]);

  function addInteraction(interaction: Interacao) {
    setState(prevState => ({
      ...prevState,
      manifestation: {
        ...prevState.manifestation,
        interacoes: [...prevState.manifestation.interacoes!, interaction]
      }
    }));
  }

  return state.id === null ? (
    <></>
  ) : isNaN(state.id) || (!state.validManifestation && !props.isOpen) ? (
    <Redirect to="/" />
  ) : state.manifestation === initialState.manifestation ||
    (state.success && !props.isOpen) ? (
    <></>
  ) : (
    <Container maxWidth="md">
      <Paper className={classes.container}>
        <Typography variant="h4" align="center" paragraph>
          Detalhes da Manifestação
        </Typography>
        <div className={classes.content}>
          <DetalhesManifestacoes
            titulo={state.manifestation.titulo!}
            descricao={state.manifestation.descricao!}
            dataCriacao={state.manifestation.dataCriacao!}
            departamento={state.manifestation.departamento!}
            tipoManifestacao={state.manifestation.tipoManifestacao!}
            usuario={state.manifestation.usuario!}
            manifestationType={state.manifestation.tipoManifestacao!}
            numeroInteracoes={0}
            usuarioUltimaInteracao={""}
            detailed
          />
          <Divider className={classes.divider} />
          <ListaInteracoes interactions={state.manifestation.interacoes!} />
          <Divider className={classes.divider} />
          <div className={classes.container2}>
            <Typography variant="h6" align="center">
              Deseja interagir com esta manifestação? Digite abaixo o seu
              parecer:
            </Typography>
            <FormInteracao
              idManifestation={state.id}
              addInteraction={addInteraction}
            />
          </div>
        </div>
      </Paper>
    </Container>
  );
}

const mapStateToProps = (state: IApplicationState) => ({
  isOpen: state.DialogMessagesReducer.isOpen
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    Object.assign({}, MessageBoxActions, LoadingActions),
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InteragirManifestacaoView);

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: 20
  },
  container2: {
    [theme.breakpoints.up("xs")]: {
      padding: "0 20px 0 20px",
      textAlign: "right"
    },
    [theme.breakpoints.down("xs")]: {
      padding: 0,
      textAlign: "center"
    }
  },
  content: {
    padding: 20,
    border: "solid 1px #ddd",
    borderRadius: 5
  },
  divider: {
    background: "#ddd",
    margin: "20px 0"
  },
}));
