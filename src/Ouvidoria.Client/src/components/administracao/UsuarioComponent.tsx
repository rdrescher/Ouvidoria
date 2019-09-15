import {
  makeStyles,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  NativeSelect
} from "@material-ui/core";
import React, { useEffect, useState, ChangeEvent, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import Operacao from "../../application/types/Operacao";
import * as Validations from "../../application/Validations";
import GenericList from "../../models/GenericList";
import Resultado from "../../models/Resultado";
import AtualizacaoUsuario from "../../models/Usuario/AtualizacaoUsuario";
import Usuario, { UsuarioPerfil } from "../../models/Usuario/Usuario";
import CursoApi from "../../services/CursoApi";
import UsuarioApi from "../../services/UsuarioApi";
import * as DialogActions from "../../store/ducks/dialogDatatable/DialogActions";
import * as MessageBoxActions from "../../store/ducks/messageBox/MessageBoxActions";
import CheckBoxField from "../common/formFields/CheckBoxField";
import ErrorMessages from "../common/formFields/ErrorMessages";
import InputField from "../common/formFields/InputField";
import SelectField from "../common/formFields/SelectField";
import SubmitButton from "../common/formFields/SubmitButton";

interface IDispatchProps {
  closeDialog(): void;
  show(message: string): void;
}

interface IProps {
  user: AtualizacaoUsuario;
  operation: Operacao;
  handleUpdateData: (user: Usuario) => void;
}

interface IState {
  user: AtualizacaoUsuario;
  loading: boolean;
  classes: GenericList[];
  errors: string[];
}

interface IErrors {
  nome: string;
  telefone: string;
}

const initialErrorsState: IErrors = {
  nome: "",
  telefone: ""
};

const initialState: IState = {
  user: {
    ativo: true,
    id: 0,
    idCurso: null,
    nome: "",
    telefone: "",
    usuarioPerfil: 1
  },
  classes: [],
  errors: [],
  loading: false
};

type Props = IProps & IDispatchProps;

function UsuarioComponent(props: Props) {
  const [state, setState] = useState<IState>(initialState);
  const [errors, setErrors] = useState<IErrors>(initialErrorsState);
  const classes = useStyles();

  useEffect(() => {
    async function getClasses() {
      let result = await CursoApi.GetGenericList();
      let classList: GenericList[] = [];

      if (result.success) {
        classList = result.data!;
      }

      setState((prevState: IState) => {
        return { ...prevState, classes: classList };
      });
    }
    getClasses();
  },        []);

  useEffect(() => {
    if (!!props.user.nome)
      setState((prevState: IState) => {
        return { ...prevState, user: props.user };
      });
  },        [props]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    setState({ ...state, user: { ...state.user, [name]: value } });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    setState({ ...state, user: { ...state.user, [name]: value || null } });
  };

  const handleActiveChange = () => {
    setState({ ...state, user: { ...state.user, ativo: !state.user.ativo } });
  };

  const handleTelephoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    let regex = /^\s*\d*\s*$/;
    if (regex.test(String(value)))
      setState({ ...state, user: { ...state.user, [name]: value } });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { user } = state;
    let valid = true;
    let result: Resultado<Usuario>;

    if (user === props.user) return;
    if (!validateName()) valid = false;
    if (!validateTelephone()) valid = false;

    if (!valid) return;

    setState((prevState: IState) => {
      return { ...prevState, loading: true };
    });

    result = await UsuarioApi.update(state.user.id, state.user);

    setState((prevState: IState) => {
      return { ...prevState, loading: false };
    });

    if (!result.success) {
      setState((prevState: IState) => {
        return { ...prevState, errors: result.messages, loading: false };
      });
    } else {
      props.handleUpdateData(result.data!);
      props.closeDialog();
      props.show(`Usuário atualizado com sucesso`);
    }
  };

  const validateName = (): boolean => {
    let name = state.user.nome;
    if (!name) {
      setErrors((prevState: IErrors) => {
        return { ...prevState, nome: "Por favor, informe o nome" };
      });

      return false;
    } else {
      if (!Validations.hasCorrectSize(name, 3, 100)) {
        setErrors((prevState: IErrors) => {
          return {
            ...prevState,
            nome: "O nome deve conter entre 3 e 100 caracteres"
          };
        });
        return false;
      }
    }
    setErrors((prevState: IErrors) => {
      return { ...prevState, nome: "" };
    });
    return true;
  };

  const validateTelephone = (): boolean => {
    let phone = state.user.telefone;
    if (phone && !Validations.onlyNumbers(phone)) {
      setErrors((prevState: IErrors) => {
        return {
          ...prevState,
          telefone: "O telefone deve conter apenas números"
        };
      });
      return false;
    } else if (phone && !Validations.hasCorrectSize(phone, 10, 15)) {
      setErrors((prevState: IErrors) => {
        return {
          ...prevState,
          telefone: "O telefone deve conter entre 9 e 15 caracteres"
        };
      });
      return false;
    }
    setErrors((prevState: IErrors) => {
      return { ...prevState, telefone: "" };
    });
    return true;
  };

  return (
    <Container maxWidth="lg">
      <form>
        <InputField
          name="nome"
          label="Nome"
          error={errors.nome}
          value={state.user.nome}
          onChange={handleInputChange}
          onBlur={validateName}
        />
        <InputField
          name="telefone"
          label="Telefone"
          error={errors.telefone}
          value={state.user.telefone}
          onChange={handleTelephoneChange}
          onBlur={validateTelephone}
        />
        <SelectField
          name="idCurso"
          label="Curso"
          value={state.user.idCurso}
          onChange={handleSelectChange}
          data={state.classes}
          nullable={true}
        />

        <FormControl fullWidth>
          <InputLabel htmlFor="usuarioPerfil">Perfil</InputLabel>
          <NativeSelect
            name="usuarioPerfil"
            fullWidth
            value={state.user.usuarioPerfil}
            onChange={handleSelectChange}
          >
            {Object.keys(UsuarioPerfil)
              .filter(profile => !isNaN(Number(profile)))
              .map(profile => (
                <option value={Number(profile)} key={Number(profile)}>
                  {UsuarioPerfil[Number(profile)]}
                </option>
              ))}
          </NativeSelect>
          <FormHelperText>{""}</FormHelperText>
        </FormControl>
        <CheckBoxField
          name="ativo"
          label="Usuário Ativo "
          value={state.user.ativo}
          onChange={handleActiveChange}
        />
        {!!state.errors.length && <ErrorMessages errors={state.errors} />}
        <div className={classes.buttons}>
          <SubmitButton
            loading={state.loading}
            onSubmit={handleSubmit}
            label="Salvar"
            saveIcon={true}
          />
        </div>
      </form>
    </Container>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    Object.assign({}, MessageBoxActions, DialogActions),
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(UsuarioComponent);

const useStyles = makeStyles(() => ({
  buttons: {
    marginBottom: "1.25em",
    marginTop: ".5em",
    display: "flex",
    justifyContent: "flex-end"
  },
  form: {
    marginTop: 30,
    marginBottom: 10
  }
}));
