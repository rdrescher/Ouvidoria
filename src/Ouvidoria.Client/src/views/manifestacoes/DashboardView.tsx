import React, { useState, ChangeEvent } from "react";
import { Container, Paper, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Login from "../../models/Autenticacao/Login";
import Logo from "../../assets/img/amf.png";
import InputField from "../../components/common/formFields/InputField";
import AutenticacaoApi from "../../services/AutenticacaoApi";
import JWTParser from "../../core/jwtParser";
import * as Validations from "../../utils/Validations";

interface IState {
  user: Login;
  errors: Login;
}

const initialState: IState = {
  user: {
    email: "",
    senha: ""
  },
  errors: {
    email: "",
    senha: ""
  }
};

export default function DashboardView() {
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

    let result = await AutenticacaoApi.Login(state.user);

    if (result.success) {
      localStorage.setItem("token", result.data!.accessToken);
      localStorage.setItem("expiresIn", result.data!.expiresIn.toString());
      localStorage.setItem("user", JSON.stringify(JWTParser.parseJwt(result.data!.accessToken) ));
    }
  };

  const styles = useStyles();
  return (
    <Container className={styles.container} maxWidth="sm">
      <Paper className={styles.paper}>
        <img src={Logo} alt="AMF" className={styles.logo} />
        <Typography className={styles.text} variant="h4">
          Ouvidoria
        </Typography>
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
        <div className={styles.buttons}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Logar
          </Button>
          <Button variant="contained" color="primary">
            Cadastrar
          </Button>
        </div>
      </Paper>
    </Container>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 30
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 60px"
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
    marginBottom: 10,
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    "& button": {
      width: 110
    }
  }
}));
