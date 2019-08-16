import {
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  NativeSelect
} from "@material-ui/core";
import React, { useEffect, useState, ChangeEvent, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import GenericList from "../../models/GenericList";
import Resultado from "../../models/Resultado";
import CadastroUsuario from "../../models/Usuario/CadastroUsuario";
import Usuario, { UsuarioPerfil } from "../../models/Usuario/Usuario";
import CursoApi from "../../services/CursoApi";
import UsuarioApi from "../../services/UsuarioApi";
import * as DialogActions from "../../store/ducks/dialogDatatable/DialogActions";
import * as MessageBoxActions from "../../store/ducks/messageBox/MessageBoxActions";
import Operacao from "../../utils/Operacao";
import * as Validations from "../../utils/Validations";
import CheckBoxField from "../common/formFields/CheckBoxField";
import ErrorMessages from "../common/formFields/ErrorMessages";
import InputField from "../common/formFields/InputField";
import SaveButton from "../common/formFields/SaveButton";
import SelectField from "../common/formFields/SelectField";

interface IDispatchProps {
  closeDialog(): void;
  show(message: string): void;
}

interface IProps {
  user: CadastroUsuario;
  operation: Operacao;
  handleUpdateData: (user: Usuario) => void;
}

interface IState {
  user: CadastroUsuario;
  loading: boolean;
  classes: GenericList[];
  errors: string[];
}

interface IErrors {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  senha: string;
  confirmaSenha: string;
}

const initialErrorsState: IErrors = {
  nome: "",
  email: "",
  telefone: "",
  cpf: "",
  senha: "",
  confirmaSenha: ""
};

const initialState: IState = {
  user: {
    ativo: true,
    cpf: "",
    email: "",
    id: 0,
    idCurso: null,
    nome: "",
    senha: "",
    confirmaSenha: "",
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

  const handleTelephoneCPFChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    let operationMessage = "";

    if (user === props.user) return;

    if (!validateName()) valid = false;
    if (!validateEmail()) valid = false;
    if (!validateTelephone()) valid = false;
    if (!validateCPF()) valid = false;

    if (props.operation === "Criar") {
      if (!validatePassword()) valid = false;
      if (!validateConfirmPassword()) valid = false;
    }

    if (!valid) return;

    setState((prevState: IState) => {
      return { ...prevState, loading: true };
    });

    if (props.operation === "Criar") {
      result = await UsuarioApi.create(state.user);
      operationMessage = "criado";
    } else {
      result = await UsuarioApi.update(state.user.id, state.user);
      operationMessage = "atualizado";
    }

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
      props.show(`Usuário ${operationMessage} com sucesso`);
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

  const validateEmail = (): boolean => {
    let { email } = state.user;
    if (!email) {
      setErrors((prevState: IErrors) => {
        return { ...prevState, email: "Por favor, informe o email" };
      });
      return false;
    } else if (!Validations.isValidEmail(email)) {
      setErrors((prevState: IErrors) => {
        return { ...prevState, email: "O email deve ser válido" };
      });
      return false;
    }

    setErrors((prevState: IErrors) => {
      return { ...prevState, email: "" };
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

  const validateCPF = (): boolean => {
    let { cpf } = state.user;
    if (!cpf) {
      setErrors((prevState: IErrors) => {
        return { ...prevState, cpf: "Por favor, informe o cpf" };
      });
      return false;
    } else {
      if (!Validations.onlyNumbers(cpf)) {
        setErrors((prevState: IErrors) => {
          return {
            ...prevState,
            cpf: "O CPF deve conter apenas números"
          };
        });
        return false;
      } else if (!Validations.isValidCPF(cpf)) {
        setErrors((prevState: IErrors) => {
          return {
            ...prevState,
            cpf: "O CPF informado é inválido"
          };
        });
        return false;
      }
      setErrors((prevState: IErrors) => {
        return { ...prevState, cpf: "" };
      });
      return true;
    }
  };

  const validatePassword = (): boolean => {
    let password = state.user.senha;
    if (!password) {
      setErrors((prevState: IErrors) => {
        return { ...prevState, senha: "Por favor, informe a senha" };
      });
      return false;
    } else {
      if (!Validations.hasCorrectSize(password, 6, 20)) {
        setErrors((prevState: IErrors) => {
          return {
            ...prevState,
            senha: "A senha deve conter entre 6 e 20 caracteres"
          };
        });
        return false;
      }
    }
    setErrors((prevState: IErrors) => {
      return { ...prevState, senha: "" };
    });
    return true;
  };

  const validateConfirmPassword = (): boolean => {
    let confirmPassword = state.user.confirmaSenha;
    let password = state.user.senha;
    if (!confirmPassword) {
      setErrors((prevState: IErrors) => {
        return {
          ...prevState,
          confirmaSenha: "Por favor, confirme a senha digitada anteriormente"
        };
      });
      return false;
    } else {
      if (confirmPassword !== password) {
        setErrors((prevState: IErrors) => {
          return {
            ...prevState,
            confirmaSenha: "As senhas digitadas não são correspondentes"
          };
        });
        return false;
      }
    }
    setErrors((prevState: IErrors) => {
      return { ...prevState, confirmaSenha: "" };
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
          name="email"
          label="E-mail"
          type="email"
          error={errors.email}
          value={state.user.email}
          onChange={handleInputChange}
          onBlur={validateEmail}
        />
        <InputField
          name="cpf"
          label="CPF"
          error={errors.cpf}
          value={state.user.cpf}
          onChange={handleTelephoneCPFChange}
          onBlur={validateCPF}
        />
        <InputField
          name="telefone"
          label="Telefone"
          error={errors.telefone}
          value={state.user.telefone}
          onChange={handleTelephoneCPFChange}
          onBlur={validateTelephone}
        />
        <InputField
          name="senha"
          label="Senha"
          error={errors.senha}
          value={state.user.senha}
          type="password"
          onChange={handleInputChange}
          disabled={props.operation === "Atualizar"}
          onBlur={validatePassword}
        />
        {props.operation === "Criar" && (
          <InputField
            name="confirmaSenha"
            label="Confirmar Senha"
            error={errors.confirmaSenha}
            value={state.user.confirmaSenha}
            type="password"
            onChange={handleInputChange}
            onBlur={validateConfirmPassword}
          />
        )}

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
              .filter(profile => isNaN(Number(profile)) === false)
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
        <SaveButton loading={state.loading} onSubmit={handleSubmit} />
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
