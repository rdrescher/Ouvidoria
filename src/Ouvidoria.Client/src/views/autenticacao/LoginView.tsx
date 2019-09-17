import {
  Container,
  Fab,
  Grid,
  Paper,
  Theme,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState, ChangeEvent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import * as Validations from "../../application/Validations";
import Logo from "../../assets/img/amf.png";
import InputField from "../../components/common/formFields/InputField";
import SubmitButton from "../../components/common/formFields/SubmitButton";
import Login from "../../models/Autenticacao/Login";
import ILoginResponse from "../../models/Autenticacao/LoginResponse";
import AutenticacaoApi from "../../services/AutenticacaoApi";
import { IApplicationState } from "../../store";
import * as SessionActions from "../../store/ducks/session/SessionActions";

interface IDispatchState {
  login(login: ILoginResponse): void;
}

interface IStateProps {
  isAuthenticated: boolean;
}
interface IState {
  user: Login;
  errors: Login;
  loading: boolean;
}

const initialState: IState = {
  user: {
    email: "",
    senha: ""
  },
  errors: {
    email: "",
    senha: ""
  },
  loading: false
};

type Props = IStateProps & IDispatchState;
function LoginView(props: Props) {
  const [state, setState] = useState(initialState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    setState({ ...state, user: { ...state.user, [name]: value } });
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

  const validatePassword = (): boolean => {
    let password = state.user.senha;
    if (!password) {
      setState((prevState: IState) => {
        return {
          ...prevState,
          errors: { ...prevState.errors, senha: "A senha é obrigatória" }
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
              senha: "A senha deve conter entre 6 e 20 caracteres"
            }
          };
        });
        return false;
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

  const handleSubmit = async () => {
    if (state.user === initialState.user) return;
    if (!validateEmail()) return;
    if (!validatePassword()) return;

    setState((prevState: IState) => {
      return {
        ...prevState,
        loading: true
      };
    });

    let result = await AutenticacaoApi.Login(state.user);

    if (result.success) {
      props.login(result.data!);
    } else {
      setState((prevState: IState) => {
        return {
          ...prevState,
          errors: {
            ...prevState.errors,
            email: result.messages[0]
          },
          loading: false
        };
      });
    }
  };

  const styles = useStyles();
  return props.isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <Container className={styles.container} maxWidth="sm">
      <Paper className={styles.paper}>
        <img src={Logo} alt="AMF" className={styles.logo} />
        <Typography className={styles.text} variant="h4">
          Ouvidoria
        </Typography>
        <form>
          <InputField
            name="email"
            label="E-mail"
            error={state.errors.email}
            value={state.user.email}
            onChange={handleInputChange}
            onBlur={validateEmail}
          />
          <InputField
            name="senha"
            label="Senha"
            type="password"
            error={state.errors.senha}
            value={state.user.senha}
            onChange={handleInputChange}
            onBlur={validatePassword}
          />
          <Grid container spacing={2} className={styles.buttons}>
            <Grid item xs={12}>
              <SubmitButton
                loading={state.loading}
                label="Entrar"
                onSubmit={handleSubmit}
              />
            </Grid>
            <Grid item xs={12}>
              <div className={styles.wrapper}>
                <Link to="/cadastrar">
                  <Typography
                    variant="inherit"
                    className={styles.contentSpacer}
                  >
                    Não possuo uma conta
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
)(LoginView);

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: 30
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
      backgroundColor: theme.palette.grey[200],
    },
    borderRadius: 20
  }
}));
