import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState, ChangeEvent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { bindActionCreators, Dispatch } from "redux";
import TipoManifestacao from "../../application/enums/TipoManifestacao";
import * as Validations from "../../application/Validations";
import CadastroManifestacaoErrors from "../../models/Errors/CadastroManifestacaoErrors";
import GenericList from "../../models/GenericList";
import CadastroManifestacao from "../../models/Manifestacao/CadastroManifestacao";
import DepartamentoApi from "../../services/DepartamentoApi";
import ManifestacaoApi from "../../services/ManifestacaoApi";
import { IApplicationState } from "../../store";
import * as DialogMessagesActions from "../../store/ducks/dialogMessages/DialogMessagesActions";
import * as LoadingActions from "../../store/ducks/loading/LoadingActions";
import InputField from "../common/formFields/InputField";
import SelectField from "../common/formFields/SelectField";
import SubmitButton from "../common/formFields/SubmitButton";

interface IProps {
  type: TipoManifestacao;
}

interface IStateProps {
  isOpen: boolean;
  loading: boolean;
}

interface IDispatchToProps {
  setLoading(): void;
  setLoaded(): void;
  open(title: string, messages: string[]): void;
}

interface IState {
  manifestation: CadastroManifestacao;
  errors: CadastroManifestacaoErrors;
  departments: GenericList[];
  ready: boolean;
  finished: boolean;
}

const initialState: IState = {
  manifestation: {
    titulo: "",
    descricao: "",
    idDepartamento: 0,
    tipoManifestacao: TipoManifestacao.Denuncia
  },
  errors: {
    title: "",
    description: ""
  },
  departments: [],
  ready: false,
  finished: false
};

type Props = IProps & IDispatchToProps & IStateProps;

function FormManifestacao(props: Props) {
  const { setLoaded, setLoading, open } = props;
  const classes = useStyles();
  const [state, setState] = useState({
    ...initialState,
    manifestation: {
      ...initialState.manifestation,
      tipoManifestacao: props.type
    }
  });

  useEffect(() => {
    async function getDepartments() {
      setLoading();

      const result = await DepartamentoApi.getGenericList();

      setLoaded();

      if (result.success) {
        if (result.data!.length === 0)
          open("Aviso", [
            "Ainda não há departamentos cadastrados no sistema. Favor contatar as áreas responsáveis"
          ]);

        setState(prevState => ({
          ...prevState,
          departments: result.data!,
          manifestation: {
            ...prevState.manifestation,
            idDepartamento: result.data!.length > 0 ? result.data![0].id : 0
          },
          ready: true
        }));
      } else {
        setState(prevState => ({ ...prevState, ready: true }));
      }
    }

    getDepartments();
  },        [setLoaded, setLoading, open]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    setState((prevState: IState) => {
      return {
        ...prevState,
        manifestation: { ...prevState.manifestation, [name]: value }
      };
    });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    setState(prevState => ({
      ...prevState,
      manifestation: { ...prevState.manifestation, [name]: value }
    }));
  };

  const validateTitle = () => {
    let valid = true;
    let message = "";
    let title = state.manifestation.titulo;

    if (!title) {
      valid = false;
      message = "O título é obrigatório";
    } else if (!Validations.hasCorrectSize(title, 2, 150)) {
      valid = false;
      message = "O título deve conter entre 2 e 150 caracteres";
    }

    setState(prevState => ({
      ...prevState,
      errors: { ...prevState.errors, title: message }
    }));

    return valid;
  };

  const validateDescription = () => {
    let valid = true;
    let message = "";
    let description = state.manifestation.descricao;

    if (!description) {
      valid = false;
      message = "A descrição é obrigatório";
    } else if (!Validations.hasCorrectSize(description, 10, 5000)) {
      valid = false;
      message = "A descrição deve conter entre 10 e 5000 caracteres";
    }

    setState(prevState => ({
      ...prevState,
      errors: { ...prevState.errors, description: message }
    }));

    return valid;
  };

  const handleSubmit = async () => {
    let valid = true;
    if (!validateTitle()) valid = false;
    if (!validateDescription()) valid = false;

    if (!valid) return;

    setLoading();

    const result = await ManifestacaoApi.Create(state.manifestation);

    setLoaded();

    if (result.success) {
      open("Sucesso ao salvar", ["Manifestação realizada com sucesso!"]);
      setState(prevState => ({ ...prevState, finished: true }));
    } else {
      open("Erro ao salvar", result.messages);
    }
  };

  return (props.isOpen && state.departments.length === 0) || !state.ready ? (
    <></>
  ) : state.ready && state.departments.length === 0 && !props.isOpen ? (
    <Redirect to="/" />
  ) : state.finished && !props.isOpen ? (
    <Redirect to="/" />
  ) : (
    <>
      <InputField
        name="titulo"
        label="Título * "
        value={state.manifestation.titulo}
        error={state.errors.title}
        onChange={handleInputChange}
        onBlur={validateTitle}
      />
      <SelectField
        data={state.departments}
        label="Departamento * "
        name="idDepartamento"
        value={state.manifestation.idDepartamento}
        onChange={handleSelectChange}
      />
      <InputField
        name="descricao"
        label="Descrição * "
        value={state.manifestation.descricao}
        error={state.errors.description}
        onChange={handleInputChange}
        multiline
        onBlur={validateDescription}
      />
      <div className={classes.button}>
        <SubmitButton
          label="Salvar"
          loading={false}
          onSubmit={handleSubmit}
          saveIcon
        />
      </div>
    </>
  );
}

const useStyles = makeStyles(() => ({
  button: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 10
  }
}));

const mapStateToProps = (state: IApplicationState) => ({
  isOpen: state.DialogMessagesReducer.isOpen,
  loading: state.LoadingReducer.loading
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    Object.assign({}, DialogMessagesActions, LoadingActions),
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormManifestacao);
