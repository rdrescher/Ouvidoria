import { Container, Grid, Paper, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState, ChangeEvent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import * as Validations from "../../application/Validations";
import InputField from "../../components/common/formFields/InputField";
import SelectField from "../../components/common/formFields/SelectField";
import SubmitButton from "../../components/common/formFields/SubmitButton";
import CadastroUsuario from "../../models/Autenticacao/CadastroUsuario";
import ILoginResponse from "../../models/Autenticacao/LoginResponse";
import GenericList from "../../models/GenericList";
import AutenticacaoApi from "../../services/AutenticacaoApi";
import CursoApi from "../../services/CursoApi";
import { IApplicationState } from "../../store";
import * as SessionActions from "../../store/ducks/session/SessionActions";

interface IDispatchState {
  login(login: ILoginResponse): void;
}

interface IStateProps {
  isAuthenticated: boolean;
}
interface IState {
  user: CadastroUsuario;
  loading: boolean;
  errors: IError;
  serverErrors: string[];
  classes: GenericList[];
}

interface IError {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
  confirmPassword: string;
}

const initialState: IState = {
  user: {
    nome: "",
    email: "",
    telefone: null,
    cpf: "",
    senha: "",
    confirmaSenha: "",
    idCurso: null
  },
  errors: {
    name: "",
    email: "",
    phone: "",
    cpf: "",
    password: "",
    confirmPassword: ""
  },
  serverErrors: [],
  classes: [],
  loading: false
};

type Props = IStateProps & IDispatchState;

function CadastroView(props: Props) {
  const [state, setState] = useState(initialState);
  const styles = useStyles(0);

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    setState({ ...state, user: { ...state.user, [name]: value } });
  };

  const handleTelephoneCPFChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    let regex = /[^0-9]/g;
    let newValue = value.replace(regex, "");
    setState({ ...state, user: { ...state.user, [name]: newValue } });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    setState({ ...state, user: { ...state.user, [name]: value || null } });
  };

  const validateName = (): boolean => {
    let name = state.user.nome;
    if (!name) {
      setState((prevState: IState) => {
        return {
          ...prevState,
          errors: { ...prevState.errors, name: "O nome é obrigatório" }
        };
      });

      return false;
    } else {
      if (!Validations.hasCorrectSize(name, 3, 100)) {
        setState((prevState: IState) => {
          return {
            ...prevState,
            errors: {
              ...prevState.errors,
              name: "O nome deve conter entre 3 e 100 caracteres"
            }
          };
        });
        return false;
      }
    }
    setState((prevState: IState) => {
      return {
        ...prevState,
        errors: { ...prevState.errors, name: "" }
      };
    });
    return true;
  };

  const validateEmail = (): boolean => {
    let { email } = state.user;
    if (!email) {
      setState((prevState: IState) => {
        return {
          ...prevState,
          errors: { ...prevState.errors, email: "O e-mail é obrigatório" }
        };
      });
      return false;
    } else if (!Validations.isValidEmail(email)) {
      setState((prevState: IState) => {
        return {
          ...prevState,
          errors: { ...prevState.errors, email: "O email deve ser válido" }
        };
      });
      return false;
    }

    setState((prevState: IState) => {
      return {
        ...prevState,
        errors: { ...prevState.errors, email: "" }
      };
    });
    return true;
  };

  const validateCPF = (): boolean => {
    let { cpf } = state.user;
    if (!cpf) {
      setState((prevState: IState) => {
        return {
          ...prevState,
          errors: { ...prevState.errors, cpf: "O CPF é obrigatório" }
        };
      });
      return false;
    } else {
      if (!Validations.onlyNumbers(cpf)) {
        setState((prevState: IState) => {
          return {
            ...prevState,
            errors: {
              ...prevState.errors,
              cpf: "O CPF deve conter apenas números"
            }
          };
        });
        return false;
      } else if (!Validations.isValidCPF(cpf)) {
        setState((prevState: IState) => {
          return {
            ...prevState,
            errors: { ...prevState.errors, cpf: "O CPF informado é inválido" }
          };
        });
        return false;
      }
      setState((prevState: IState) => {
        return {
          ...prevState,
          errors: { ...prevState.errors, cpf: "" }
        };
      });
      return true;
    }
  };

  const validateTelephone = (): boolean => {
    let phone = state.user.telefone;
    if (phone && !Validations.onlyNumbers(phone)) {
      setState((prevState: IState) => {
        return {
          ...prevState,
          errors: {
            ...prevState.errors,
            phone: "O telefone deve conter apenas números"
          }
        };
      });
      return false;
    } else if (phone && !Validations.hasCorrectSize(phone, 10, 15)) {
      setState((prevState: IState) => {
        return {
          ...prevState,
          errors: {
            ...prevState.errors,
            phone: "O telefone deve conter entre 9 e 15 caracteres"
          }
        };
      });
      return false;
    }
    setState((prevState: IState) => {
      return { ...prevState, errors: { ...prevState.errors, phone: "" } };
    });
    return true;
  };

  const validatePassword = (): boolean => {
    let password = state.user.senha;
    if (!password) {
      setState((prevState: IState) => {
        return {
          ...prevState,
          errors: { ...prevState.errors, password: "A senha é obrigatória" }
        };
      });
      return false;
    } else {
      if (!Validations.hasCorrectSize(password, 6, 20)) {
        setState((prevState: IState) => {
          return {
            ...prevState,
            errors: {
              ...prevState.errors,
              password: "A senha deve conter entre 6 e 20 caracteres"
            }
          };
        });
        return false;
      } else {
        setState((prevState: IState) => {
          return {
            ...prevState,
            errors: { ...prevState.errors, password: "" }
          };
        });
      }
    }

    setState((prevState: IState) => {
      return {
        ...prevState,
        errors: {
          ...prevState.errors,
          senha: ""
        }
      };
    });
    return true;
  };

  const validateConfirmPassword = (): boolean => {
    let confirmPassword = state.user.confirmaSenha;
    let password = state.user.senha;
    if (!confirmPassword) {
      setState((prevState: IState) => {
        return {
          ...prevState,
          errors: {
            ...prevState.errors,
            confirmPassword: "Confirme a senha digitada anteriormente"
          }
        };
      });
      return false;
    } else {
      if (confirmPassword !== password) {
        setState((prevState: IState) => {
          return {
            ...prevState,
            errors: {
              ...prevState.errors,
              confirmPassword: "As senhas digitadas não são correspondentes"
            }
          };
        });
        return false;
      }
    }
    setState((prevState: IState) => {
      return {
        ...prevState,
        errors: { ...prevState.errors, confirmPassword: "" }
      };
    });
    return true;
  };

  const handleSubmit = async () => {
    if (state.user === initialState.user) return;
    if (!validateName()) return;
    if (!validateEmail()) return;
    if (!validateCPF()) return;
    if (!validateTelephone()) return;
    if (!validatePassword()) return;
    if (!validateConfirmPassword()) return;

    setState((prevState: IState) => {
      return {
        ...prevState,
        loading: true
      };
    });

    let result = await AutenticacaoApi.Cadastrar(state.user);

    if (result.success) {
      props.login(result.data!);
    } else {
      setState((prevState: IState) => {
        return {
          ...prevState,
          serverErrors: result.messages,
          loading: false
        };
      });
    }
  };

  return props.isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <Container maxWidth="md">
      <Paper className={styles.paper}>
        <Typography className={styles.text} variant="h6">
          Cadastre-se!
        </Typography>
        <form autoComplete="false">
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6}>
              <InputField
                name="nome"
                label="Nome * "
                error={state.errors.name}
                value={state.user.nome}
                onChange={handleInputChange}
                onBlur={validateName}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <InputField
                name="email"
                label="E-mail * "
                error={state.errors.email}
                value={state.user.email}
                onChange={handleInputChange}
                onBlur={validateEmail}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6}>
              <InputField
                name="cpf"
                label="CPF * "
                error={state.errors.cpf}
                value={state.user.cpf}
                onChange={handleTelephoneCPFChange}
                onBlur={validateCPF}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <InputField
                name="telefone"
                label="Telefone"
                error={state.errors.phone}
                value={state.user.telefone}
                onChange={handleTelephoneCPFChange}
                onBlur={validateTelephone}
              />
            </Grid>
          </Grid>
          <div className={styles.select}>
            <SelectField
              name="idCurso"
              label="Curso"
              value={state.user.idCurso}
              onChange={handleSelectChange}
              data={state.classes}
              nullable={true}
            />
          </div>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6}>
              <InputField
                name="senha"
                label="Senha * "
                type="password"
                error={state.errors.password}
                value={state.user.senha}
                onChange={handleInputChange}
                onBlur={validatePassword}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <InputField
                name="confirmaSenha"
                label="Confirmar Senha * "
                error={state.errors.confirmPassword}
                value={state.user.confirmaSenha}
                type="password"
                onChange={handleInputChange}
                onBlur={validateConfirmPassword}
              />
            </Grid>
          </Grid>
          <Grid
            container
            justify="center"
            spacing={2}
            className={styles.buttons}
          >
            <Grid item xs={12} sm={6}>
              <SubmitButton
                loading={state.loading}
                label="Cadastrar"
                onSubmit={handleSubmit}
              />
            </Grid>
            <Grid item xs={12}>
              <div className={styles.wrapper}>
                <Link to="/login">
                  <Typography
                    variant="inherit"
                    className={styles.contentSpacer}
                  >
                    Já possuo uma conta
                  </Typography>
                </Link>
              </div>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

const mapStateToProps = (state: IApplicationState) => ({
  isAuthenticated: state.SessionReducer.isAuthenticated
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(SessionActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CadastroView);

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: "20px 30px"
  },
  logo: {
    height: 130,
    width: 170
  },
  text: {
    margin: 20
  },
  buttons: {
    marginTop: 20,
    "& button": {
      width: "100% !important"
    }
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
    "& a": { textDecoration: "none" },
    textAlign: "center"
  },
  contentSpacer: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.secondary.main,
    padding: theme.spacing(1),
    height: 40,
    "&:hover": {
      backgroundColor: theme.palette.grey[200]
    },
    borderRadius: 20
  },
  select: {
    margin: "10px 0"
  }
}));
