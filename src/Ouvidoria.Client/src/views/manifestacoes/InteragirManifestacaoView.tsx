import {
  makeStyles,
  Container,
  Divider,
  Grid,
  Paper,
  Theme,
  Typography
} from "@material-ui/core";
import React, { useEffect, useState, ChangeEvent } from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import TipoManifestacao from "../../application/enums/TipoManifestacao";
import Params from "../../application/types/RouteParams";
import * as Validations from "../../application/Validations";
import InputField from "../../components/common/formFields/InputField";
import SubmitButton from "../../components/common/formFields/SubmitButton";
import CadastroInteracao from "../../models/Interacao/CadastroInteracao";
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
  interaction: CadastroInteracao;
  success: boolean;
  error: string;
}

const initialState: IState = {
  manifestation: {},
  id: null,
  validManifestation: true,
  interaction: {
    descricao: "",
    idManifestacao: 0
  },
  success: false,
  error: ""
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
  }, [props.match]);

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
              manifestation: result.data!,
              interaction: {
                ...prevState.interaction,
                idManifestacao: result.data!.id
              }
            };
          });
        }

        setLoaded();
      }
      getManifestation();
    }
  }, [state.id, setLoading, setLoaded, open]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    let value = event.target.value;
    setState(prevState => ({
      ...prevState,
      interaction: {
        ...prevState.interaction,
        descricao: value
      }
    }));
  }

  async function handleSubmit() {
    if (!validateDescription()) return;

    setLoading();

    const result = await ManifestacaoApi.Reply(state.interaction);

    if (result.success) {
      setLoaded();
      open("Sucesso", ["Interação salva com sucesso!"]);
      setState(prevState => ({
        ...prevState,
        manifestation: {
          ...prevState.manifestation,
          interacoes: [...prevState.manifestation.interacoes!, result.data!]
        },
        interaction: {
          ...prevState.interaction,
          descricao: ""
        }
      }));
    } else {
      setLoaded();
      open("Alerta", result.messages);
    }
  }

  function validateDescription() {
    let valid = true;
    let error = "";
    let description = state.interaction.descricao;

    if (!description) {
      valid = false;
      error = "O campo é obrigatório";
    } else if (!Validations.hasCorrectSize(description, 2, 5000)) {
      valid = false;
      error = "O campo deve conter entre 2 e 5000 caracteres";
    }
    if (!valid) setState(prevState => ({ ...prevState, error }));

    return valid;
  }

  return state.id === null ? (
    <></>
  ) : isNaN(state.id) || (!state.validManifestation && !props.isOpen) ? (
    <Redirect to="/" />
  ) : state.manifestation === initialState.manifestation ? (
    <></>
  ) : state.success && !props.isOpen ? (
    <Redirect to="/" />
  ) : (
    <Container maxWidth="md">
      <Paper className={classes.container}>
        <Typography variant="h4" align="center" paragraph>
          Detalhes da Manifestação
        </Typography>
        <div className={classes.content}>
          <div>
            <Typography variant="h6" align="justify" paragraph>
              Título: {state.manifestation.titulo}
            </Typography>
            <Typography variant="body2" align="justify" paragraph>
              Descrição: {state.manifestation.descricao} <br />
            </Typography>
            <Typography variant="body2">
              Data: {state.manifestation.dataCriacao}
              <br />
              Departamento: {state.manifestation.departamento}
              <br />
              Usuário: {state.manifestation.usuario}
              <br />
              Tipo da Manifestação:{" "}
              {TipoManifestacao[state.manifestation.tipoManifestacao!]}
              <br />
            </Typography>
          </div>
          <Divider className={classes.divider} />
          <div>
            <Typography variant="h5" align="center">
              Interações
            </Typography>
            {state.manifestation.interacoes! === undefined ||
            state.manifestation.interacoes!.length === 0 ? (
              <Typography variant="body1" align="center">
                Esta manifestação ainda não possui interações
              </Typography>
            ) : (
              <Grid container className={classes.container3}>
                {state.manifestation.interacoes!.map((interation, index) => (
                  <Grid
                    item
                    xs={12}
                    className={classes.interaction}
                    key={index}
                  >
                    <Typography variant="body2" paragraph>
                      <b>{interation.usuario}</b> - {interation.dataCriacao}{" "}
                      <br />
                    </Typography>
                    <Typography variant="body2" paragraph align="justify">
                      {interation.descricao}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            )}
          </div>

          <Divider className={classes.divider} />
          <div className={classes.container2}>
            <Typography variant="h6" align="center">
              Deseja interagir com esta manifestação? Digite abaixo o seu
              parecer:
            </Typography>
            <InputField
              error={state.error}
              label="Nova Interação"
              name="descricao"
              multiline
              onChange={handleInputChange}
              value={state.interaction.descricao}
              onBlur={validateDescription}
            />
            <div className={classes.button}>
              <SubmitButton
                label="Interagir"
                loading={false}
                onSubmit={handleSubmit}
              />
            </div>
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
    },
  },
  container3: {
    [theme.breakpoints.up("xs")]: {
      padding: 20
    },
    [theme.breakpoints.down("xs")]: {
      padding: 0
    }
  },
  content: {
    padding: 20,
    border: "solid 1px #ddd",
    borderRadius: 5
  },
  interaction: {
    width: "100%",
    display: "inline-block",
    position: "relative",
    paddingTop: 10,
    paddingLeft: 20,
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
  },
  divider: {
    background: "#ddd",
    margin: "20px 0"
  },
  button: {
    marginTop: 20
  }
}));
