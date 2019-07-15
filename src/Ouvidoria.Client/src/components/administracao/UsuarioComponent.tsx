import {
  makeStyles,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  Fab,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputLabel,
  NativeSelect,
  Theme,
  Typography
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { Done, Save } from "@material-ui/icons";
import clsx from "clsx";
import React, { useEffect, useState, ChangeEvent, KeyboardEvent, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import CadastroUsuario from "../../models/CadastroUsuario";
import Curso from "../../models/Curso";
import IResultado from "../../models/Resultado";
import IUsuario, { UsuarioPerfil } from "../../models/Usuario";
import CursoApi from "../../services/CursoApi";
import UsuarioApi from "../../services/UsuarioApi";
import * as DialogActions from "../../store/ducks/dialogDatatable/DialogActions";
import Operacao from "../../types/Operacao";

interface IDispatchProps {
  closeDialog(): void;
}

interface IProps {
  user: CadastroUsuario;
  operation: Operacao;
  handleUpdateData: (user: IUsuario) => void;
}

interface IState {
  user: CadastroUsuario;
  loading: boolean;
  success: boolean;
  classes: Curso[];
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

const initialUserState: CadastroUsuario = {
  ativo: true,
  cpf: "",
  email: "",
  id: 0,
  idCurso: 0,
  nome: "",
  senha: "",
  confirmaSenha: "",
  telefone: "",
  usuarioPerfil: 1
};

type Props = IProps & IDispatchProps;

function UsuarioComponent(props: Props) {
  const [state, setState] = useState<IState>({
    user: props.user,
    loading: false,
    success: false,
    classes: [],
    errors: []
  });
  const [errors, setErrors] = useState<IErrors>(initialErrorsState);
  const classes = useStyles();

  useEffect(() => {
    async function getClasses() {
      let result = await CursoApi.entity.get();
      let classes: Curso[];
      if (!result.success) {
        classes = [];
      } else {
        classes = result.data!;
        initialUserState.idCurso = classes[0].id;
      }
      if (!state.user.nome) {
        setState((prevState: IState) => {
          return { ...prevState, classes: classes, user: initialUserState };
        });
      } else {
        setState((prevState: IState) => {
          return { ...prevState, classes: classes };
        });
      }
    }
    getClasses();
  },        []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    setState({ ...state, user: { ...state.user, [name]: value } });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    setState({ ...state, user: { ...state.user, [name]: value } });
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

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") e.preventDefault();
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { user } = state;
    let valid = true;

    if (user === props.user || state.success) return;

    if (!validateName(user.nome)) valid = false;
    if (!validateEmail(user.email)) valid = false;
    if (!validateTelephone(user.telefone)) valid = false;
    if (!validateCPF(user.cpf)) {
      valid = false;
    }
    if (props.operation === "Criar") {
      if (!validatePassword(user.senha)) {
        valid = false;
      }
      if (!validateConfirmPassword(user.confirmaSenha, user.senha)) {
        valid = false;
      }
    }

    if (!valid) return;

    setState((prevState: IState) => {
      return { ...prevState, loading: true };
    });

    let result: IResultado<IUsuario>;
    if (props.operation === "Criar") {
      result = await UsuarioApi.create(state.user);
    } else {
      result = await UsuarioApi.update(state.user.id, state.user);
    }

    setState((prevState: IState) => {
      return { ...prevState, loading: false };
    });

    if (!result.success) {
      setState((prevState: IState) => {
        return { ...prevState, errors: result.messages, loading: false };
      });
    } else {
      setState((prevState: IState) => {
        return { ...prevState, success: true };
      });
      props.handleUpdateData(result.data!);
      setTimeout(() => {
        props.closeDialog();
      },         1000);
    }
  };

  const validateName = (name: string): boolean => {
    if (!name) {
      setErrors((prevState: IErrors) => {
        return { ...prevState, nome: "Por favor, informe o nome" };
      });

      return false;
    } else {
      if (name.length < 2 || name.length > 100) {
        setErrors((prevState: IErrors) => {
          return {
            ...prevState,
            nome: "O nome deve conter entre 2 e 100 caracteres"
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

  const validateEmail = (email: string): boolean => {
    if (!email) {
      setErrors((prevState: IErrors) => {
        return { ...prevState, email: "Por favor, informe o email" };
      });
      return false;
    } else {
      let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!regex.test(String(email).toLowerCase())) {
        setErrors((prevState: IErrors) => {
          return { ...prevState, email: "O email deve ser válido" };
        });
        return false;
      }
    }
    setErrors((prevState: IErrors) => {
      return { ...prevState, email: "" };
    });
    return true;
  };

  const validateTelephone = (phone: string): boolean => {
    let regex = /^\d+$/;
    if (phone && !regex.test(String(phone))) {
      setErrors((prevState: IErrors) => {
        return {
          ...prevState,
          telefone: "O telefone deve conter apenas números"
        };
      });
      return false;
    } else if (phone && (phone.length < 9 || phone.length > 15)) {
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

  const validateCPF = (cpf: string): boolean => {
    let regex = /^\d+$/;
    if (!cpf) {
      setErrors((prevState: IErrors) => {
        return { ...prevState, cpf: "Por favor, informe o cpf" };
      });
      return false;
    } else {
      if (!regex.test(String(cpf))) {
        setErrors((prevState: IErrors) => {
          return {
            ...prevState,
            cpf: "O CPF deve conter apenas números"
          };
        });
        return false;
      } else {
        let soma = 0;
        let resto: number;
        let valid = true;
        if (cpf === "00000000000") {
          valid = false;
        } else {
          for (let i = 1; i <= 9; i++) {
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
          }
          resto = (soma * 10) % 11;

          if (resto === 10 || resto === 11) {
            resto = 0;
          }
          if (resto !== parseInt(cpf.substring(9, 10))) {
            valid = false;
          } else {
            soma = 0;
            for (let i = 1; i <= 10; i++) {
              soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
            }
            resto = (soma * 10) % 11;

            if (resto === 10 || resto === 11) {
              resto = 0;
            }
            if (resto !== parseInt(cpf.substring(10, 11))) {
              valid = false;
            }
          }
        }
        if (!valid) {
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
    }
  };

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setErrors((prevState: IErrors) => {
        return { ...prevState, senha: "Por favor, informe a senha" };
      });
      return false;
    } else {
      if (password.length < 6) {
        setErrors((prevState: IErrors) => {
          return {
            ...prevState,
            senha: "A senha deve conter ao menos 6 caracteres"
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

  const validateConfirmPassword = (
    confirmPassword: string,
    password: string
  ): boolean => {
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
        <FormControl fullWidth error={!!errors.nome}>
          <InputLabel htmlFor="nome">Nome</InputLabel>
          <Input
            name="nome"
            aria-describedby="nome-helper"
            fullWidth
            value={state.user.nome || ""}
            onChange={handleInputChange}
            onBlur={() => validateName(state.user.nome)}
            onKeyPress={handleKeyPress}
          />
          <FormHelperText id="nome-helper">{errors.nome}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={!!errors.email}>
          <InputLabel htmlFor="email">E-mail</InputLabel>
          <Input
            name="email"
            aria-describedby="email-helper"
            fullWidth
            type="email"
            value={state.user.email || ""}
            onChange={handleInputChange}
            onBlur={() => validateEmail(state.user.email)}
            onKeyPress={handleKeyPress}
          />
          <FormHelperText id="email-helper">{errors.email}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={!!errors.cpf}>
          <InputLabel htmlFor="cpf">CPF</InputLabel>
          <Input
            name="cpf"
            aria-describedby="cpf-helper"
            fullWidth
            value={state.user.cpf || ""}
            onChange={handleTelephoneCPFChange}
            onBlur={() => validateCPF(state.user.cpf)}
            onKeyPress={handleKeyPress}
          />
          <FormHelperText id="cpf-helper">{errors.cpf}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={!!errors.telefone}>
          <InputLabel htmlFor="telefone">Telefone</InputLabel>
          <Input
            name="telefone"
            aria-describedby="telefone-helper"
            fullWidth
            value={state.user.telefone || ""}
            onChange={handleTelephoneCPFChange}
            onBlur={() => validateTelephone(state.user.telefone)}
            onKeyPress={handleKeyPress}
          />
          <FormHelperText id="telefone-helper">
            {errors.telefone}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth error={!!errors.senha}>
          <InputLabel htmlFor="senha">Senha</InputLabel>
          <Input
            name="senha"
            aria-describedby="senha-helper"
            fullWidth
            value={state.user.senha || ""}
            onChange={handleInputChange}
            type="password"
            disabled={props.operation === "Atualizar"}
            onBlur={() => validatePassword(state.user.senha)}
            onKeyPress={handleKeyPress}
          />
          <FormHelperText id="senha-helper">{errors.senha}</FormHelperText>
        </FormControl>
        {props.operation === "Criar" && (
          <FormControl fullWidth error={!!errors.confirmaSenha}>
            <InputLabel htmlFor="confirmaSenha">Confirmar Senha</InputLabel>
            <Input
              name="confirmaSenha"
              aria-describedby="senha-helper"
              fullWidth
              value={state.user.confirmaSenha || ""}
              onChange={handleInputChange}
              type="password"
              onBlur={() =>
                validateConfirmPassword(
                  state.user.confirmaSenha,
                  state.user.senha
                )
              }
              onKeyPress={handleKeyPress}
            />
            <FormHelperText id="confirmaSenha-helper">
              {errors.confirmaSenha}
            </FormHelperText>
          </FormControl>
        )}
        <FormControl fullWidth>
          <InputLabel htmlFor="idCurso">Curso</InputLabel>
          <NativeSelect
            name="idCurso"
            fullWidth
            value={state.user.idCurso}
            onChange={handleSelectChange}
          >
            {state.classes.map(_class => (
              <option value={_class.id} key={_class.id}>
                {_class.nome}
              </option>
            ))}
          </NativeSelect>
          <FormHelperText>{""}</FormHelperText>
        </FormControl>
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
        <FormControl fullWidth>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.user.ativo === true ? true : false}
                onChange={handleActiveChange}
                value={state.user.ativo}
                name="ativo"
              />
            }
            label="Cadastro ativo"
          />
        </FormControl>

        {!!state.errors.length && (
          <div className={classes.errors}>
            <Typography variant="h6">Erro ao salvar</Typography>
            <Divider className={classes.divider} />
            {state.errors.map(error => (
              <Typography key={error} variant="body2">
                {error}
              </Typography>
            ))}
          </div>
        )}

        <div className={classes.buttons}>
          <div className={classes.wrapper}>
            <Fab
              variant="extended"
              color="primary"
              aria-label="salvar"
              size="small"
              onClick={handleSubmit}
              disabled={state.loading}
              className={clsx({
                [classes.buttonSuccess]: state.success
              })}
            >
              {(!state.success && (
                <>
                  <Save className={classes.btnMargin} />
                  <Typography
                    variant="inherit"
                    className={classes.contentSpacer}
                  >
                    Salvar
                  </Typography>
                </>
              )) || (
                <>
                  <Done className={classes.btnMargin} />
                  <Typography
                    variant="inherit"
                    className={classes.contentSpacer}
                  >
                    Sucesso ao salvar
                  </Typography>
                </>
              )}
            </Fab>
            {state.loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </div>
      </form>
    </Container>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  buttons: {
    marginBottom: "1.25em",
    marginTop: ".5em",
    display: "flex",
    justifyContent: "flex-end"
  },
  btnMargin: {
    marginRight: theme.spacing(1)
  },
  contentSpacer: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  errors: {
    backgroundColor: "rgba(239, 83, 80, 0.5)",
    color: "rgba(0, 0, 0, 0.6)",
    width: "100%",
    border: 1,
    borderRadius: 5,
    marginTop: 20,
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20
  },
  divider: {
    marginBottom: 15
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  }
}));

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(DialogActions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(UsuarioComponent);
