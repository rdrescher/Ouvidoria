import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState, ChangeEvent } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import * as Validations from "../../application/Validations";
import CadastroInteracao from "../../models/Interacao/CadastroInteracao";
import Interacao from "../../models/Interacao/Interacao";
import ManifestacaoApi from "../../services/ManifestacaoApi";
import * as MessageBoxActions from "../../store/ducks/dialogMessages/DialogMessagesActions";
import * as LoadingActions from "../../store/ducks/loading/LoadingActions";
import InputField from "../common/formFields/InputField";
import SubmitButton from "../common/formFields/SubmitButton";

interface IProps {
  idManifestation: number;
  addInteraction: (interaction: Interacao) => void;
}

interface IDispatchProps {
  open(title: string, messages: string[]): void;
  setLoading(): void;
  setLoaded(): void;
}

interface IState {
  interaction: CadastroInteracao;
  error: string;
}

const initialState: IState = {
  interaction: {
    descricao: "",
    idManifestacao: 0
  },
  error: ""
};

type Props = IProps & IDispatchProps;

function FormInteracao(props: Props) {
  const {
    setLoaded,
    setLoading,
    open,
    idManifestation,
    addInteraction
  } = props;
  const [state, setState] = useState(initialState);
  const classes = useStyles(false);

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      interaction: { ...prevState.interaction, idManifestacao: idManifestation }
    }));
  }, [idManifestation]);

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
        interaction: {
          ...prevState.interaction,
          descricao: ""
        }
      }));
      addInteraction(result.data!);
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

    setState(prevState => ({ ...prevState, error }));

    return valid;
  }

  return (
    <form>
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
    </form>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    Object.assign({}, MessageBoxActions, LoadingActions),
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(FormInteracao);

const useStyles = makeStyles(() => ({
  button: {
    marginTop: 20
  }
}));
